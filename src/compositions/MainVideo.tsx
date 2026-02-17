import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS, SCENE_FRAMES } from "../styles/theme";
import "../styles/fonts";

import { IntroScene } from "../scenes/IntroScene";
import { ProblemScene } from "../scenes/ProblemScene";
import { AIRevealScene } from "../scenes/AIRevealScene";
import { FeatureShowcase1 } from "../scenes/FeatureShowcase1";
import { FeatureShowcase2 } from "../scenes/FeatureShowcase2";
import { DataStatsScene } from "../scenes/DataStatsScene";
import { OutroScene } from "../scenes/OutroScene";

export const MainVideo: React.FC = () => {

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Scene 1: Intro - Logo reveal with particles (0s - 8s) */}
      <Sequence
        from={SCENE_FRAMES.intro.start}
        durationInFrames={SCENE_FRAMES.intro.duration}
      >
        <IntroScene />
      </Sequence>

      {/* Scene 2: Problem Statement (8s - 18s) */}
      <Sequence
        from={SCENE_FRAMES.problem.start}
        durationInFrames={SCENE_FRAMES.problem.duration}
      >
        <ProblemScene />
      </Sequence>

      {/* Scene 3: AI Reveal - NeuroCanvas introduction (18s - 30s) */}
      <Sequence
        from={SCENE_FRAMES.aiReveal.start}
        durationInFrames={SCENE_FRAMES.aiReveal.duration}
      >
        <AIRevealScene />
      </Sequence>

      {/* Scene 4: Feature 1 - Text to Image (30s - 40s) */}
      <Sequence
        from={SCENE_FRAMES.feature1.start}
        durationInFrames={SCENE_FRAMES.feature1.duration}
      >
        <FeatureShowcase1 />
      </Sequence>

      {/* Scene 5: Feature 2 - Smart Editing (40s - 50s) */}
      <Sequence
        from={SCENE_FRAMES.feature2.start}
        durationInFrames={SCENE_FRAMES.feature2.duration}
      >
        <FeatureShowcase2 />
      </Sequence>

      {/* Scene 6: Data Stats (50s - 60s) */}
      <Sequence
        from={SCENE_FRAMES.dataStats.start}
        durationInFrames={SCENE_FRAMES.dataStats.duration}
      >
        <DataStatsScene />
      </Sequence>

      {/* Scene 7: Outro / CTA (60s - 75s) */}
      <Sequence
        from={SCENE_FRAMES.outro.start}
        durationInFrames={SCENE_FRAMES.outro.duration}
      >
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
