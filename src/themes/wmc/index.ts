import { buildCustomColorScheme } from "../utils";

/** The Windows Media Center inspired color scheme. */
const theme = buildCustomColorScheme({
  colors: {
    surface: "#0c2450",
    onSurface: "rgba(255, 255, 255, 0.87)",
    primaryContainer: "#0c2450",
    secondaryContainer: "#0c2450",
  } as any,
});

export default theme;
