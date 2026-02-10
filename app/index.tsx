import { Redirect } from "expo-router";
import { SETTING_KEY as LAYOUT_SETTING_KEY } from "../src/components/layoutManager";
import browser from "../src/scripts/browser";
import { LayoutMode } from "../src/constants/layoutMode";

const layoutMode = browser.tv
  ? LayoutMode.Tv
  : localStorage.getItem(LAYOUT_SETTING_KEY);
const isExperimentalLayout =
  !layoutMode || layoutMode === LayoutMode.Experimental;

export default function Index() {
  // Redirect to the appropriate layout based on user settings
  if (isExperimentalLayout) {
    return <Redirect href="/experimental/home" />;
  }
  
  return <Redirect href="/stable/home" />;
}
