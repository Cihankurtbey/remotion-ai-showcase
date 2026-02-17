import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS } from "../styles/theme";

type AnimatedTextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: number;
  delay?: number;
  direction?: "bottom" | "top" | "left" | "right";
  distance?: number;
  letterSpacing?: number;
  textAlign?: React.CSSProperties["textAlign"];
  lineHeight?: number;
  style?: React.CSSProperties;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize = 48,
  color = COLORS.white,
  fontFamily = FONTS.heading,
  fontWeight = 700,
  delay = 0,
  direction = "bottom",
  distance = 60,
  letterSpacing = -0.5,
  textAlign = "center",
  lineHeight = 1.2,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 14 },
  });

  const opacity = progress;

  let translateX = 0;
  let translateY = 0;

  switch (direction) {
    case "bottom":
      translateY = interpolate(progress, [0, 1], [distance, 0]);
      break;
    case "top":
      translateY = interpolate(progress, [0, 1], [-distance, 0]);
      break;
    case "left":
      translateX = interpolate(progress, [0, 1], [-distance, 0]);
      break;
    case "right":
      translateX = interpolate(progress, [0, 1], [distance, 0]);
      break;
  }

  return (
    <div
      style={{
        fontSize,
        color,
        fontFamily,
        fontWeight,
        letterSpacing,
        textAlign,
        lineHeight,
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
