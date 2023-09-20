import { alpha } from '@mui/system/colorManipulator';
import type { ColorRange, PaletteColor } from '@mui/material/styles/createPalette';

const withAlphas = (color: PaletteColor): PaletteColor => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral: ColorRange = {
  50: '#FFFFFF',
  100: '#F5F6F9',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#AAAAAA',
  500: '#6C737F',
  600: '#4D5761',
  700: '#414241',
  800: '#1C2536',
  900: '#0E1011',
};

export const primary = withAlphas({
  lightest: '#F5F6F9',
  light: '#6C737F',
  main: '#4D5761',
  dark: '#414241',
  darkest: '#000000',
  contrastText: '#FFFFFF',
});

export const secondary = withAlphas({
  lightest: '#AAAAAA',
  light: '#AAAAAA',
  main: '#AAAAAA',
  dark: '#AAAAAA',
  darkest: '#AAAAAA',
  contrastText: '#AAAAAA',
});

export const third = withAlphas({
  lightest: '#EF9A9A',
  light: '#EF9A9A',
  main: '#EF9A9A',
  dark: '#EF9A9A',
  darkest: '#EF9A9A',
  contrastText: '#EF9A9A',
});

export const success = withAlphas({
  lightest: '#F0FDF9',
  light: '#3FC79A',
  main: '#10B981',
  dark: '#0B815A',
  darkest: '#134E48',
  contrastText: '#FFFFFF',
});

export const info = withAlphas({
  lightest: '#ECFDFF',
  light: '#06AED4',
  main: '#06AED4',
  dark: '#0E7090',
  darkest: '#164C63',
  contrastText: '#FFFFFF',
});

export const warning = withAlphas({
  lightest: '#FFFAEB',
  light: '#FEF0C7',
  main: '#F79009',
  dark: '#B54708',
  darkest: '#7A2E0E',
  contrastText: '#FFFFFF',
});

export const error = withAlphas({
  lightest: '#FEF3F2',
  light: '#FEE4E2',
  main: '#F04438',
  dark: '#B42318',
  darkest: '#7A271A',
  contrastText: '#FFFFFF',
});
