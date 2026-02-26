import React from "react";
import {AbsoluteFill} from "remotion";

const FONT_FAMILY =
	"ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'";

/* ------------------------------ Background ------------------------------ */

const GridBg: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				background:
					"radial-gradient(1200px 700px at 50% 35%, rgba(30,45,95,0.55) 0%, rgba(8,12,33,0.95) 55%, rgba(6,8,24,1) 100%)",
			}}
		>
			<GridLines />
			<GridGlow />
		</AbsoluteFill>
	);
};

const GridLines: React.FC = () => (
	<div
		style={{
			position: "absolute",
			inset: 0,
			backgroundImage:
				"linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
			backgroundSize: "84px 84px",
			opacity: 0.35,
			filter: "blur(0px)",
		}}
	/>
);

const GridGlow: React.FC = () => (
	<div
		style={{
			position: "absolute",
			inset: 0,
			background:
				"radial-gradient(900px 550px at 50% 40%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 25%, rgba(0,0,0,0) 60%)",
			mixBlendMode: "screen",
			opacity: 0.45,
		}}
	/>
);

/* --------------------------------- Pills -------------------------------- */

const Pill: React.FC<{
	label: string;
	selected?: boolean;
	icon?: "avatar" | "wand" | "none";
	muted?: boolean;
}> = ({label, selected, icon = "avatar", muted}) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 12,
				padding: "12px 18px",
				borderRadius: 999,
				border: "1px solid rgba(255,255,255,0.18)",
				background: selected
					? "rgba(12,18,40,0.85)"
					: "rgba(7,10,24,0.25)",
				boxShadow: selected
					? "0 8px 22px rgba(0,0,0,0.35) inset, 0 2px 10px rgba(0,0,0,0.25)"
					: "0 0 0 rgba(0,0,0,0)",
				color: muted ? "rgba(210,220,240,0.45)" : "rgba(255,255,255,0.9)",
				fontSize: 22,
				fontFamily: FONT_FAMILY,
				letterSpacing: 0.2,
				whiteSpace: "nowrap",
			}}
		>
			{icon !== "none" && <PillIcon type={icon} />}
			<div style={{lineHeight: 1}}>{label}</div>
		</div>
	);
};

const PillIcon: React.FC<{type: "avatar" | "wand"}> = ({type}) => {
	return (
		<div
			style={{
				width: 28,
				height: 28,
				borderRadius: 999,
				background: "rgba(255,255,255,0.12)",
				border: "1px solid rgba(255,255,255,0.22)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				boxShadow: "0 2px 10px rgba(0,0,0,0.25) inset",
				overflow: "hidden",
			}}
		>
			{type === "wand" ? <WandGlyph /> : <AvatarGlyph />}
		</div>
	);
};

const WandGlyph: React.FC = () => (
	<div
		style={{
			width: 14,
			height: 14,
			transform: "rotate(-20deg)",
			position: "relative",
		}}
	>
		<div
			style={{
				position: "absolute",
				left: 6,
				top: -2,
				width: 2,
				height: 18,
				background: "rgba(255,255,255,0.9)",
				borderRadius: 2,
			}}
		/>
		<div
			style={{
				position: "absolute",
				left: 1,
				top: 7,
				width: 12,
				height: 2,
				background: "rgba(255,255,255,0.9)",
				borderRadius: 2,
			}}
		/>
	</div>
);

const AvatarGlyph: React.FC = () => (
	<div
		style={{
			width: "100%",
			height: "100%",
			background:
				"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 35%, rgba(255,255,255,0.12) 70%, rgba(0,0,0,0) 100%)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "rgba(0,0,0,0.55)",
			fontSize: 14,
			fontWeight: 700,
		}}
	>
		🙂
	</div>
);

/* ------------------------------ Sample cards ----------------------------- */

const SampleCard: React.FC<{text: string}> = ({text}) => {
	return (
		<div
			style={{
				width: 350,
				height: 210,
				borderRadius: 10,
				background: "rgba(12,16,40,0.45)",
				border: "1px solid rgba(255,255,255,0.18)",
				boxShadow: "0 10px 28px rgba(0,0,0,0.25) inset",
				padding: 28,
				color: "rgba(255,255,255,0.92)",
				fontFamily: FONT_FAMILY,
				fontSize: 22,
				lineHeight: 1.45,
				letterSpacing: 0.2,
			}}
		>
			{text}
		</div>
	);
};

/* --------------------------------- Icons -------------------------------- */

const IconCircle: React.FC<{type: "paperclip" | "mic"}> = ({type}) => {
	return (
		<div
			style={{
				width: 56,
				height: 56,
				borderRadius: 999,
				background: "rgba(255,255,255,0.06)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				boxShadow: "0 10px 20px rgba(0,0,0,0.25) inset",
				border: "1px solid rgba(255,255,255,0.08)",
				color: "rgba(215,225,245,0.75)",
			}}
		>
			{type === "paperclip" ? <PaperclipGlyph /> : <MicGlyph />}
		</div>
	);
};

