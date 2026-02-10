import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";

import { ApiProvider } from "../src/hooks/useApi";
import { UserSettingsProvider } from "../src/hooks/useUserSettings";
import { WebConfigProvider } from "../src/hooks/useWebConfig";
import browser from "../src/scripts/browser";
import { queryClient } from "../src/utils/query/queryClient";
import appTheme from "../src/themes";
import { ThemeStorageManager } from "../src/themes/themeStorageManager";

const useReactQueryDevtools =
  window.Proxy && // '@tanstack/query-devtools' requires 'Proxy', which cannot be polyfilled for legacy browsers
  !browser.tv; // Don't use devtools on the TV as the navigation is weird

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <UserSettingsProvider>
          <WebConfigProvider>
            <PaperProvider theme={appTheme}>
              <ThemeStorageManager>
                <Slot />
              </ThemeStorageManager>
            </PaperProvider>
          </WebConfigProvider>
        </UserSettingsProvider>
      </ApiProvider>
      {useReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
