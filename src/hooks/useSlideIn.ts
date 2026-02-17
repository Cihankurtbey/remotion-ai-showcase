import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type Direction = "left" | "right" | "top" | "bottom";

type UseSlideInOptions = {
  direction?: Direction;
  delay?: number;
  distance?: number;
  withFade?: boolean;
};

export const useSlideIn = (options: UseSlideInOptions = {}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    direction = "bottom",
    delay = 0,
    distance = 80,
    withFade = true,
  } = options;

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      stiffness: 100,
      damping: 14,
      mass: 1,
    },
  });

  let translateX = 0;
  let translateY = 0;

  switch (direction) {
    case "left":
      translateX = interpolate(progress, [0, 1], [-distance, 0]);
      break;
    case "right":
      translateX = interpolate(progress, [0, 1], [distance, 0]);
      break;
    case "top":
      translateY = interpolate(progress, [0, 1], [-distance, 0]);
      break;
    case "bottom":
      translateY = interpolate(progress, [0, 1], [distance, 0]);
      break;
  }

  const opacity = withFade ? progress : 1;

  return {
    transform: `translate(${translateX}px, ${translateY}px)`,
    opacity,
  };
};
