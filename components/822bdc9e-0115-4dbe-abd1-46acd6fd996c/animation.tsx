import React from "react";
import {AbsoluteFill} from "remotion";

type IconProps = {color?: string; size?: number};

const ICON_DEFAULT_COLOR = "#8f97a5";
const ICON_DEFAULT_SIZE = 22;

const IconSvg: React.FC<
	React.PropsWithChildren<{size: number; viewBox?: string}>
> = ({size, viewBox = "0 0 24 24", children}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox={viewBox}
			style={{display: "block"}}
		>
			{children}
		</svg>
	);
};

const IconUsers: React.FC<IconProps> = ({
	color = ICON_DEFAULT_COLOR,
	size = ICON_DEFAULT_SIZE,
}) => {
	return (
		<IconSvg size={size}>
			<path
				d="M9 11.3c2.1 0 3.8-1.65 3.8-3.65S11.1 4 9 4 5.2 5.65 5.2 7.65 6.9 11.3 9 11.3Zm7.2-.9c1.6 0 2.9-1.25 2.9-2.8S17.8 4.8 16.2 4.8s-2.9 1.25-2.9 2.8 1.3 2.8 2.9 2.8Z"
				fill={color}
				opacity={0.95}
			/>
			<path
				d="M2.7 20c0-3.25 4.05-5.6 7.7-5.6s7.7 2.35 7.7 5.6c0 .65-.5 1.1-1.15 1.1H3.85C3.2 21.1 2.7 20.65 2.7 20Z"
				fill={color}
				opacity={0.95}
			/>
		</IconSvg>
	);
};

const IconStar: React.FC<IconProps> = ({
	color = ICON_DEFAULT_COLOR,
	size = ICON_DEFAULT_SIZE,
}) => {
	return (
		<IconSvg size={size}>
			<path
				d="M12 2.7l2.76 5.6 6.18.9-4.47 4.36 1.06 6.16L12 16.9l-5.53 2.82 1.06-6.16L3.06 9.2l6.18-.9L12 2.7Z"
				fill={color}
				opacity={0.95}
			/>
		</IconSvg>
	);
};

const IconChat: React.FC<IconProps> = ({
	color = ICON_DEFAULT_COLOR,
	size = ICON_DEFAULT_SIZE,
}) => {
	return (
		<IconSvg size={size}>
			<path
				d="M12 3.3c-5 0-9 3.45-9 7.7 0 2.45 1.35 4.65 3.5 6.05l-.7 3.25c-.08.36.3.65.62.48l3.8-2.05c.58.1 1.18.16 1.78.16 5 0 9-3.45 9-7.7S17 3.3 12 3.3Z"
				fill={color}
				opacity={0.95}
			/>
			<circle cx="8.2" cy="11.2" r="1" fill="#1a2231" opacity={0.5} />
			<circle cx="12" cy="11.2" r="1" fill="#1a2231" opacity={0.5} />
			<circle cx="15.8" cy="11.2" r="1" fill="#1a2231" opacity={0.5} />
		</IconSvg>
	);
};

const IconBuilding: React.FC<IconProps> = ({
	color = ICON_DEFAULT_COLOR,
	size = ICON_DEFAULT_SIZE,
}) => {
	return (
		<IconSvg size={size}>
			<path
				d="M6.1 21.2V5.6c0-.7.45-1.3 1.1-1.5l4.7-1.5c.9-.3 1.9.35 1.9 1.3v17.3H6.1Z"
				fill={color}
				opacity={0.95}
			/>
			<path
				d="M14.2 21.2V8.2c0-.65.4-1.2 1-1.45l3.2-1.25c.9-.35 1.9.3 1.9 1.25V21.2H14.2Z"
				fill={color}
				opacity={0.82}
			/>
			<path
				d="M4 21.2h18v1.2H4v-1.2Z"
				fill={color}
				opacity={0.95}
			/>
			<g fill="#1a2231" opacity={0.45}>
				<rect x="7.8" y="6.6" width="1.6" height="1.6" rx="0.2" />
				<rect x="10.3" y="6.6" width="1.6" height="1.6" rx="0.2" />
				<rect x="7.8" y="9.3" width="1.6" height="1.6" rx="0.2" />
				<rect x="10.3" y="9.3" width="1.6" height="1.6" rx="0.2" />
				<rect x="7.8" y="12" width="1.6" height="1.6" rx="0.2" />
				<rect x="10.3" y="12" width="1.6" height="1.6" rx="0.2" />
				<rect x="15.6" y="9.2" width="1.5" height="1.5" rx="0.2" />
				<rect x="17.9" y="9.2" width="1.5" height="1.5" rx="0.2" />
				<rect x="15.6" y="11.6" width="1.5" height="1.5" rx="0.2" />
				<rect x="17.9" y="11.6" width="1.5" height="1.5" rx="0.2" />
			</g>
		</IconSvg>
	);
};

