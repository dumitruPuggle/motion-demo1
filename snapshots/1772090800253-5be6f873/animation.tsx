import React, {useMemo} from "react";
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

// Referenced component
import {SimpleRagAgentCard} from "./AgentCard";

const FONT = "Inter, sans-serif";

const clamp = (v: number, min: number, max: number) =>
	Math.min(max, Math.max(min, v));

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * @AssistantLanding
 * This component preserves the current animated "input" state as a reusable screen.
 *
 * If you already have an AssistantLanding component elsewhere, you can replace its contents
 * with this implementation, or rename/export as needed.
 */
const GridBg: React.FC<{frame: number}> = ({frame}) => {
	// Keep the original subtle drift, but add a gentle “intro fade-in” and a slight parallax zoom.
	const {fps} = useVideoConfig();

	const intro = spring({
		frame,
		fps,
		config: {damping: 18, stiffness: 80, mass: 0.9},
	});

	const driftX = Math.sin(frame / 90) * 40;
	const driftY = Math.cos(frame / 110) * 22;

	const opacity = interpolate(intro, [0, 1], [0, 1]);
	const scale = interpolate(intro, [0, 1], [1.02, 1.0]);

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				transform: `scale(${scale})`,
				opacity,
				background: `
          radial-gradient(1100px 680px at ${50 + driftX / 40}% ${-10 + driftY / 22}%, rgba(122,77,255,0.42) 0%, rgba(12,16,44,0) 62%),
          radial-gradient(900px 520px at ${95 + driftX / 60}% ${20 + driftY / 30}%, rgba(215,176,96,0.28) 0%, rgba(12,16,44,0) 60%),
          radial-gradient(820px 520px at ${8 + driftX / 70}% ${62 + driftY / 35}%, rgba(192,122,182,0.22) 0%, rgba(12,16,44,0) 62%),
          linear-gradient(180deg, #0b1234 0%, #070d24 55%, #060a1d 100%)
        `.replace(/\s+/g, " "),
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
					mixBlendMode: "screen",
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
		</div>
	);
};

const Avatar: React.FC<{
	size?: number;
	label?: string;
	variant?: "brown" | "purple" | "blue" | "gray";
}> = ({size = 26, label = "A", variant = "gray"}) => {
	const bg =
		variant === "brown"
			? "linear-gradient(180deg, #f1c7a6 0%, #b57d59 100%)"
			: variant === "purple"
				? "linear-gradient(180deg, #d6b0ff 0%, #7e5ad1 100%)"
				: variant === "blue"
					? "linear-gradient(180deg, #b7d4ff 0%, #4e79ff 100%)"
					: "linear-gradient(180deg, #e5e8f4 0%, #8f97b7 100%)";

	return (
		<div
			style={{
				width: size,
				height: size,
				borderRadius: 999,
				background: bg,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				boxShadow:
					"0 0 0 2px rgba(255,255,255,0.25) inset, 0 2px 10px rgba(0,0,0,0.25)",
				position: "relative",
				overflow: "hidden",
				flexShrink: 0,
			}}
		>
			<div
				style={{
					fontFamily: FONT,
					fontWeight: 800,
					fontSize: Math.max(10, size * 0.44),
					color: "rgba(10,12,22,0.75)",
					letterSpacing: -0.5,
				}}
			>
				{label}
			</div>
			<div
				style={{
					position: "absolute",
					inset: 0,
					background:
						"radial-gradient(14px 14px at 30% 28%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.0) 70%)",
					opacity: 0.7,
				}}
			/>
		</div>
	);
};

