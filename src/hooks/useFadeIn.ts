import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut } from "../utils/animations";

type UseFadeInOptions = {
  startFrame?: number;
  duration?: number;
  fadeOutStart?: number;
  fadeOutDuration?: number;
};

export const useFadeIn = (options: UseFadeInOptions = {}) => {
  const frame = useCurrentFrame();
  const {
    startFrame = 0,
    duration = 20,
    fadeOutStart,
    fadeOutDuration = 20,
  } = options;

  let opacity = fadeIn(frame, startFrame, duration);

  if (fadeOutStart !== undefined) {
    const fadeOutOpacity = fadeOut(frame, fadeOutStart, fadeOutDuration);
    opacity = Math.min(opacity, fadeOutOpacity);
  }

  return { opacity };
};
