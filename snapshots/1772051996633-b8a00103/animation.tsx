import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

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

const Avatar: React.FC<{ size?: number; label?: string; variant?: "brown" | "purple" | "blue" | "gray" }> = ({
  size = 26,
  label = "A",
  variant = "gray",
}) => {
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
        boxShadow: "0 0 0 2px rgba(255,255,255,0.25) inset, 0 2px 10px rgba(0,0,0,0.25)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
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

const Pill: React.FC<{
  text: string;
  selected?: boolean;
  icon?: React.ReactNode;
  avatar?: { label: string; variant?: "brown" | "purple" | "blue" | "gray" };
  muted?: boolean;
  width?: number;
}> = ({ text, selected, icon, avatar, muted, width }) => {
  return (
    <div
      style={{
        height: 46,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: width ?? "auto",
        border: selected ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.18)",
        background: selected
          ? "linear-gradient(180deg, rgba(10,14,34,0.5) 0%, rgba(10,14,34,0.38) 100%)"
          : "rgba(6,10,26,0.25)",
        boxShadow: selected ? "0 10px 22px rgba(0,0,0,0.25)" : "none",
        opacity: muted ? 0.55 : 1,
      }}
    >
      {avatar ? <Avatar size={24} label={avatar.label} variant={avatar.variant ?? "gray"} /> : null}
      {icon ? (
        <div style={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          fontSize: 22,
          color: "rgba(255,255,255,0.92)",
          letterSpacing: -0.2,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
};

const IconPaperclip = ({ color = "rgba(255,255,255,0.65)" }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ display: "block" }}>
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

const IconMic = ({ color = "rgba(255,255,255,0.65)" }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ display: "block" }}>
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

const IconSend = ({ color = "rgba(255,255,255,0.65)" }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ display: "block" }}>
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

const PromptCard: React.FC<{ text: string; width: number }> = ({ text, width }) => {
  return (
    <div
      style={{
        width,
        height: 190,
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(20,27,62,0.35)",
        boxShadow: "0 10px 26px rgba(0,0,0,0.22)",
        padding: 22,
        color: "rgba(255,255,255,0.9)",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        fontSize: 22,
        lineHeight: 1.5,
        letterSpacing: -0.2,
      }}
    >
      {text}
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
        bottom: 52,
        width: 62,
        height: 62,
        borderRadius: 999,
        background: "rgba(220,232,255,0.13)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" style={{ display: "block" }}>
        <path
          d="M6.5 9.5l5.5 5.5 5.5-5.5"
          fill="none"
          stroke="rgba(255,255,255,0.78)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 5.5l5.5 5.5 5.5-5.5"
          fill="none"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.75}
        />
      </svg>
    </div>
  );
};

export const WhatShouldWeBuildScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // Blinking caret: 12 frames on, 12 frames off (~2.5 blinks/sec at 30fps)
  const blink = Math.floor(frame / 12) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Extracted input only */}
      <div
        style={{
          width: 1352,
          height: 260,
          borderRadius: 26,
          background: "rgba(22,28,66,0.62)",
          boxShadow: "0 22px 55px rgba(0,0,0,0.35)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 26,
            padding: 0,
            border: "8px solid transparent",
            background:
              "linear-gradient(rgba(22,28,66,0.62), rgba(22,28,66,0.62)) padding-box, linear-gradient(90deg, #7a4dff 0%, #c07ab6 45%, #d7b060 100%) border-box",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 34,
            top: 40,
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
            fontSize: 30,
            color: "rgba(210,220,255,0.35)",
            letterSpacing: -0.2,
          }}
        >
          Ask Agent Swarm to create a
        </div>

        <div style={{ position: "absolute", left: 34, top: 134 }}>
          <div
            style={{
              height: 56,
              borderRadius: 999,
              paddingLeft: 16,
              paddingRight: 22,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "linear-gradient(90deg, rgba(133,67,255,0.8) 0%, rgba(211,182,86,0.55) 100%)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
            }}
          >
            <Avatar size={28} label="A" variant="brown" />
            <div
              style={{
                fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                fontSize: 26,
                color: "rgba(255,255,255,0.95)",
                letterSpacing: -0.2,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>Agent Swarm</span>
              {/* blinking caret */}
              <span
                style={{
                  width: 2,
                  height: 24,
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: 2,
                  display: "inline-block",
                  opacity: blink ? 1 : 0,
                }}
              />
            </div>
          </div>
        </div>

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
            }}
          >
            <IconPaperclip />
          </div>
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
            }}
          >
            <IconMic />
          </div>
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
            }}
          >
            <div
              style={{
                fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                fontSize: 26,
                color: "rgba(255,255,255,0.45)",
                fontWeight: 600,
                letterSpacing: -0.2,
              }}
            >
              Send
            </div>
            <div style={{ opacity: 0.95 }}>
              <IconSend />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};