const IconPaperclip = ({color = "rgba(255,255,255,0.65)"}: {color?: string}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" style={{display: "block"}}>
		<path
			d="M8.5 12.7l6.7-6.7a3.2 3.2 0 014.5 4.5l-7.8 7.8a5.1 5.1 0 01-7.2-7.2l7.6-7.6"
			fill="none"
			stroke={color}
			strokeWidth="2.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const IconMic = ({color = "rgba(255,255,255,0.65)"}: {color?: string}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" style={{display: "block"}}>
		<path
			d="M12 14.5a3 3 0 003-3V7.2a3 3 0 10-6 0v4.3a3 3 0 003 3z"
			fill="none"
			stroke={color}
			strokeWidth="2.2"
			strokeLinejoin="round"
		/>
		<path
			d="M6.8 11.5c0 3 2.4 5.5 5.2 5.5s5.2-2.5 5.2-5.5"
			fill="none"
			stroke={color}
			strokeWidth="2.2"
			strokeLinecap="round"
		/>
		<path
			d="M12 17v3"
			fill="none"
			stroke={color}
			strokeWidth="2.2"
			strokeLinecap="round"
		/>
	</svg>
);

const IconSend = ({color = "rgba(255,255,255,0.65)"}: {color?: string}) => (
	<svg width="24" height="24" viewBox="0 0 24 24" style={{display: "block"}}>
		<path
			d="M20.5 4.6L10.1 14.9"
			stroke={color}
			strokeWidth="2.2"
			strokeLinecap="round"
			strokeLinejoin="round"
			fill="none"
		/>
		<path
			d="M20.5 4.6l-6.2 15.8-3.1-6.2L4.9 11 20.5 4.6z"
			fill={color}
			opacity={0.22}
		/>
		<path
			d="M20.5 4.6l-6.2 15.8-3.1-6.2L4.9 11 20.5 4.6z"
			stroke={color}
			strokeWidth="2.0"
			strokeLinejoin="round"
			fill="none"
		/>
	</svg>
);

const AnimatedIn: React.FC<{
	frame: number;
	fps: number;
	delay: number;
	children: React.ReactNode;
	from?: {y?: number; x?: number; scale?: number; blur?: number};
}> = ({frame, fps, delay, children, from}) => {
	const f = Math.max(0, frame - delay);
	const p = spring({
		frame: f,
		fps,
		config: {damping: 18, stiffness: 120, mass: 0.8},
	});

	const x = interpolate(p, [0, 1], [from?.x ?? 0, 0]);
	const y = interpolate(p, [0, 1], [from?.y ?? 18, 0]);
	const s = interpolate(p, [0, 1], [from?.scale ?? 0.98, 1]);
	const blur = interpolate(p, [0, 1], [from?.blur ?? 10, 0]);
	const opacity = interpolate(p, [0, 1], [0, 1]);

	return (
		<div
			style={{
				transform: `translate3d(${x}px, ${y}px, 0) scale(${s})`,
				filter: `blur(${blur}px)`,
				opacity,
				willChange: "transform, opacity, filter",
			}}
		>
			{children}
		</div>
	);
};

const RevealText: React.FC<{
	frame: number;
	fps: number;
	delay: number;
	text: string;
	fontSize: number;
	color: string;
	weight?: number;
}> = ({frame, fps, delay, text, fontSize, color, weight = 500}) => {
	const f = Math.max(0, frame - delay);
	const p = spring({
		frame: f,
		fps,
		config: {damping: 20, stiffness: 110, mass: 0.9},
	});

	const y = interpolate(p, [0, 1], [10, 0]);
	const opacity = interpolate(p, [0, 1], [0, 1]);
	const tracking = interpolate(p, [0, 1], [1.2, -0.2]);
	const blur = interpolate(p, [0, 1], [8, 0]);

	return (
		<div
			style={{
				fontFamily: FONT,
				fontSize,
				color,
				letterSpacing: tracking,
				fontWeight: weight,
				transform: `translate3d(0, ${y}px, 0)`,
				opacity,
				filter: `blur(${blur}px)`,
				willChange: "transform, opacity, filter",
				whiteSpace: "nowrap",
			}}
		>
			{text}
		</div>
	);
};

const ActionButtonCircle: React.FC<{children: React.ReactNode}> = ({children}) => (
	<div
		style={{
			width: 54,
			height: 54,
			borderRadius: 999,
			background: "rgba(255,255,255,0.05)",
			border: "1px solid rgba(255,255,255,0.08)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backdropFilter: "blur(6px)",
		}}
	>
		{children}
	</div>
);

