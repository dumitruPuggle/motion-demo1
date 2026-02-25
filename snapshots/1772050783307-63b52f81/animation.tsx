import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Full replacement:
 * The user asked to replace the whole animation with the referenced component.
 * Below is a self-contained implementation matching the "Assistant Landing" reference,
 * including the referenced GridBg and the missing subcomponents (Avatar, Chip, PromptCard, DownButton).
 */

const GridBg: React.FC = () => {
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

const GlassPanel: React.FC<{
	style?: React.CSSProperties;
	children?: React.ReactNode;
}> = ({ style, children }) => {
	return (
		<div
			style={{
				borderRadius: 26,
				background:
					"linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
				border: "1px solid rgba(255,255,255,0.14)",
				boxShadow:
					"0 30px 90px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.10)",
				backdropFilter: "blur(10px)",
				WebkitBackdropFilter: "blur(10px)",
				...style,
			}}
		>
			{children}
		</div>
	);
};

const Chip: React.FC<{
	text: string;
	icon?: React.ReactNode;
	style?: React.CSSProperties;
}> = ({ text, icon, style }) => {
	return (
		<div
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: 10,
				padding: "12px 16px",
				borderRadius: 999,
				background: "rgba(10, 18, 44, 0.55)",
				border: "1px solid rgba(255,255,255,0.12)",
				boxShadow:
					"0 16px 50px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.08)",
				color: "rgba(235, 242, 255, 0.86)",
				fontFamily:
					"system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
				fontSize: 18,
				fontWeight: 600,
				letterSpacing: -0.2,
				...style,
			}}
		>
			{icon ? (
				<div
					style={{
						width: 28,
						height: 28,
						display: "grid",
						placeItems: "center",
						borderRadius: 10,
						background: "rgba(255,255,255,0.06)",
						border: "1px solid rgba(255,255,255,0.10)",
					}}
				>
					{icon}
				</div>
			) : null}
			<div style={{ whiteSpace: "pre-line" }}>{text}</div>
		</div>
	);
};

const PromptCard: React.FC<{ text: string; width?: number }> = ({
	text,
	width = 312,
}) => {
	return (
		<div
			style={{
				width,
				borderRadius: 22,
				padding: "18px 18px",
				background:
					"linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)",
				border: "1px solid rgba(255,255,255,0.14)",
				boxShadow:
					"0 26px 70px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)",
				color: "rgba(235, 242, 255, 0.80)",
				fontFamily:
					"system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
				fontSize: 20,
				fontWeight: 650,
				lineHeight: 1.15,
				letterSpacing: -0.2,
				overflow: "hidden",
				position: "relative",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: -2,
					background:
						"radial-gradient(500px 140px at 30% 0%, rgba(97, 120, 255, 0.20) 0%, rgba(97, 120, 255, 0.0) 55%), radial-gradient(500px 140px at 90% 20%, rgba(64, 219, 255, 0.12) 0%, rgba(64, 219, 255, 0.0) 55%)",
					opacity: 0.9,
					pointerEvents: "none",
				}}
			/>
			<div style={{ position: "relative", whiteSpace: "pre-line" }}>{text}</div>
		</div>
	);
};

const Avatar: React.FC<{
	size?: number;
	label?: string;
	variant?: "brown" | "purple" | "blue";
}> = ({ size = 84, label = "A", variant = "purple" }) => {
	const gradients: Record<string, string> = {
		brown:
			"radial-gradient(90px 90px at 30% 25%, rgba(255, 225, 190, 0.65) 0%, rgba(255, 210, 165, 0.08) 55%, rgba(0,0,0,0) 70%), linear-gradient(135deg, #6b3e2b 0%, #2a1620 60%, #0b0f22 100%)",
		purple:
			"radial-gradient(90px 90px at 30% 25%, rgba(207, 175, 255, 0.65) 0%, rgba(207, 175, 255, 0.10) 55%, rgba(0,0,0,0) 70%), linear-gradient(135deg, #5a3cff 0%, #1b1647 55%, #0b0f22 100%)",
		blue:
			"radial-gradient(90px 90px at 30% 25%, rgba(150, 220, 255, 0.65) 0%, rgba(150, 220, 255, 0.10) 55%, rgba(0,0,0,0) 70%), linear-gradient(135deg, #0bb6ff 0%, #0d1a4f 55%, #0b0f22 100%)",
	};

	return (
		<div
			style={{
				width: size,
				height: size,
				borderRadius: 999,
				background: gradients[variant],
				border: "1px solid rgba(255,255,255,0.18)",
				boxShadow:
					"0 26px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
				display: "grid",
				placeItems: "center",
				color: "rgba(255,255,255,0.92)",
				fontFamily:
					"system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
				fontWeight: 800,
				fontSize: Math.max(22, Math.round(size * 0.34)),
				letterSpacing: -0.8,
				textShadow: "0 10px 30px rgba(0,0,0,0.35)",
			}}
		>
			{label}
		</div>
	);
};

