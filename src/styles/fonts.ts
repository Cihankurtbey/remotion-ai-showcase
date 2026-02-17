import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const interResult = loadInter("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const jetBrainsResult = loadJetBrainsMono("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const interFamily = interResult.fontFamily;
export const jetBrainsFamily = jetBrainsResult.fontFamily;

export const waitForFonts = async (): Promise<void> => {
  await Promise.all([
    interResult.waitUntilDone(),
    jetBrainsResult.waitUntilDone(),
  ]);
};
