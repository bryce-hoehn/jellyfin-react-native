import { useWindowDimensions } from 'react-native';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
} as const;

type Breakpoints = typeof breakpoints;
type BreakpointsInterface = {
  up: (key: keyof Breakpoints) => boolean;
  down: (key: keyof Breakpoints) => boolean;
  between: (start: keyof Breakpoints, end: keyof Breakpoints) => boolean;
  only: (key: keyof Breakpoints) => boolean;
  not: (key: keyof Breakpoints) => boolean;
  values: Breakpoints;
  current: keyof Breakpoints;
};

export type Theme = {
  breakpoints: BreakpointsInterface;
};

export const useMediaQuery = (queryFn?: (theme: Theme) => string) => {
  const { width, height } = useWindowDimensions();
  
  if (!queryFn) {
    return { width, height };
  }

  const theme: Theme = {
    breakpoints: {
      up: (key) => width >= breakpoints[key],
      down: (key) => width < breakpoints[key],
      between: (start, end) => width >= breakpoints[start] && width < breakpoints[end],
      only: (key) => {
        const keys = Object.keys(breakpoints) as (keyof Breakpoints)[];
        const index = keys.indexOf(key);
        if (index === -1) return false;
        const endKey = keys[index + 1];
        const endValue = endKey ? breakpoints[endKey] : Infinity;
        return width >= breakpoints[key] && width < endValue;
      },
      not: (key) => {
        const keys = Object.keys(breakpoints) as (keyof Breakpoints)[];
        const index = keys.indexOf(key);
        if (index === -1) return false;
        const endKey = keys[index + 1];
        const endValue = endKey ? breakpoints[endKey] : Infinity;
        return width < breakpoints[key] || width >= endValue;
      },
      values: breakpoints,
      current: (() => {
        const keys = Object.keys(breakpoints) as (keyof Breakpoints)[];
        for (let i = keys.length - 1; i >= 0; i--) {
          if (width >= breakpoints[keys[i]]) return keys[i];
        }
        return 'xs';
      })(),
    }
  };

  return queryFn(theme);
};