const DownButton: React.FC = () => {
	return (
		<div
			style={{
				position: "absolute",
				left: "50%",
				transform: "translateX(-50%)",
				bottom: 44,
				width: 56,
				height: 56,
				borderRadius: 999,
				background: "rgba(255,255,255,0.08)",
				border: "1px solid rgba(255,255,255,0.16)",
				boxShadow:
					"0 22px 70px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)",
				display: "grid",
				placeItems: "center",
				color: "rgba(235,242,255,0.85)",
			}}
		>
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
				<path
					d="M12 5v12"
					stroke="rgba(255,255,255,0.85)"
					strokeWidth="2.2"
					strokeLinecap="round"
				/>
				<path
					d="M7 13l5 5 5-5"
					stroke="rgba(255,255,255,0.85)"
					strokeWidth="2.2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};

export const HelloWorldTypewriter: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: "#060a1d" }}>
			<GridBg />

			{/* Top-left brand */}
			<div
				style={{
					position: "absolute",
					left: 70,
					top: 54,
					display: "flex",
					alignItems: "center",
					gap: 14,
					color: "rgba(235, 242, 255, 0.88)",
					fontFamily:
						"system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
					fontWeight: 800,
					letterSpacing: -0.6,
					fontSize: 22,
				}}
			>
				<div
					style={{
						width: 38,
						height: 38,
						borderRadius: 12,
						background:
							"linear-gradient(135deg, rgba(97,120,255,0.9) 0%, rgba(0, 209, 255, 0.55) 100%)",
						boxShadow: "0 16px 60px rgba(40, 110, 255, 0.35)",
						border: "1px solid rgba(255,255,255,0.20)",
						display: "grid",
						placeItems: "center",
					}}
				>
					<div
						style={{
							width: 18,
							height: 18,
							borderRadius: 6,
							background: "rgba(255,255,255,0.88)",
							opacity: 0.92,
						}}
					/>
				</div>
				Assistant
			</div>

			{/* Main card */}
			<GlassPanel
				style={{
					position: "absolute",
					left: 70,
					top: 140,
					width: 1380,
					height: 520,
					padding: 44,
				}}
			>
				<div
					style={{
						display: "flex",
						gap: 34,
						alignItems: "flex-start",
					}}
				>
					<div style={{ paddingTop: 6 }}>
						<Avatar size={92} label="A" variant="purple" />
					</div>

					<div style={{ flex: 1 }}>
						<div
							style={{
								fontFamily:
									"system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
								fontSize: 64,
								fontWeight: 900,
								letterSpacing: -1.6,
								lineHeight: 0.98,
								color: "rgba(240, 246, 255, 0.92)",
							}}
						>
							Build an agency,
							<br />
							then scale it.
						</div>

						<div
							style={{
								marginTop: 18,
								maxWidth: 880,
								fontFamily:
									"system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
								fontSize: 24,
								fontWeight: 650,
								lineHeight: 1.25,
								color: "rgba(225, 236, 255, 0.72)",
								letterSpacing: -0.3,
							}}
						>
							Your AI partner for research, proposals, decks, and creative production.
						</div>

						<div style={{ marginTop: 26, display: "flex", gap: 16 }}>
							<Chip
								text="Start a project"
								icon={
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
										<path
											d="M12 5v14"
											stroke="rgba(255,255,255,0.85)"
											strokeWidth="2.2"
											strokeLinecap="round"
										/>
										<path
											d="M5 12h14"
											stroke="rgba(255,255,255,0.85)"
											strokeWidth="2.2"
											strokeLinecap="round"
										/>
									</svg>
								}
								style={{
									background:
										"linear-gradient(135deg, rgba(97,120,255,0.35) 0%, rgba(0, 209, 255, 0.18) 100%)",
									border: "1px solid rgba(140, 170, 255, 0.26)",
								}}
							/>
							<Chip
								text="Edit workflow"
								icon={
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
										<path
											d="M4 20h4l11-11-4-4L4 16v4z"
											fill="none"
											stroke="rgba(255,255,255,0.85)"
											strokeWidth="2.2"
											strokeLinejoin="round"
										/>
										<path
											d="M14.5 6.5l4 4"
											stroke="rgba(255,255,255,0.85)"
											strokeWidth="2.2"
											strokeLinecap="round"
										/>
									</svg>
								}
							/>
						</div>
					</div>
				</div>
			</GlassPanel>

			{/* Sample prompts header */}
			<div
				style={{
					position: "absolute",
					left: 90,
					top: 690,
					fontFamily:
						"system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
					fontSize: 28,
					fontWeight: 700,
					color: "rgba(230,240,255,0.55)",
					letterSpacing: -0.2,
				}}
			>
				Sample prompts
			</div>

			{/* Prompt cards row */}
			<div
				style={{
					position: "absolute",
					left: 80,
					top: 748,
					width: 1352,
					display: "flex",
					gap: 28,
				}}
			>
				<PromptCard text={"What can this agency\ndo?"} width={312} />
				<PromptCard
					text={"Build a full launch\npackage: research,\nslides, docs, and\ncreative assets."}
					width={312}
				/>
				<PromptCard
					text={"Analyze my data and\nthen turn insights into\na polished executive\ndeck."}
					width={312}
				/>
				<PromptCard
					text={"Coordinate a\nworkflow for proposal\ndoc + promo visuals +\nshort product video."}
					width={312}
				/>
			</div>

			<DownButton />
		</AbsoluteFill>
	);
};

export default HelloWorldTypewriter;