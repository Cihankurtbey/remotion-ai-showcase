import { interpolate, spring } from "remotion";

export const fadeIn = (
  frame: number,
  startFrame: number = 0,
  duration: number = 20
): number => {
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const fadeOut = (
  frame: number,
  startFrame: number,
  duration: number = 20
): number => {
  return interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const slideInFromLeft = (
  frame: number,
  startFrame: number = 0,
  duration: number = 30,
  distance: number = 100
): number => {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [-distance, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
};

export const slideInFromRight = (
  frame: number,
  startFrame: number = 0,
  duration: number = 30,
  distance: number = 100
): number => {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [distance, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
};

export const slideInFromBottom = (
  frame: number,
  startFrame: number = 0,
  duration: number = 30,
  distance: number = 80
): number => {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [distance, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
};

export const scaleIn = (
  frame: number,
  fps: number,
  delay: number = 0
): number => {
  return spring({
    frame: frame - delay,
    fps,
    config: {
      stiffness: 100,
      damping: 14,
      mass: 1,
    },
  });
};

export const gentleSpring = (
  frame: number,
  fps: number,
  delay: number = 0
): number => {
  return spring({
    frame: frame - delay,
    fps,
    config: {
      stiffness: 80,
      damping: 18,
      mass: 1.2,
    },
  });
};

export const bouncySpring = (
  frame: number,
  fps: number,
  delay: number = 0
): number => {
  return spring({
    frame: frame - delay,
    fps,
    config: {
      stiffness: 120,
      damping: 10,
      mass: 0.8,
    },
  });
};

export const pulseGlow = (
  frame: number,
  fps: number,
  speed: number = 1
): number => {
  const cycle = (frame / fps) * speed * Math.PI * 2;
  return 0.5 + 0.5 * Math.sin(cycle);
};