const PaperclipGlyph: React.FC = () => (
	<div
		style={{
			width: 18,
			height: 26,
			borderRadius: 12,
			border: "3px solid rgba(215,225,245,0.75)",
			borderTopColor: "transparent",
			transform: "rotate(0deg)",
			position: "relative",
		}}
	>
		<div
			style={{
				position: "absolute",
				left: 5,
				top: 6,
				width: 8,
				height: 14,
				borderRadius: 8,
				border: "3px solid rgba(215,225,245,0.75)",
				borderTopColor: "transparent",
			}}
		/>
	</div>
);

const MicGlyph: React.FC = () => (
	<div style={{position: "relative", width: 22, height: 30}}>
		<div
			style={{
				position: "absolute",
				left: 5,
				top: 0,
				width: 12,
				height: 18,
				borderRadius: 8,
				border: "3px solid rgba(215,225,245,0.75)",
			}}
		/>
		<div
			style={{
				position: "absolute",
				left: 10,
				top: 18,
				width: 2,
				height: 8,
				background: "rgba(215,225,245,0.75)",
				borderRadius: 2,
			}}
		/>
		<div
			style={{
				position: "absolute",
				left: 4,
				top: 24,
				width: 14,
				height: 3,
				background: "rgba(215,225,245,0.75)",
				borderRadius: 2,
			}}
		/>
	</div>
);

/* ------------------------------- Send button ----------------------------- */

const SendButton: React.FC = () => {
	return (
		<div
			style={{
				height: 58,
				borderRadius: 999,
				background: "rgba(255,255,255,0.10)",
				border: "1px solid rgba(255,255,255,0.08)",
				padding: "0 22px",
				display: "flex",
				alignItems: "center",
				gap: 16,
				color: "rgba(220,230,250,0.65)",
				fontSize: 22,
				fontWeight: 600,
				fontFamily: FONT_FAMILY,
				boxShadow: "0 10px 20px rgba(0,0,0,0.25) inset",
			}}
		>
			<div style={{opacity: 0.8}}>Send</div>
			<SendArrow />
		</div>
	);
};

const SendArrow: React.FC = () => (
	<div
		style={{
			width: 0,
			height: 0,
			borderLeft: "14px solid rgba(220,230,250,0.75)",
			borderTop: "9px solid transparent",
			borderBottom: "9px solid transparent",
			transform: "rotate(-15deg)",
			marginRight: 2,
		}}
	/>
);

/* ---------------------------- Main input panel --------------------------- */

const MainInputPanel: React.FC = () => {
	return (
		<div
			style={{
				position: "absolute",
				left: 86,
				top: 252,
				width: 1428,
				height: 276,
				borderRadius: 26,
				background: "rgba(18,22,52,0.70)",
				boxShadow:
					"0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset",
				border: "8px solid transparent",
				backgroundClip: "padding-box",
			}}
		>
			<GradientBorder />
			<PanelSurface />
			<PanelHintText />
			<AgentSwarmChip />
			<PanelActions />
		</div>
	);
};

const GradientBorder: React.FC = () => (
	<div
		style={{
			position: "absolute",
			inset: -8,
			borderRadius: 30,
			background:
				"linear-gradient(90deg, rgba(140,90,255,0.95) 0%, rgba(211,116,207,0.75) 45%, rgba(242,185,80,0.90) 100%)",
			filter: "saturate(1.1)",
			opacity: 0.95,
		}}
	/>
);

const PanelSurface: React.FC = () => (
	<div
		style={{
			position: "absolute",
			inset: 0,
			borderRadius: 26,
			background: "rgba(18,22,52,0.75)",
			boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset",
		}}
	/>
);

const PanelHintText: React.FC = () => (
	<div
		style={{
			position: "absolute",
			left: 38,
			top: 42,
			color: "rgba(210,220,245,0.38)",
			fontSize: 30,
			fontWeight: 500,
			fontFamily: FONT_FAMILY,
			display: "inline-flex",
			alignItems: "baseline",
			gap: 8,
		}}
	>
		<div>Ask Agent Swarm to create a</div>
		<BlinkingCaret />
	</div>
);

const BlinkingCaret: React.FC = () => (
	<>
		<style>{`
			@keyframes caretBlink {
				0%, 49% { opacity: 1; }
				50%, 100% { opacity: 0; }
			}
		`}</style>
		<div
			style={{
				width: 3,
				height: 30,
				borderRadius: 2,
				background: "rgba(210,220,245,0.55)",
				boxShadow: "0 0 18px rgba(210,220,245,0.25)",
				transform: "translateY(3px)",
				animation: "caretBlink 1s step-end infinite",
			}}
		/>
	</>
);

