import React from "react";
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

const FONT_FAMILY = "Inter, sans-serif";

// --- Referenced component: Assistant Landing (background) ---
const GridBg: React.FC<{ driftX: number; driftY: number; pulse: number }> = ({
	driftX,
	driftY,
	pulse,
}) => {
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				background:
					"radial-gradient(1200px 700px at 50% 0%, rgba(64,84,255,0.25) 0%, rgba(10,16,44,0.0) 65%), linear-gradient(180deg, #0b1234 0%, #070d24 55%, #060a1d 100%)",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
					backgroundSize: "96px 96px",
					opacity: 0.18,
					filter: "blur(0px)",
					mixBlendMode: "screen",
					transform: `translate3d(${driftX * 0.35}px, ${driftY * 0.35}px, 0)`,
				}}
			/>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
					opacity: 0.07,
					mixBlendMode: "screen",
					transform: `translate3d(${-driftX * 0.65}px, ${-driftY * 0.65}px, 0)`,
				}}
			/>
			<div
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					height: 420,
					background:
						"radial-gradient(900px 340px at 50% 10%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.55) 100%)",
					opacity: 0.55,
				}}
			/>
			<div
				style={{
					position: "absolute",
					inset: -120,
					background:
						"radial-gradient(520px 360px at 20% 30%, rgba(110,231,255,0.18) 0%, rgba(110,231,255,0.0) 65%), radial-gradient(520px 360px at 80% 70%, rgba(167,139,250,0.16) 0%, rgba(167,139,250,0.0) 62%)",
					opacity: 0.95,
					filter: "blur(10px)",
					transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(${1 + 0.03 * pulse})`,
				}}
			/>
		</div>
	);
};

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

	// "Animate it all over the place": global float/tilt + background drift
	const entrance = spring({
		frame,
		fps,
		config: { damping: 12, stiffness: 120, mass: 0.9 },
	});
	const float1 = Math.sin(frame / 17);
	const float2 = Math.cos(frame / 23);
	const driftX = float1 * 26 + float2 * 12;
	const driftY = Math.cos(frame / 19) * 22 + Math.sin(frame / 29) * 10;
	const tilt = Math.sin(frame / 31) * 6;
	const twist = Math.cos(frame / 37) * 4;
	const pulse = (Math.sin(frame / 13) + 1) / 2; // 0..1

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
		fontWeight: 800,
		letterSpacing: -0.8,
		fontSize: 120,
		lineHeight: 1.05,
		color: "rgba(235, 242, 255, 0.95)",
		textShadow:
			"0 18px 60px rgba(0,0,0,0.55), 0 2px 0 rgba(0,0,0,0.25)",
	};

	const containerStyle: React.CSSProperties = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		backgroundColor: "#060a1d",
		overflow: "hidden",
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
		backgroundColor: `rgba(110, 231, 255, ${0.18 * worldBgAlpha})`,
		color: `rgba(235, 242, 255, ${worldTextAlpha})`,
		boxShadow: `0 18px 60px rgba(0,0,0,${0.35 * worldBgAlpha}), 0 0 0 1px rgba(255,255,255,${0.16 * worldBgAlpha}) inset`,
	};

	const cursorStyle: React.CSSProperties = {
		display: "inline-block",
		width: "0.12em",
		height: "0.95em",
		backgroundColor: "rgba(235, 242, 255, 0.95)",
		marginLeft: "0.08em",
		transform: `translateY(0.06em) rotate(${Math.sin(frame / 9) * 2}deg)`,
		opacity:
			frame < start
				? 0
				: frame >= fullDone
					? cursorOn
						? 1
						: 0
					: 1,
		boxShadow: "0 0 18px rgba(110,231,255,0.25)",
		transition: "opacity 100ms linear",
	};

	// Global motion wrapper: bouncy entrance + continuous float/tilt/scale
	const scale = 0.98 + 0.06 * entrance + 0.015 * float2;
	const wrapperStyle: React.CSSProperties = {
		transform: `translate3d(${driftX}px, ${driftY}px, 0) rotate(${tilt}deg) rotateZ(${twist}deg) scale(${scale})`,
		transformOrigin: "center",
		padding: 80,
		willChange: "transform",
	};

	const innerCardStyle: React.CSSProperties = {
		position: "relative",
		padding: "56px 72px",
		borderRadius: 28,
		background:
			"linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)",
		boxShadow:
			"0 40px 140px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.10) inset",
		backdropFilter: "blur(10px)",
		WebkitBackdropFilter: "blur(10px)",
	};

	return (
		<AbsoluteFill style={containerStyle}>
			<GridBg driftX={driftX} driftY={driftY} pulse={pulse} />
			<div style={wrapperStyle}>
				<div style={innerCardStyle}>
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
			</div>
		</AbsoluteFill>
	);
};

export default HelloWorldTypewriter;