import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS } from "../styles/theme";
import { createNeonTextShadow } from "../utils/colors";
import { pulseGlow } from "../utils/animations";

type GlowTextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  delay?: number;
  pulse?: boolean;
  pulseSpeed?: number;
  letterSpacing?: number;
  style?: React.CSSProperties;
};

export const GlowText: React.FC<GlowTextProps> = ({
  text,
  fontSize = 64,
  color = COLORS.cyan,
  glowColor = "#00f0ff",
  fontFamily = FONTS.heading,
  fontWeight = 800,
  delay = 0,
  pulse = true,
  pulseSpeed = 0.8,
  letterSpacing = -1,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleProgress = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 80, damping: 12 },
  });

  const scale = interpolate(scaleProgress, [0, 1], [0.8, 1]);
  const opacity = scaleProgress;

  const glowIntensity = pulse
    ? 0.7 + 0.3 * pulseGlow(frame, fps, pulseSpeed)
    : 1;

  const textShadow = createNeonTextShadow(glowColor, glowIntensity);

  return (
    <div
      style={{
        fontSize,
        color,
        fontFamily,
        fontWeight,
        letterSpacing,
        textAlign: "center" as const,
        textShadow,
        opacity,
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
