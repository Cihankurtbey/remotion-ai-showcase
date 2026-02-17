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
import { FloatingCard } from "../components/FloatingCard";
import { ProgressRing } from "../components/ProgressRing";
import { SceneTransition } from "../components/SceneTransition";

const CAPABILITIES = [
  { icon: "🎨", label: "Style Transfer", desc: "Apply any art style", progress: 95 },
  { icon: "✨", label: "AI Upscale", desc: "4x resolution boost", progress: 99 },
  { icon: "🔧", label: "Smart Edit", desc: "Context-aware edits", progress: 92 },
];

export const FeatureShowcase2: React.FC = () => {
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

  const descProgress = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  return (
    <SceneTransition durationInFrames={300} fadeInDuration={15} fadeOutDuration={20}>
      <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
        <GradientBackground
          colors={["#0a0a1a", "#1a0a20", "#0a0a2a"]}
          speed={0.15}
        />
        <ParticleField
          count={40}
          colors={[COLORS.magenta, COLORS.purple, COLORS.pink]}
          maxSize={2}
          speed={0.5}
        />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 120px",
          }}
        >
          {/* Feature tag */}
          <div
            style={{
              fontSize: 14,
              fontFamily: FONTS.mono,
              color: COLORS.magenta,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: tagProgress,
              marginBottom: 16,
            }}
          >
            Feature 02
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontFamily: FONTS.heading,
              fontWeight: 700,
              color: COLORS.white,
              textAlign: "center",
              opacity: titleProgress,
              transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
              marginBottom: 12,
            }}
          >
            Smart <span style={{ color: COLORS.magenta }}>Editing</span>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              fontFamily: FONTS.body,
              fontWeight: 400,
              color: COLORS.whiteAlpha60,
              textAlign: "center",
              maxWidth: 650,
              opacity: descProgress,
              transform: `translateY(${interpolate(descProgress, [0, 1], [20, 0])}px)`,
              marginBottom: 60,
              lineHeight: 1.6,
            }}
          >
            Transform any image with AI-powered tools. Style transfer,
            super-resolution, and intelligent editing at your fingertips.
          </div>

          {/* Capability cards */}
          <div
            style={{
              display: "flex",
              gap: 32,
              justifyContent: "center",
            }}
          >
            {CAPABILITIES.map((cap, i) => {
              const cardProgress = spring({
                frame: frame - 50 - i * 15,
                fps,
                config: { stiffness: 80, damping: 14 },
              });

              return (
                <div
                  key={i}
                  style={{
                    opacity: cardProgress,
                    transform: `translateY(${interpolate(cardProgress, [0, 1], [50, 0])}px)`,
                  }}
                >
                  <FloatingCard
                    width={320}
                    height={280}
                    delay={45 + i * 15}
                    borderColor={i === 0 ? COLORS.magenta : i === 1 ? COLORS.purple : COLORS.pink}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 16,
                        textAlign: "center",
                      }}
                    >
                      {/* Icon */}
                      <div style={{ fontSize: 36, marginBottom: 4 }}>
                        {cap.icon}
                      </div>

                      {/* Label */}
                      <div
                        style={{
                          fontSize: 22,
                          fontFamily: FONTS.heading,
                          fontWeight: 600,
                          color: COLORS.white,
                        }}
                      >
                        {cap.label}
                      </div>

                      {/* Description */}
                      <div
                        style={{
                          fontSize: 15,
                          fontFamily: FONTS.body,
                          color: COLORS.whiteAlpha60,
                          lineHeight: 1.4,
                        }}
                      >
                        {cap.desc}
                      </div>

                      {/* Progress ring */}
                      <ProgressRing
                        percentage={cap.progress}
                        size={80}
                        strokeWidth={4}
                        color={i === 0 ? COLORS.magenta : i === 1 ? COLORS.purple : COLORS.pink}
                        delay={70 + i * 15}
                        label="Accuracy"
                      />
                    </div>
                  </FloatingCard>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneTransition>
  );
};
