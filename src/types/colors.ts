import type { COLORS } from '../constants';

export type Color1Digits = (typeof COLORS.COLOR_1_DIGITS)[number];
export type TransparencyDigits =
  (typeof COLORS.TRANSPARENCY_DIGITS)[number];
export type ColorNumberDigits =
  (typeof COLORS.COLOR_NUMBER_DIGITS)[number];
export type ColorStringDigits =
  (typeof COLORS.COLOR_STRING_DIGITS)[number];
export type Color2Digits = (typeof COLORS.COLOR_2_DIGITS)[number];
export type CssColors = (typeof COLORS.CSS_COLORS)[number];

export type RGBA1 = `#${Color1Digits}${Color1Digits}${Color1Digits}${
  | Color1Digits
  | ''}`;
