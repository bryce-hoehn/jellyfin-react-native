import { buildCustomColorScheme } from '../utils';

/** The "Light" color scheme. */
const theme = buildCustomColorScheme({
    colors: {
        background: '#f2f2f2',
        onBackground: '#000000',
        surface: '#e8e8e8',
        onSurface: '#000000',
        inverseSurface: '#202020',
        inverseOnSurface: 'rgba(255, 255, 255, 0.87)',
        surfaceVariant: '#d8d8d8'
    } as any
});

export default theme;
