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
import { SceneTransition } from "../components/SceneTransition";

export const FeatureShowcase1: React.FC = () => {
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

  const arrowProgress = spring({
    frame: frame - 90,
    fps,
    config: { stiffness: 100, damping: 12 },
  });

  const resultProgress = spring({
    frame: frame - 120,
    fps,
    config: { stiffness: 60, damping: 14 },
  });

  const promptText = '"A futuristic city at sunset, neon lights reflecting on glass towers"';
  const charsToShow = Math.min(
    Math.floor(Math.max(0, frame - 60) * 0.8),
    promptText.length
  );
  const displayPrompt = promptText.slice(0, charsToShow);

  return (
    <SceneTransition durationInFrames={300} fadeInDuration={15} fadeOutDuration={20}>
      <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
        <GradientBackground
          colors={["#0a0a1a", "#0a1520", "#0a0a2a"]}
          speed={0.15}
        />
        <ParticleField
          count={40}
          colors={[COLORS.cyan, COLORS.electricBlue]}
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
              color: COLORS.cyan,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: tagProgress,
              marginBottom: 16,
            }}
          >
            Feature 01
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
            Text to <span style={{ color: COLORS.cyan }}>Image</span>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              fontFamily: FONTS.body,
              fontWeight: 400,
              color: COLORS.whiteAlpha60,
              textAlign: "center",
              maxWidth: 600,
              opacity: descProgress,
              transform: `translateY(${interpolate(descProgress, [0, 1], [20, 0])}px)`,
              marginBottom: 50,
              lineHeight: 1.6,
            }}
          >
            Describe your vision in words. Let NeuroCanvas bring it to life
            with photorealistic AI-generated imagery.
          </div>

          {/* Demo flow: Prompt -> Arrow -> Result */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 40,
            }}
          >
            {/* Prompt box */}
            <FloatingCard
              width={480}
              height={180}
              delay={45}
              borderColor={COLORS.cyan}
            >
              <div
                style={{
                  fontSize: 13,
                  fontFamily: FONTS.mono,
                  color: COLORS.cyan,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 16,
                  alignSelf: "flex-start",
                }}
              >
                Prompt
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontFamily: FONTS.mono,
                  color: COLORS.whiteAlpha80,
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                {displayPrompt}
                <span
                  style={{
                    opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
                    color: COLORS.cyan,
                  }}
                >
                  |
                </span>
              </div>
            </FloatingCard>

            {/* Arrow */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                opacity: arrowProgress,
                transform: `scale(${interpolate(arrowProgress, [0, 1], [0.5, 1])})`,
              }}
            >
              <svg width="60" height="24" viewBox="0 0 60 24">
                <path
                  d="M0 12 L45 12 M35 4 L48 12 L35 20"
                  stroke={COLORS.cyan}
                  strokeWidth="2"
                  fill="none"
                  style={{
                    filter: `drop-shadow(0 0 4px ${COLORS.cyan})`,
                  }}
                />
              </svg>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: FONTS.mono,
                  color: COLORS.whiteAlpha40,
                  letterSpacing: 2,
                }}
              >
                AI GENERATE
              </div>
            </div>

            {/* Result visualization */}
            <FloatingCard
              width={380}
              height={180}
              delay={110}
              borderColor={COLORS.electricBlue}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                  background: `linear-gradient(135deg, 
                    rgba(77, 124, 255, 0.3), 
                    rgba(0, 240, 255, 0.2), 
                    rgba(139, 92, 246, 0.3))`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Abstract visual representation */}
                <div
                  style={{
                    position: "absolute",
                    width: "120%",
                    height: "120%",
                    background: `radial-gradient(circle at ${50 + Math.sin(frame / 30) * 20}% ${50 + Math.cos(frame / 25) * 15}%, rgba(0, 240, 255, 0.4) 0%, transparent 60%),
                      radial-gradient(circle at ${30 + Math.cos(frame / 35) * 15}% ${70 + Math.sin(frame / 40) * 10}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at ${70 + Math.sin(frame / 20) * 10}% ${30 + Math.cos(frame / 30) * 15}%, rgba(255, 0, 170, 0.2) 0%, transparent 50%)`,
                    opacity: resultProgress,
                  }}
                />
                <div
                  style={{
                    fontSize: 14,
                    fontFamily: FONTS.mono,
                    color: COLORS.whiteAlpha60,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    zIndex: 1,
                  }}
                >
                  Generated Image
                </div>
              </div>
            </FloatingCard>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneTransition>
  );
};
