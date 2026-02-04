import type { MD3Theme } from "react-native-paper";

import { DEFAULT_COLOR_SCHEME } from "./_base/theme";

/**
 * Build a custom color scheme by merging with the default color scheme.
 * This is similar to the MUI buildCustomColorScheme function but adapted for react-native-paper.
 */
export const buildCustomColorScheme = (
  options: { colors?: Record<string, string> } & Partial<MD3Theme>,
): Partial<MD3Theme> => ({
  colors: {
    ...DEFAULT_COLOR_SCHEME.colors,
    ...(options.colors as any),
  },
  ...options,
});
