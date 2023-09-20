import { alpha } from '@mui/system/colorManipulator';
import { common } from '@mui/material/colors';
import type {PaletteColorOptions, PaletteOptions} from '@mui/material/styles/createPalette';

import {
  error,
  info,
  neutral,
  primary,
  secondary,
  success, third,
  warning
} from 'src/theme/colors';
import { ColorPreset } from 'src/theme';

interface Config {
  colorPreset?: ColorPreset;
}

type Palette = {
  third: PaletteColorOptions,
} & PaletteOptions

export const createPalette = (config: Config): Palette => {
  const { colorPreset } = config;

  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: neutral[100],
      paper: common.white,
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'light',
    neutral,
    primary: primary,
    secondary: secondary,
    third: third,
    success,
    text: {
      primary: neutral[900],
      secondary: neutral[700],
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  };
};
