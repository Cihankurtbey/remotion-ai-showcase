import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../styles/theme";

type FloatingCardProps = {
  children: React.ReactNode;
  width?: number;
  height?: number;
  delay?: number;
  borderColor?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
};

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  width = 400,
  height = 300,
  delay = 0,
  borderColor = COLORS.cyan,
  backgroundColor = "rgba(15, 15, 40, 0.8)",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const scale = interpolate(entryProgress, [0, 1], [0.85, 1]);
  const opacity = entryProgress;
  const translateY = interpolate(entryProgress, [0, 1], [50, 0]);

  const floatOffset = Math.sin((frame / fps) * 1.5) * 5;

  return (
    <div
      style={{
        width,
        minHeight: height,
        backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `scale(${scale}) translateY(${translateY + floatOffset}px)`,
        boxShadow: `0 0 30px rgba(0, 240, 255, 0.1), inset 0 0 30px rgba(0, 240, 255, 0.03)`,
        backdropFilter: "blur(10px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
