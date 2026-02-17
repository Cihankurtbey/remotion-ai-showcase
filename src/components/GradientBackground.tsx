import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../styles/theme";

type GradientBackgroundProps = {
  colors?: string[];
  animate?: boolean;
  speed?: number;
  opacity?: number;
};

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors = [COLORS.background, COLORS.backgroundLight, COLORS.backgroundGradientEnd],
  animate = true,
  speed = 0.3,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const angle = animate
    ? 135 + Math.sin((frame / fps) * speed * Math.PI) * 15
    : 135;

  const gradient = `linear-gradient(${angle}deg, ${colors.join(", ")})`;

  return (
    <AbsoluteFill
      style={{
        background: gradient,
        opacity,
      }}
    />
  );
};