const HoneycombHex: React.FC<{x: number; y: number}> = ({x, y}) => {
	return (
		<div
			style={{
				position: "absolute",
				left: x,
				top: y,
				width: 26,
				height: 26,
				background: "#ffd83b",
				clipPath:
					"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
				boxShadow: "0 0 0 1px rgba(0,0,0,0.06) inset",
			}}
		/>
	);
};

const HoneycombLogo: React.FC = () => {
	const hexes = [
		{x: 30, y: 0},
		{x: 52, y: 12},
		{x: 8, y: 12},
		{x: 30, y: 24},
		{x: 52, y: 36},
		{x: 8, y: 36},
		{x: 30, y: 48},
	] as const;

	return (
		<div style={{position: "relative", width: 86, height: 70}}>
			{hexes.map(({x, y}) => (
				<HoneycombHex key={`${x}-${y}`} x={x} y={y} />
			))}
		</div>
	);
};

const MetaItem: React.FC<{
	icon: React.ReactNode;
	text: string;
	style?: React.CSSProperties;
}> = ({icon, text, style}) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 10,
				color: "#9aa2ae",
				fontSize: 24,
				letterSpacing: 0.2,
				...style,
			}}
		>
			<div style={{width: 26, height: 26, display: "flex", alignItems: "center"}}>
				{icon}
			</div>
			<div style={{opacity: 0.95}}>{text}</div>
		</div>
	);
};

const BackgroundGrid: React.FC = () => {
	return (
		<>
			{/* subtle grid */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
					backgroundSize: "160px 160px",
					opacity: 0.16,
					filter: "blur(0px)",
				}}
			/>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px)",
					backgroundSize: "160px 160px",
					opacity: 0.08,
				}}
			/>
		</>
	);
};

const CardGlowOverlay: React.FC = () => {
	return (
		<div
			style={{
				position: "absolute",
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				background:
					"radial-gradient(500px 240px at 25% 15%, rgba(255,255,255,0.06), rgba(255,255,255,0) 65%)",
				opacity: 0.8,
				pointerEvents: "none",
			}}
		/>
	);
};

const CardDivider: React.FC = () => {
	return (
		<div
			style={{
				position: "absolute",
				left: 0,
				right: 0,
				top: 408,
				height: 1,
				background: "rgba(255,255,255,0.12)",
				opacity: 0.7,
				borderTop: "1px dashed rgba(255,255,255,0.18)",
			}}
		/>
	);
};

const CardHeader: React.FC = () => {
	return (
		<>
			<div style={{position: "absolute", left: 80, top: 58}}>
				<HoneycombLogo />
			</div>

			<div
				style={{
					position: "absolute",
					left: 80,
					top: 190,
					color: "#ffffff",
					fontSize: 34,
					fontWeight: 700,
					letterSpacing: 0.2,
				}}
			>
				simple-rag-agent
			</div>

			<div
				style={{
					position: "absolute",
					left: 80,
					top: 262,
					width: 560,
					color: "rgba(156,166,180,0.88)",
					fontSize: 30,
					lineHeight: 1.45,
					fontWeight: 500,
				}}
			>
				Simple RAG agent use case that answers questions based on files.
			</div>
		</>
	);
};

const CardMeta: React.FC = () => {
	return (
		<>
			<div style={{position: "absolute", left: 88, top: 446}}>
				<MetaItem icon={<IconUsers />} text="1 Agents" />
			</div>

			<div style={{position: "absolute", left: 440, top: 446}}>
				<MetaItem icon={<IconStar />} text="0" />
			</div>

			<div style={{position: "absolute", left: 88, top: 512}}>
				<MetaItem icon={<IconChat />} text="Customer Support" />
			</div>

			<div style={{position: "absolute", left: 440, top: 512}}>
				<MetaItem icon={<IconBuilding />} text="Mike Company" />
			</div>
		</>
	);
};

const CardShell: React.FC<React.PropsWithChildren> = ({children}) => {
	return (
		<div
			style={{
				position: "absolute",
				left: 70,
				top: 70,
				width: 738,
				height: 600,
				borderRadius: 32,
				background:
					"linear-gradient(180deg, rgba(18,26,62,0.92) 0%, rgba(12,17,43,0.95) 100%)",
				boxShadow:
					"0 30px 60px rgba(0,0,0,0.35), 0 0 0 2px rgba(255,255,255,0.04) inset",
				border: "1px solid rgba(255,255,255,0.06)",
				overflow: "hidden",
			}}
		>
			{children}
		</div>
	);
};

export const SimpleRagAgentCard: React.FC = () => {
	return (
			<CardShell>
				<CardGlowOverlay />
				<CardHeader />
				<CardDivider />
				<CardMeta />
			</CardShell>
	);
};