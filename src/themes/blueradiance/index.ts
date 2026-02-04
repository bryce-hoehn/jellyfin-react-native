import { buildCustomColorScheme } from '../utils';

/** The "Blue Radiance" color scheme. */
const theme = buildCustomColorScheme({
    colors: {
        surface: '#011432',
        onSurface: 'rgba(255, 255, 255, 0.87)',
        primaryContainer: '#011432',
        secondaryContainer: '#011432'
    } as any
});

export default theme;