export const AssistantLanding: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height, durationInFrames} = useVideoConfig();

	// Preserve the existing "input" choreography/state.
	const outroStart = Math.max(0, durationInFrames - Math.round(fps * 0.9));
	const outroT = clamp(
		(frame - outroStart) / (durationInFrames - outroStart),
		0,
		1
	);
	const outroEase = easeOutCubic(outroT);

	const globalOpacity = interpolate(outroEase, [0, 1], [1, 0]);
	const globalY = interpolate(outroEase, [0, 1], [0, 18]);

	const cardW = Math.min(1352, width - 140);
	// Reduced bottom padding/space by shrinking the card height by 20% (260 -> 208).
	const cardH = Math.min(208, Math.max(184, Math.round(height * 0.26 * 0.8)));

	const borderPulse = useMemo(() => {
		// A soft “alive” pulse after intro has completed.
		const introDone = spring({
			frame,
			fps,
			config: {damping: 20, stiffness: 90},
		}); // ~first second
		const alive = Math.sin(frame / 20) * 0.5 + 0.5;
		return interpolate(introDone, [0, 1], [0, 1]) * alive;
	}, [frame, fps]);

	// Caret: use interpolate for a smoother blink (not boolean).
	const caret = interpolate(
		Math.sin((frame / fps) * Math.PI * 2 * 2.2),
		[-1, 1],
		[0.2, 1]
	);

	// Icon micro-bounce (staggered), subtle.
	const iconBob = (phase: number) =>
		Math.sin((frame + phase) / 14) *
		1.6 *
		interpolate(borderPulse, [0, 1], [0, 1]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: "transparent",
				justifyContent: "center",
				alignItems: "center",
				fontFamily: FONT,
			}}
		>
			<GridBg frame={frame} />

			<div
				style={{
					transform: `translate3d(0, ${globalY}px, 0)`,
					opacity: globalOpacity,
					willChange: "transform, opacity",
				}}
			>
				{/* Main input card */}
				<AnimatedIn
					frame={frame}
					fps={fps}
					delay={6}
					from={{y: 26, scale: 0.985, blur: 14}}
				>
					<div
						style={{
							width: cardW,
							height: cardH,
							borderRadius: 26,
							background: "rgba(22,28,66,0.62)",
							boxShadow: "0 22px 55px rgba(0,0,0,0.35)",
							position: "relative",
							overflow: "hidden",
						}}
					>
						{/* Gradient border with pulse */}
						<div
							style={{
								position: "absolute",
								inset: 0,
								borderRadius: 26,
								border: "8px solid transparent",
								background:
									"linear-gradient(rgba(22,28,66,0.62), rgba(22,28,66,0.62)) padding-box, linear-gradient(90deg, #7a4dff 0%, #c07ab6 45%, #d7b060 100%) border-box",
								pointerEvents: "none",
								opacity: 0.9 + borderPulse * 0.12,
								filter: `saturate(${1 + borderPulse * 0.08})`,
							}}
						/>

						{/* Inner sheen */}
						<div
							style={{
								position: "absolute",
								inset: 0,
								borderRadius: 26,
								background:
									"radial-gradient(900px 260px at 20% 10%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.0) 62%)",
								opacity: 0.35,
								pointerEvents: "none",
							}}
						/>

						{/* Headline with dedicated motion */}
						<div style={{position: "absolute", left: 34, top: 40}}>
							<RevealText
								frame={frame}
								fps={fps}
								delay={12}
								text="Ask Agent Swarm to create a"
								fontSize={30}
								color="rgba(210,220,255,0.35)"
								weight={500}
							/>
						</div>

						{/* Input pill (staggered after headline) */}
						<div style={{position: "absolute", left: 34, top: 134}}>
							<AnimatedIn
								frame={frame}
								fps={fps}
								delay={20}
								from={{y: 16, scale: 0.98, blur: 10}}
							>
								<div
									style={{
										height: 45,
										borderRadius: 999,
										paddingLeft: 16,
										paddingRight: 22,
										display: "flex",
										alignItems: "center",
										gap: 12,
										background:
											"linear-gradient(90deg, rgba(133,67,255,0.82) 0%, rgba(211,182,86,0.56) 100%)",
										boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
									}}
								>
									<AnimatedIn
										frame={frame}
										fps={fps}
										delay={26}
										from={{x: -10, y: 0, scale: 0.9, blur: 8}}
									>
										<Avatar size={28} label="A" variant="brown" />
									</AnimatedIn>

									<div
										style={{
											fontFamily: FONT,
											fontSize: 26,
											color: "rgba(255,255,255,0.95)",
											letterSpacing: -0.2,
											fontWeight: 600,
											display: "flex",
											alignItems: "center",
											gap: 8,
										}}
									>
										<AnimatedIn
											frame={frame}
											fps={fps}
											delay={28}
											from={{y: 8, blur: 10}}
										>
											<span style={{display: "inline-block"}}>
												Agent Swarm
											</span>
										</AnimatedIn>

										{/* Caret: smooth blink + tiny baseline float */}
										<span
											style={{
												width: 2,
												height: 24,
												background: "rgba(255,255,255,0.95)",
												borderRadius: 2,
												display: "inline-block",
												opacity: caret,
												transform: `translateY(${interpolate(
													caret,
													[0.2, 1],
													[1, 0]
												)}px)`,
											}}
										/>
									</div>
								</div>
							</AnimatedIn>
						</div>

						{/* Actions (staggered independently) */}
						<div
							style={{
								position: "absolute",
								right: 30,
								top: 124,
								display: "flex",
								alignItems: "center",
								gap: 16,
							}}
						>
							<AnimatedIn
								frame={frame}
								fps={fps}
								delay={30}
								from={{x: 18, y: 0, scale: 0.96, blur: 10}}
							>
								<div style={{transform: `translateY(${iconBob(0)}px)`}}>
									<ActionButtonCircle>
										<IconPaperclip />
									</ActionButtonCircle>
								</div>
							</AnimatedIn>

							<AnimatedIn
								frame={frame}
								fps={fps}
								delay={34}
								from={{x: 18, y: 0, scale: 0.96, blur: 10}}
							>
								<div style={{transform: `translateY(${iconBob(12)}px)`}}>
									<ActionButtonCircle>
										<IconMic />
									</ActionButtonCircle>
								</div>
							</AnimatedIn>

							<AnimatedIn
								frame={frame}
								fps={fps}
								delay={38}
								from={{x: 20, y: 0, scale: 0.97, blur: 10}}
							>
								<div
									style={{
										height: 54,
										width: 196,
										borderRadius: 999,
										background: "rgba(210,220,255,0.16)",
										border: "1px solid rgba(255,255,255,0.10)",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										paddingLeft: 24,
										paddingRight: 18,
										gap: 10,
										backdropFilter: "blur(6px)",
										boxShadow: `0 ${10 + borderPulse * 6}px ${
											24 + borderPulse * 10
										}px rgba(0,0,0,0.22)`,
									}}
								>
									<div
										style={{
											fontFamily: FONT,
											fontSize: 26,
											color: "rgba(255,255,255,0.45)",
											fontWeight: 700,
											letterSpacing: -0.2,
											transform: `translateY(${interpolate(
												borderPulse,
												[0, 1],
												[0, -0.5]
											)}px)`,
										}}
									>
										Send
									</div>

									<div
										style={{
											opacity: 0.95,
											transform: `translateY(${iconBob(24)}px)`,
										}}
									>
										<IconSend />
									</div>
								</div>
							</AnimatedIn>
						</div>
					</div>
				</AnimatedIn>
			</div>

			{/* Bottom: Agent card */}
			<div
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					height: Math.min(720, Math.round(height * 0.48)),
					overflow: "hidden",
					pointerEvents: "none",
				}}
			>
				<SimpleRagAgentCard />
			</div>
		</AbsoluteFill>
	);
};

// Backwards-compatible export: this screen previously exported as WhatShouldWeBuildScreen.
export const WhatShouldWeBuildScreen = AssistantLanding;

export default AssistantLanding;