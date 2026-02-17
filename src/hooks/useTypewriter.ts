import { useCurrentFrame, useVideoConfig } from "remotion";

type UseTypewriterOptions = {
  text: string;
  startFrame?: number;
  charsPerFrame?: number;
  showCursor?: boolean;
};

export const useTypewriter = (options: UseTypewriterOptions) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    text,
    startFrame = 0,
    charsPerFrame = 0.5,
    showCursor = true,
  } = options;

  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.min(
    Math.floor(elapsed * charsPerFrame),
    text.length
  );

  const displayedText = text.slice(0, charCount);
  const isComplete = charCount >= text.length;
  const cursorVisible = showCursor && !isComplete && Math.floor(frame / 8) % 2 === 0;

  return {
    displayedText,
    cursorVisible,
    isComplete,
    cursor: cursorVisible ? "|" : "",
    fullText: displayedText + (cursorVisible ? "|" : ""),
  };
};
