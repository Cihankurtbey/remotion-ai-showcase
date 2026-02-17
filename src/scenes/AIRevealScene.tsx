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
import { GlowText } from "../components/GlowText";
import { SceneTransition } from "../components/SceneTransition";
import { pulseGlow } from "../utils/animations";

export const AIRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const questionOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const questionFadeOut = interpolate(frame, [60, 80], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const questionVisible = Math.min(questionOpacity, questionFadeOut);

  const revealProgress = spring({
    frame: frame - 80,
    fps,
    config: { stiffness: 50, damping: 12 },
  });

  const revealScale = interpolate(revealProgress, [0, 1], [0.5, 1]);
  const revealOpacity = revealProgress;

  const flashOpacity = interpolate(frame, [78, 82, 90], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineProgress = spring({
    frame: frame - 130,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const taglineOpacity = taglineProgress;
  const taglineSlide = interpolate(taglineProgress, [0, 1], [30, 0]);

  const featuresProgress = spring({
    frame: frame - 180,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const lineWidth = interpolate(
    spring({ frame: frame - 120, fps, config: { stiffness: 60, damping: 16 } }),
    [0, 1],
    [0, 400]
  );

  const glowPulse = pulseGlow(frame, fps, 0.6);

  const chips = [
    { text: "Text to Image", color: COLORS.cyan },
    { text: "Smart Editing", color: COLORS.magenta },
    { text: "AI Upscaling", color: COLORS.electricBlue },
    { text: "Style Transfer", color: COLORS.purple },
  ];

  return (
    <SceneTransition durationInFrames={360} fadeInDuration={15} fadeOutDuration={20}>
      <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
        <GradientBackground
          colors={["#0a0a1a", "#0a1a2a", "#0a0a2a"]}
          speed={0.2}
        />
        <ParticleField
          count={70}
          colors={[COLORS.cyan, COLORS.electricBlue, COLORS.purple, COLORS.magenta]}
          maxSize={3}
          speed={0.8}
        />

        {/* Flash effect */}
        <AbsoluteFill
          style={{
            backgroundColor: COLORS.cyan,
            opacity: flashOpacity,
          }}
        />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* "What if..." question */}
          <div
            style={{
              fontSize: 40,
              fontFamily: FONTS.heading,
              fontWeight: 300,
              color: COLORS.whiteAlpha80,
              opacity: questionVisible,
              textAlign: "center",
            }}
          >
            What if AI could handle it{" "}
            <span style={{ color: COLORS.cyan, fontWeight: 600 }}>all</span>?
          </div>

          {/* NeuroCanvas Reveal */}
          <div
            style={{
              opacity: revealOpacity,
              transform: `scale(${revealScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Logo + Brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.electricBlue})`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 0 30px rgba(0, 240, 255, ${0.3 + 0.2 * glowPulse})`,
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    color: COLORS.white,
                    fontFamily: FONTS.heading,
                    fontWeight: 900,
                  }}
                >
                  N
                </span>
              </div>

              <GlowText
                text="NeuroCanvas"
                fontSize={72}
                color={COLORS.white}
                glowColor="#00f0ff"
                fontWeight={800}
                pulse={true}
                pulseSpeed={0.5}
                delay={0}
              />
            </div>

            {/* Decorative line */}
            <div
              style={{
                width: lineWidth,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, ${COLORS.magenta}, transparent)`,
                marginTop: 4,
                marginBottom: 12,
              }}
            />

            {/* Tagline */}
            <div
              style={{
                fontSize: 26,
                fontFamily: FONTS.body,
                fontWeight: 400,
                color: COLORS.whiteAlpha60,
                letterSpacing: 6,
                textTransform: "uppercase",
                opacity: taglineOpacity,
                transform: `translateY(${taglineSlide}px)`,
              }}
            >
              Create. Transform. Amplify.
            </div>

            {/* Feature chips */}
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 40,
                opacity: featuresProgress,
              }}
            >
              {chips.map((chip, i) => {
                const chipProgress = spring({
                  frame: frame - 190 - i * 8,
                  fps,
                  config: { stiffness: 100, damping: 14 },
                });
                return (
                  <div
                    key={i}
                    style={{
                      padding: "10px 24px",
                      borderRadius: 30,
                      border: `1px solid ${chip.color}`,
                      backgroundColor: `rgba(0,0,0,0.4)`,
                      color: chip.color,
                      fontFamily: FONTS.mono,
                      fontSize: 14,
                      fontWeight: 500,
                      letterSpacing: 1,
                      opacity: chipProgress,
                      transform: `translateY(${interpolate(chipProgress, [0, 1], [20, 0])}px)`,
                      boxShadow: `0 0 15px ${chip.color}33`,
                    }}
                  >
                    {chip.text}
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneTransition>
  );
};
