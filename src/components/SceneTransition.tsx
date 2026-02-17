import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../styles/theme";

type SceneTransitionProps = {
  children: React.ReactNode;
  durationInFrames: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
};

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  children,
  durationInFrames,
  fadeInDuration = 15,
  fadeOutDuration = 15,
}) => {
  const frame = useCurrentFrame();

  const fadeInOpacity = interpolate(
    frame,
    [0, fadeInDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fadeOutOpacity = interpolate(
    frame,
    [durationInFrames - fadeOutDuration, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeInOpacity, fadeOutOpacity);

  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
};
