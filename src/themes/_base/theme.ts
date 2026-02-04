import type { MD3Theme } from 'react-native-paper';

/** The default color configuration for react-native-paper themes. */
export const DEFAULT_COLOR_SCHEME = {
    colors: {
        primary: '#00a4dc',
        onPrimary: '#ffffff',
        primaryContainer: '#004d66',
        onPrimaryContainer: '#ffffff',
        secondary: '#aa5cc3',
        onSecondary: '#ffffff',
        secondaryContainer: '#7a3a91',
        onSecondaryContainer: '#ffffff',
        tertiary: '#f2b01e',
        onTertiary: '#ffffff',
        tertiaryContainer: '#b67c00',
        onTertiaryContainer: '#ffffff',
        error: '#c62828',
        onError: '#ffffff',
        errorContainer: '#ffdad6',
        onErrorContainer: '#410002',
        background: '#101010',
        onBackground: 'rgba(255, 255, 255, 0.87)',
        surface: '#202020',
        onSurface: 'rgba(255, 255, 255, 0.87)',
        surfaceVariant: '#303030',
        onSurfaceVariant: 'rgba(255, 255, 255, 0.6)',
        outline: 'rgba(255, 255, 255, 0.12)',
        outlineVariant: 'rgba(255, 255, 255, 0.12)',
        inverseSurface: '#e8e8e8',
        inverseOnSurface: '#000000',
        inversePrimary: '#00a4dc',
        shadow: 'rgba(0, 0, 0, 0.4)',
        scrim: 'rgba(0, 0, 0, 0.4)',
        backdrop: 'rgba(0, 0, 0, 0.4)',
        surfaceDisabled: 'rgba(255, 255, 255, 0.12)',
        onSurfaceDisabled: 'rgba(255, 255, 255, 0.38)',
        elevation: {
            level0: 'transparent',
            level1: 'rgba(0, 0, 0, 0.12)',
            level2: 'rgba(0, 0, 0, 0.24)',
            level3: 'rgba(0, 0, 0, 0.36)',
            level4: 'rgba(0, 0, 0, 0.48)',
            level5: 'rgba(0, 0, 0, 0.6)'
        }
    }
};

/** The default customizations to the react-native-paper theme. */
export const DEFAULT_THEME_OPTIONS: Partial<MD3Theme> = {
    roundness: 4
};