const AgentSwarmChip: React.FC = () => (
	<div style={{position: "absolute", left: 36, bottom: 34}}>
		<div
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: 14,
				padding: "14px 22px",
				borderRadius: 999,
				background:
					"linear-gradient(90deg, rgba(104,56,255,0.55) 0%, rgba(245,193,92,0.45) 100%)",
				border: "1px solid rgba(255,255,255,0.16)",
				boxShadow: "0 14px 30px rgba(0,0,0,0.25) inset",
				color: "rgba(255,255,255,0.95)",
				fontSize: 26,
				fontWeight: 500,
				fontFamily: FONT_FAMILY,
			}}
		>
			<div
				style={{
					width: 30,
					height: 30,
					borderRadius: 999,
					background: "rgba(255,255,255,0.92)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: "0 6px 16px rgba(0,0,0,0.25) inset",
					fontSize: 16,
				}}
			>
				☁
			</div>
			<div>Agent Swarm</div>
		</div>
	</div>
);

const PanelActions: React.FC = () => (
	<div
		style={{
			position: "absolute",
			right: 34,
			bottom: 30,
			display: "flex",
			alignItems: "center",
			gap: 18,
		}}
	>
		<IconCircle type="paperclip" />
		<IconCircle type="mic" />
		<SendButton />
	</div>
);

/* --------------------------------- Header -------------------------------- */

const Title: React.FC = () => (
	<div
		style={{
			position: "absolute",
			left: 0,
			right: 0,
			top: 60,
			display: "flex",
			justifyContent: "center",
			color: "white",
			fontFamily: FONT_FAMILY,
			fontSize: 108,
			fontWeight: 800,
			letterSpacing: -1.5,
			textShadow: "0 6px 30px rgba(0,0,0,0.55)",
		}}
	>
		Hello world
	</div>
);

/* ------------------------------ Pills section ---------------------------- */

const PillsRow: React.FC = () => (
	<div
		style={{
			position: "absolute",
			left: 180,
			top: 568,
			width: 1240,
			display: "flex",
			flexWrap: "wrap",
			gap: 18,
			justifyContent: "center",
		}}
	>
		<Pill label="Agent Swarm" muted />
		<Pill label="General Agent" selected />
		<Pill label="Slides Agent" selected />
		<Pill label="Deep Research Agent" selected />
		<Pill label="Data Analyst" selected />
		<Pill label="Docs Agent" selected />
		<Pill label="Video Agent" selected />
		<Pill label="Image Agent" selected />
		<Pill label="Build Your Own" selected icon="wand" />
	</div>
);

/* --------------------------- Sample prompts area -------------------------- */

const SamplePromptsHeader: React.FC = () => (
	<div
		style={{
			position: "absolute",
			left: 96,
			top: 720,
			color: "rgba(210,220,245,0.55)",
			fontSize: 30,
			fontWeight: 700,
			fontFamily: FONT_FAMILY,
		}}
	>
		Sample prompts
	</div>
);

const SamplePromptsRow: React.FC = () => (
	<div
		style={{
			position: "absolute",
			left: 76,
			right: 76,
			top: 792,
			display: "flex",
			gap: 32,
			justifyContent: "center",
		}}
	>
		<SampleCard text={"What can this agency\ndo?"} />
		<SampleCard
			text={
				"Build a full launch\npackage: research,\nslides, docs, and\ncreative assets."
			}
		/>
		<SampleCard
			text={"Analyze my data and\nthen turn insights into\na polished executive\ndeck."}
		/>
		<SampleCard
			text={
				"Coordinate a\nworkflow for proposal\ndoc + promo visuals +\nshort product video."
			}
		/>
	</div>
);

/* ----------------------------- Bottom chevron ---------------------------- */

const BottomChevron: React.FC = () => (
	<div
		style={{
			position: "absolute",
			left: "50%",
			transform: "translateX(-50%)",
			bottom: 80,
			width: 72,
			height: 72,
			borderRadius: 999,
			background: "rgba(255,255,255,0.10)",
			border: "1px solid rgba(255,255,255,0.10)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			boxShadow: "0 16px 30px rgba(0,0,0,0.30) inset",
		}}
	>
		<ChevronGlyph />
	</div>
);

const ChevronGlyph: React.FC = () => (
	<div style={{position: "relative", width: 24, height: 24}}>
		<div
			style={{
				position: "absolute",
				left: 2,
				top: 3,
				width: 18,
				height: 18,
				borderRight: "4px solid rgba(255,255,255,0.9)",
				borderBottom: "4px solid rgba(255,255,255,0.9)",
				transform: "rotate(45deg)",
				borderRadius: 2,
				opacity: 0.95,
			}}
		/>
		<div
			style={{
				position: "absolute",
				left: 2,
				top: 13,
				width: 18,
				height: 18,
				borderRight: "4px solid rgba(255,255,255,0.85)",
				borderBottom: "4px solid rgba(255,255,255,0.85)",
				transform: "rotate(45deg)",
				borderRadius: 2,
				opacity: 0.85,
			}}
		/>
	</div>
);

/* --------------------------------- Screen -------------------------------- */

export const AgentSwarmPromptScreen: React.FC = () => {
	return (
		<AbsoluteFill style={{width: 1600, height: 1184}}>
			<GridBg />
			<Title />
			<MainInputPanel />
			<PillsRow />
			<SamplePromptsHeader />
			<SamplePromptsRow />
			<BottomChevron />
		</AbsoluteFill>
	);
};