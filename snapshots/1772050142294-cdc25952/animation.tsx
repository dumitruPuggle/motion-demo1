import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * NOTE:
 * You asked to "REPLACE the whole animation with this component",
 * but the replacement component code was not included in your message.
 * Paste the component you want to replace this file with (full TSX),
 * or tell me its exact name and file path, and I will integrate it.
 */

// Keep the referenced component name available (as requested: preserve referenced names where possible).
// This is a placeholder until you provide the target replacement component.
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

export const HelloWorldTypewriter: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: "#060a1d" }}>
			<GridBg />
			<AbsoluteFill
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: 80,
					color: "rgba(235, 242, 255, 0.9)",
					fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
					fontSize: 34,
					textAlign: "center",
				}}
			>
				<div style={{ maxWidth: 980, lineHeight: 1.35 }}>
					Paste the component you want to replace this animation with, and I will
					replace the entire file accordingly.
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

export default HelloWorldTypewriter;