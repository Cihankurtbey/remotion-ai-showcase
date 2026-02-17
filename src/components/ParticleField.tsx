import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../styles/theme";

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  phase: number;
};

type ParticleFieldProps = {
  count?: number;
  colors?: string[];
  maxSize?: number;
  speed?: number;
  fadeInDuration?: number;
};

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 60,
  colors = [COLORS.cyan, COLORS.magenta, COLORS.electricBlue, COLORS.purple],
  maxSize = 4,
  speed = 1,
  fadeInDuration = 30,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: seededRandom(i * 3 + 1) * width,
      y: seededRandom(i * 3 + 2) * height,
      size: 1 + seededRandom(i * 3 + 3) * maxSize,
      speed: 0.3 + seededRandom(i * 3 + 4) * speed,
      opacity: 0.2 + seededRandom(i * 3 + 5) * 0.6,
      color: colors[Math.floor(seededRandom(i * 3 + 6) * colors.length)],
      phase: seededRandom(i * 3 + 7) * Math.PI * 2,
    }));
  }, [count, width, height, maxSize, speed, colors]);

  const globalOpacity = Math.min(1, frame / fadeInDuration);
  const time = frame / fps;

  return (
    <AbsoluteFill style={{ opacity: globalOpacity }}>
      {particles.map((p, i) => {
        const offsetX = Math.sin(time * p.speed + p.phase) * 30;
        const offsetY = Math.cos(time * p.speed * 0.7 + p.phase) * 20;
        const pulseFactor = 0.5 + 0.5 * Math.sin(time * 2 + p.phase);
        const currentOpacity = p.opacity * (0.6 + 0.4 * pulseFactor);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + offsetX,
              top: p.y + offsetY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.color,
              opacity: currentOpacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
