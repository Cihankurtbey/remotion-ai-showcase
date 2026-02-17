import { interpolateColors } from "remotion";

export const lerpColor = (
  frame: number,
  inputRange: number[],
  colorRange: string[]
): string => {
  return interpolateColors(frame, inputRange, colorRange);
};

export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const createGlowShadow = (
  color: string,
  intensity: number = 1
): string => {
  const alpha1 = 0.5 * intensity;
  const alpha2 = 0.3 * intensity;
  const alpha3 = 0.1 * intensity;
  return `0 0 ${20 * intensity}px ${hexToRgba(color, alpha1)}, 0 0 ${40 * intensity}px ${hexToRgba(color, alpha2)}, 0 0 ${80 * intensity}px ${hexToRgba(color, alpha3)}`;
};

export const createNeonTextShadow = (
  color: string,
  intensity: number = 1
): string => {
  const alpha1 = 0.8 * intensity;
  const alpha2 = 0.5 * intensity;
  const alpha3 = 0.3 * intensity;
  return `0 0 ${7 * intensity}px ${hexToRgba(color, alpha1)}, 0 0 ${10 * intensity}px ${hexToRgba(color, alpha1)}, 0 0 ${21 * intensity}px ${hexToRgba(color, alpha2)}, 0 0 ${42 * intensity}px ${hexToRgba(color, alpha2)}, 0 0 ${82 * intensity}px ${hexToRgba(color, alpha3)}`;
};
