import React from "react";
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

const FONT_FAMILY = "Inter, sans-serif";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const TypingText: React.FC<{
	text: string;
	startFrame: number;
	typeDurationInFrames: number;
	charsFadeInFrames?: number;
	style?: React.CSSProperties;
}> = ({ text, startFrame, typeDurationInFrames, charsFadeInFrames = 4, style }) => {
	const frame = useCurrentFrame();

	const t = clamp01((frame - startFrame) / Math.max(1, typeDurationInFrames));
	const rawCount = t * text.length;
	const visibleCount = Math.floor(rawCount);

	const shown = text.slice(0, visibleCount);
	const nextChar = text.slice(visibleCount, visibleCount + 1);

	const nextCharProgress = rawCount - visibleCount; // 0..1
	const nextCharOpacity = interpolate(
		nextCharProgress,
		[0, 1],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }
	);

	// Subtle per-character fade-in feel (left -> right) by giving the newest char a short fade.
	const charOpacity = interpolate(
		frame,
		[startFrame, startFrame + typeDurationInFrames],
		[0.9, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }
	);

	return (
		<span style={{ ...style, opacity: charOpacity }}>
			<span style={{ whiteSpace: "pre" }}>{shown}</span>
			{nextChar ? (
				<span style={{ whiteSpace: "pre", opacity: nextCharOpacity }}>
					{nextChar}
				</span>
			) : null}
		</span>
	);
};

export const HelloWorldTypewriter: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const start = 10;

	// Timing
	const helloType = Math.round(0.55 * fps);
	const spaceType = Math.round(0.12 * fps);
	const worldType = Math.round(0.6 * fps);

	const helloStart = start;
	const spaceStart = helloStart + helloType;
	const worldStart = spaceStart + spaceType;

	const fullDone = worldStart + worldType;

	// Cursor blinking
	const blinkSpeed = Math.round(fps / 6); // ~6 blinks/sec
	const cursorOn = Math.floor(frame / Math.max(1, blinkSpeed)) % 2 === 0;

	// Highlight after "world" typed
	const highlightStart = fullDone + Math.round(0.2 * fps);
	const highlightDur = Math.round(0.35 * fps);
	const highlightProgress = interpolate(
		frame,
		[highlightStart, highlightStart + highlightDur],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }
	);

	const worldBgAlpha = interpolate(highlightProgress, [0, 1], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const worldTextAlpha = interpolate(highlightProgress, [0, 1], [1, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const baseTextStyle: React.CSSProperties = {
		fontFamily: FONT_FAMILY,
		fontWeight: 700,
		letterSpacing: -0.5,
		fontSize: 120,
		lineHeight: 1.05,
		color: "#111",
	};

	const containerStyle: React.CSSProperties = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		backgroundColor: "#fff",
	};

	const lineStyle: React.CSSProperties = {
		display: "flex",
		alignItems: "baseline",
		justifyContent: "center",
		gap: 0,
	};

	const worldStyle: React.CSSProperties = {
		padding: "0.06em 0.14em",
		borderRadius: "0.14em",
		backgroundColor: `rgba(255, 215, 0, ${worldBgAlpha})`,
		color: `rgba(0, 0, 0, ${worldTextAlpha})`,
	};

	const cursorStyle: React.CSSProperties = {
		display: "inline-block",
		width: "0.12em",
		height: "0.95em",
		backgroundColor: "#111",
		marginLeft: "0.08em",
		transform: "translateY(0.06em)",
		opacity:
			frame < start
				? 0
				: frame >= fullDone
					? cursorOn
						? 1
						: 0
					: 1,
		transition: "opacity 100ms linear",
	};

	// Responsive downscale for smaller widths (safe for landscape)
	const scale = interpolate(frame, [0, 1], [1, 1]);
	const wrapperStyle: React.CSSProperties = {
		transform: `scale(${scale})`,
		transformOrigin: "center",
		padding: 80,
	};

	return (
		<AbsoluteFill style={containerStyle}>
			<div style={wrapperStyle}>
				<div style={lineStyle}>
					<TypingText
						text={"Hello"}
						startFrame={helloStart}
						typeDurationInFrames={helloType}
						style={baseTextStyle}
					/>
					<TypingText
						text={" "}
						startFrame={spaceStart}
						typeDurationInFrames={spaceType}
						style={baseTextStyle}
					/>
					<span style={{ ...baseTextStyle, ...worldStyle }}>
						<TypingText
							text={"world"}
							startFrame={worldStart}
							typeDurationInFrames={worldType}
							style={{ color: "inherit" }}
						/>
					</span>
					<span style={cursorStyle} />
				</div>
			</div>
		</AbsoluteFill>
	);
};

export default HelloWorldTypewriter;