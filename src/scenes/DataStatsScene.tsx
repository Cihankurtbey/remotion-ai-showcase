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
import { CounterAnimation } from "../components/CounterAnimation";
import { SceneTransition } from "../components/SceneTransition";
import { pulseGlow } from "../utils/animations";

const STATS = [
  { value: 10, suffix: "M+", label: "Images Generated", color: COLORS.cyan },
  { value: 500, suffix: "K+", label: "Active Creators", color: COLORS.magenta },
  { value: 99, suffix: "%", label: "Uptime SLA", color: COLORS.electricBlue },
  { value: 150, suffix: "+", label: "AI Models", color: COLORS.purple },
];

export const DataStatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagProgress = spring({
    frame: frame - 5,
    fps,
    config: { stiffness: 100, damping: 16 },
  });

  const titleProgress = spring({
    frame: frame - 15,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const lineProgress = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 60, damping: 16 },
  });

  const lineWidth = interpolate(lineProgress, [0, 1], [0, 200]);

  const glowPulse = pulseGlow(frame, fps, 0.5);

  return (
    <SceneTransition durationInFrames={300} fadeInDuration={15} fadeOutDuration={20}>
      <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
        <GradientBackground
          colors={["#0a0a1a", "#0a1525", "#0a0a2a"]}
          speed={0.1}
        />
        <ParticleField
          count={50}
          colors={[COLORS.cyan, COLORS.magenta, COLORS.electricBlue, COLORS.purple]}
          maxSize={3}
          speed={0.6}
        />

        {/* Grid lines background */}
        <AbsoluteFill style={{ opacity: 0.03 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`h-${i}`}
              style={{
                position: "absolute",
                top: `${(i + 1) * 5}%`,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: COLORS.white,
              }}
            />
          ))}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`v-${i}`}
              style={{
                position: "absolute",
                left: `${(i + 1) * 3.33}%`,
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: COLORS.white,
              }}
            />
          ))}
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 100px",
          }}
        >
          {/* Section tag */}
          <div
            style={{
              fontSize: 14,
              fontFamily: FONTS.mono,
              color: COLORS.electricBlue,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: tagProgress,
              marginBottom: 16,
            }}
          >
            By The Numbers
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 52,
              fontFamily: FONTS.heading,
              fontWeight: 700,
              color: COLORS.white,
              textAlign: "center",
              opacity: titleProgress,
              transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
              marginBottom: 8,
            }}
          >
            Powering the{" "}
            <span style={{ color: COLORS.cyan }}>Creative</span> Economy
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: lineWidth,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)`,
              marginBottom: 70,
            }}
          />

          {/* Stats grid */}
          <div
            style={{
              display: "flex",
              gap: 80,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {STATS.map((stat, i) => {
              const cardDelay = 40 + i * 18;
              const cardProgress = spring({
                frame: frame - cardDelay,
                fps,
                config: { stiffness: 80, damping: 14 },
              });

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    opacity: cardProgress,
                    transform: `translateY(${interpolate(cardProgress, [0, 1], [40, 0])}px)`,
                  }}
                >
                  {/* Glow dot */}
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: stat.color,
                      boxShadow: `0 0 12px ${stat.color}, 0 0 24px ${stat.color}`,
                      marginBottom: 16,
                      opacity: 0.6 + 0.4 * glowPulse,
                    }}
                  />

                  <CounterAnimation
                    value={stat.value}
                    suffix={stat.suffix}
                    fontSize={64}
                    color={stat.color}
                    delay={cardDelay + 10}
                    label={stat.label}
                    labelColor={COLORS.whiteAlpha60}
                    labelFontSize={14}
                  />
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneTransition>
  );
};
