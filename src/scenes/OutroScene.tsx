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

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaProgress = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 60, damping: 12 },
  });

  const ctaScale = interpolate(ctaProgress, [0, 1], [0.7, 1]);
  const ctaOpacity = ctaProgress;

  const subtitleProgress = spring({
    frame: frame - 60,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const subtitleSlide = interpolate(subtitleProgress, [0, 1], [30, 0]);
  const subtitleOpacity = subtitleProgress;

  const buttonProgress = spring({
    frame: frame - 100,
    fps,
    config: { stiffness: 100, damping: 14 },
  });

  const buttonScale = interpolate(buttonProgress, [0, 1], [0.8, 1]);
  const buttonOpacity = buttonProgress;

  const logoProgress = spring({
    frame: frame - 150,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const dividerWidth = interpolate(
    spring({ frame: frame - 130, fps, config: { stiffness: 60, damping: 16 } }),
    [0, 1],
    [0, 300]
  );

  const glowPulse = pulseGlow(frame, fps, 0.6);

  const finalFade = interpolate(frame, [400, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const orbitAngle = (frame / fps) * 25;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, opacity: finalFade }}>
      <GradientBackground
        colors={["#0a0a1a", "#0d0d2b", "#0a0a1a"]}
        speed={0.15}
      />
      <ParticleField
        count={100}
        colors={[COLORS.cyan, COLORS.magenta, COLORS.electricBlue, COLORS.purple]}
        maxSize={4}
        speed={0.8}
      />

      {/* Large orbiting rings */}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: `1px solid rgba(0, 240, 255, ${0.08 + 0.04 * glowPulse})`,
            transform: `rotate(${orbitAngle}deg)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 650,
            height: 650,
            borderRadius: "50%",
            border: `1px solid rgba(255, 0, 170, ${0.05 + 0.03 * glowPulse})`,
            transform: `rotate(${-orbitAngle * 0.6}deg)`,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* CTA Title */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <GlowText
            text="Join the Revolution"
            fontSize={68}
            color={COLORS.white}
            glowColor="#00f0ff"
            fontWeight={800}
            pulse={true}
            pulseSpeed={0.5}
          />
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            fontFamily: FONTS.body,
            fontWeight: 400,
            color: COLORS.whiteAlpha60,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.6,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleSlide}px)`,
            marginTop: 8,
          }}
        >
          The future of creative content is here.
          <br />
          Let AI amplify your imagination.
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 40,
            padding: "16px 48px",
            borderRadius: 50,
            background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.electricBlue})`,
            color: COLORS.white,
            fontSize: 20,
            fontFamily: FONTS.heading,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            opacity: buttonOpacity,
            transform: `scale(${buttonScale})`,
            boxShadow: `0 0 30px rgba(0, 240, 255, ${0.3 + 0.2 * glowPulse}), 0 4px 20px rgba(0, 0, 0, 0.4)`,
          }}
        >
          Get Started Free
        </div>

        {/* Divider */}
        <div
          style={{
            width: dividerWidth,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${COLORS.whiteAlpha20}, transparent)`,
            marginTop: 50,
            marginBottom: 20,
          }}
        />

        {/* Bottom brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: logoProgress,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.electricBlue})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: `0 0 15px rgba(0, 240, 255, 0.3)`,
            }}
          >
            <span
              style={{
                fontSize: 18,
                color: COLORS.white,
                fontFamily: FONTS.heading,
                fontWeight: 900,
              }}
            >
              N
            </span>
          </div>
          <span
            style={{
              fontSize: 22,
              fontFamily: FONTS.heading,
              fontWeight: 700,
              color: COLORS.whiteAlpha80,
              letterSpacing: 1,
            }}
          >
            NeuroCanvas
          </span>
        </div>

        {/* Website */}
        <div
          style={{
            fontSize: 14,
            fontFamily: FONTS.mono,
            color: COLORS.whiteAlpha40,
            letterSpacing: 3,
            opacity: logoProgress,
            marginTop: 8,
          }}
        >
          neurocanvas.ai
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
