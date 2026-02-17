export const COLORS = {
  background: "#0a0a1a",
  backgroundLight: "#111128",
  backgroundGradientEnd: "#0d0d2b",

  cyan: "#00f0ff",
  magenta: "#ff00aa",
  electricBlue: "#4d7cff",
  purple: "#8b5cf6",
  pink: "#ec4899",

  white: "#ffffff",
  whiteAlpha80: "rgba(255, 255, 255, 0.8)",
  whiteAlpha60: "rgba(255, 255, 255, 0.6)",
  whiteAlpha40: "rgba(255, 255, 255, 0.4)",
  whiteAlpha20: "rgba(255, 255, 255, 0.2)",
  whiteAlpha10: "rgba(255, 255, 255, 0.1)",

  cyanGlow: "0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)",
  magentaGlow: "0 0 20px rgba(255, 0, 170, 0.5), 0 0 40px rgba(255, 0, 170, 0.3)",
  blueGlow: "0 0 20px rgba(77, 124, 255, 0.5), 0 0 40px rgba(77, 124, 255, 0.3)",
} as const;

export const FONTS = {
  heading: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Inter', sans-serif",
} as const;

export const FONT_SIZES = {
  heroTitle: 72,
  sectionTitle: 56,
  subtitle: 36,
  body: 24,
  caption: 18,
  small: 14,
} as const;

export const SPACING = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 64,
  xxl: 96,
} as const;

export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 2250,
} as const;

export const SCENE_FRAMES = {
  intro: { start: 0, duration: 240 },
  problem: { start: 240, duration: 300 },
  aiReveal: { start: 540, duration: 360 },
  feature1: { start: 900, duration: 300 },
  feature2: { start: 1200, duration: 300 },
  dataStats: { start: 1500, duration: 300 },
  outro: { start: 1800, duration: 450 },
} as const;
