import { buildCustomColorScheme } from '../utils';

/** The Apple TV inspired color scheme. */
const theme = buildCustomColorScheme({
    colors: {
        background: '#d5e9f2',
        onBackground: '#000000',
        surface: '#ffffff',
        onSurface: '#000000',
        inverseSurface: '#202020',
        inverseOnSurface: 'rgba(255, 255, 255, 0.87)',
        primaryContainer: '#bcbcbc',
        secondaryContainer: '#bcbcbc'
    } as any
});

export default theme;
