import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";

import {
    DASHBOARD_APP_PATHS,
    DASHBOARD_APP_ROUTES,
} from "apps/dashboard/routes/routes";
import { EXPERIMENTAL_APP_ROUTES } from "apps/experimental/routes/routes";
import { STABLE_APP_ROUTES } from "apps/stable/routes/routes";
import { WIZARD_APP_ROUTES } from "apps/wizard/routes/routes";
import AppHeader from "components/AppHeader";
import Backdrop from "components/Backdrop";
import { SETTING_KEY as LAYOUT_SETTING_KEY } from "components/layoutManager";
import BangRedirect from "components/router/BangRedirect";
import { LayoutMode } from "constants/layoutMode";
import browser from "scripts/browser";
import appTheme from "themes";
import { ThemeStorageManager } from "themes/themeStorageManager";

const Stack = createNativeStackNavigator();

const layoutMode = browser.tv
  ? LayoutMode.Tv
  : localStorage.getItem(LAYOUT_SETTING_KEY);
const isExperimentalLayout =
  !layoutMode || layoutMode === LayoutMode.Experimental;

/**
 * RootAppLayout component that wraps the app with PaperProvider and navigation
 */
function RootAppLayout() {
  return (
    <>
      <AppHeader isHidden={isExperimentalLayout} />
      <Backdrop />
      <Stack.Navigator
        initialRouteName={isExperimentalLayout ? "Experimental" : "Stable"}
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Experimental Layout */}
        {isExperimentalLayout && (
          <>
            {EXPERIMENTAL_APP_ROUTES.map((route: any) => (
              <Stack.Screen
                key={route.path}
                name={route.path}
                component={route.Component || route.element}
                options={{ title: route.path }}
              />
            ))}
          </>
        )}

        {/* Stable Layout */}
        {!isExperimentalLayout && (
          <>
            {STABLE_APP_ROUTES.map((route: any) => (
              <Stack.Screen
                key={route.path}
                name={route.path}
                component={route.Component || route.element}
                options={{ title: route.path }}
              />
            ))}
          </>
        )}

        {/* Dashboard Routes (always available) */}
        {DASHBOARD_APP_ROUTES.map((route: any) => (
          <Stack.Screen
            key={route.path || DASHBOARD_APP_PATHS.Dashboard}
            name={route.path || DASHBOARD_APP_PATHS.Dashboard}
            component={route.Component || route.element}
            options={{ title: route.path || "Dashboard" }}
          />
        ))}

        {/* Wizard Routes */}
        {WIZARD_APP_ROUTES.map((route: any) => (
          <Stack.Screen
            key={route.path}
            name={route.path}
            component={route.Component || route.element}
            options={{ title: route.path }}
          />
        ))}

        {/* Bang Redirect for invalid paths */}
        <Stack.Screen
          name="BangRedirect"
          component={BangRedirect}
          options={{ title: "BangRedirect" }}
        />
      </Stack.Navigator>
    </>
  );
}

export default function RootAppRouter() {
  return (
    <PaperProvider theme={appTheme}>
      <ThemeStorageManager>
        <NavigationContainer>
          <RootAppLayout />
        </NavigationContainer>
      </ThemeStorageManager>
    </PaperProvider>
  );
}
