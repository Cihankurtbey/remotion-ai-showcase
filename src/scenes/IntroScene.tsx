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
import { pulseGlow } from "../utils/animations";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 60, damping: 12 },
  });

  const logoOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleSlide = interpolate(frame, [70, 95], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [50, 90], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const orbitAngle = (frame / fps) * 40;

  const glowPulse = pulseGlow(frame, fps, 0.8);
  const ringOpacity = interpolate(frame, [20, 45], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgBrightness = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOutOpacity = interpolate(frame, [210, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, opacity: fadeOutOpacity }}>
      <AbsoluteFill style={{ opacity: bgBrightness }}>
        <GradientBackground
          colors={["#0a0a1a", "#0d0d2b", "#0a0a1a"]}
          speed={0.2}
        />
      </AbsoluteFill>

      <ParticleField
        count={80}
        fadeInDuration={40}
        colors={[COLORS.cyan, COLORS.electricBlue, COLORS.purple]}
      />

      {/* Orbiting ring */}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 350,
            height: 350,
            borderRadius: "50%",
            border: `2px solid rgba(0, 240, 255, ${0.2 * ringOpacity})`,
            transform: `rotate(${orbitAngle}deg) scale(${0.8 + 0.2 * logoScale})`,
            opacity: ringOpacity,
            boxShadow: `0 0 40px rgba(0, 240, 255, ${0.1 * glowPulse}), inset 0 0 40px rgba(0, 240, 255, ${0.05 * glowPulse})`,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: `1px solid rgba(77, 124, 255, ${0.15 * ringOpacity})`,
            transform: `rotate(${-orbitAngle * 0.7}deg) scale(${0.8 + 0.2 * logoScale})`,
            opacity: ringOpacity * 0.7,
          }}
        />
      </AbsoluteFill>

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.electricBlue})`,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: `0 0 40px rgba(0, 240, 255, ${0.4 * glowPulse})`,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 40,
              color: COLORS.white,
              fontFamily: FONTS.heading,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            N
          </div>
        </div>

        {/* Brand Name */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${interpolate(logoScale, [0, 1], [0.8, 1])})`,
          }}
        >
          <GlowText
            text="NeuroCanvas"
            fontSize={80}
            color={COLORS.white}
            glowColor="#00f0ff"
            fontWeight={800}
            pulse={true}
            pulseSpeed={0.6}
            delay={0}
          />
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)`,
            marginTop: 8,
            marginBottom: 8,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            fontFamily: FONTS.body,
            fontWeight: 400,
            color: COLORS.whiteAlpha60,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleSlide}px)`,
          }}
        >
          AI Creativity Revolution
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
