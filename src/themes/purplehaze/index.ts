import { buildCustomColorScheme } from '../utils';

/** The "Purple Haze" color scheme. */
const theme = buildCustomColorScheme({
    colors: {
        primary: '#48c3c8',
        secondary: '#ff77f1',
        primaryContainer: '#000420',
        secondaryContainer: '#000420',
        surface: '#000420',
        onSurface: 'rgba(255, 255, 255, 0.87)'
    } as any
});

export default theme;
