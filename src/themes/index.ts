import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import type { MD3Theme } from 'react-native-paper';

import appletv from './appletv';
import blueradiance from './blueradiance';
import dark from './dark';
import light from './light';
import purplehaze from './purplehaze';
import wmc from './wmc';

/**
 * Base theme configuration shared across all color schemes.
 */
const BASE_THEME: Partial<MD3Theme> = {
    roundness: 4
};

/**
 * The default theme containing all color scheme variants.
 * react-native-paper doesn't have built-in color scheme switching like MUI,
 * so we export individual themes for each scheme.
 */
const themes = {
    dark: {
        ...BASE_THEME,
        ...MD3DarkTheme,
        ...dark
    } as MD3Theme,
    light: {
        ...BASE_THEME,
        ...MD3LightTheme,
        ...light
    } as MD3Theme,
    appletv: {
        ...BASE_THEME,
        ...MD3LightTheme,
        ...appletv
    } as MD3Theme,
    blueradiance: {
        ...BASE_THEME,
        ...MD3DarkTheme,
        ...blueradiance
    } as MD3Theme,
    purplehaze: {
        ...BASE_THEME,
        ...MD3DarkTheme,
        ...purplehaze
    } as MD3Theme,
    wmc: {
        ...BASE_THEME,
        ...MD3DarkTheme,
        ...wmc
    } as MD3Theme
};

/** The default theme (dark mode). */
const DEFAULT_THEME = themes.dark;

export default DEFAULT_THEME;
export { themes };
export type { MD3Theme };
