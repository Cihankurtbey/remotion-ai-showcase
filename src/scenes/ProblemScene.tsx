import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

import { COLORS, FONTS } from "../styles/theme";
import { GradientBackground } from "../components/GradientBackground";
import { ParticleField } from "../components/ParticleField";
import { useTypewriter } from "../hooks/useTypewriter";
import { SceneTransition } from "../components/SceneTransition";

const PROBLEM_LINES = [
  { text: "Creating visuals takes hours...", delay: 0 },
  { text: "Editing workflows are repetitive...", delay: 60 },
  { text: "Scaling content feels impossible...", delay: 120 },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSlide = interpolate(frame, [0, 25], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneTransition durationInFrames={300} fadeInDuration={15} fadeOutDuration={20}>
      <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
        <GradientBackground
          colors={["#0a0a1a", "#1a0a1a", "#0a0a1a"]}
          speed={0.15}
        />
        <ParticleField
          count={30}
          colors={[COLORS.magenta, COLORS.purple]}
          maxSize={2}
          speed={0.5}
        />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 100,
          }}
        >
          {/* Section tag */}
          <div
            style={{
              fontSize: 14,
              fontFamily: FONTS.mono,
              color: COLORS.magenta,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: titleOpacity,
              marginBottom: 24,
            }}
          >
            The Problem
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: 52,
              fontFamily: FONTS.heading,
              fontWeight: 700,
              color: COLORS.white,
              textAlign: "center",
              opacity: titleOpacity,
              transform: `translateY(${titleSlide}px)`,
              marginBottom: 60,
              lineHeight: 1.2,
            }}
          >
            Creativity Shouldn't Be
            <br />
            <span style={{ color: COLORS.magenta }}>This Hard</span>
          </div>

          {/* Problem list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
              maxWidth: 800,
            }}
          >
            {PROBLEM_LINES.map((line, i) => (
              <ProblemLine
                key={i}
                text={line.text}
                delay={line.delay + 30}
                index={i}
              />
            ))}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneTransition>
  );
};

const ProblemLine: React.FC<{
  text: string;
  delay: number;
  index: number;
}> = ({ text, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { fullText } = useTypewriter({
    text,
    startFrame: delay,
    charsPerFrame: 0.6,
    showCursor: true,
  });

  const lineProgress = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 16 },
  });

  const opacity = lineProgress;
  const slideX = interpolate(lineProgress, [0, 1], [-30, 0]);

  const iconColors = [COLORS.magenta, COLORS.purple, COLORS.pink];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        opacity,
        transform: `translateX(${slideX}px)`,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: iconColors[index % iconColors.length],
          boxShadow: `0 0 12px ${iconColors[index % iconColors.length]}`,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontSize: 28,
          fontFamily: FONTS.body,
          fontWeight: 400,
          color: COLORS.whiteAlpha80,
          letterSpacing: 0.5,
        }}
      >
        {fullText}
      </div>
    </div>
  );
};
