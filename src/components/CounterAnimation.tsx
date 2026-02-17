import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS } from "../styles/theme";

type CounterAnimationProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  fontSize?: number;
  color?: string;
  delay?: number;
  label?: string;
  labelColor?: string;
  labelFontSize?: number;
  style?: React.CSSProperties;
};

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  value,
  suffix = "",
  prefix = "",
  fontSize = 72,
  color = COLORS.cyan,
  delay = 0,
  label = "",
  labelColor = COLORS.whiteAlpha60,
  labelFontSize = 20,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 40, damping: 20, mass: 1 },
  });

  const currentValue = Math.floor(interpolate(progress, [0, 1], [0, value]));

  const slideUp = interpolate(progress, [0, 1], [40, 0]);
  const opacity = progress;

  const formattedValue = currentValue.toLocaleString("en-US");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
        transform: `translateY(${slideUp}px)`,
        ...style,
      }}
    >
      <div
        style={{
          fontSize,
          fontFamily: FONTS.mono,
          fontWeight: 700,
          color,
          letterSpacing: -1,
          lineHeight: 1,
        }}
      >
        {prefix}
        {formattedValue}
        {suffix}
      </div>
      {label && (
        <div
          style={{
            fontSize: labelFontSize,
            fontFamily: FONTS.body,
            fontWeight: 500,
            color: labelColor,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
