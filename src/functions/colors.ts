import {
  COLOR_1_DIGITS,
  COLOR_2_DIGITS,
  COLOR_NUMBER_DIGITS,
  COLOR_STRING_DIGITS,
  CSS_COLORS,
  TRANSPARENCY_DIGITS,
} from '../constants/colors';
import type {
  Color1Digits,
  Color2Digits,
  ColorNumberDigits,
  ColorStringDigits,
  CssColors,
  TransparencyDigits,
} from '../types/colors';
import { eq } from './utils';

export const isTransparency = (
  value: unknown,
): value is TransparencyDigits => {
  return eq(value, ...TRANSPARENCY_DIGITS);
};

export const isColorNumberDigits = (
  value: unknown,
): value is ColorNumberDigits => {
  return eq(value, ...COLOR_NUMBER_DIGITS);
};

export const isColorStringDigits = (
  value: unknown,
): value is ColorStringDigits => {
  return eq(value, ...COLOR_STRING_DIGITS);
};

export const isCssColors = (value: unknown): value is CssColors => {
  return eq(value, ...CSS_COLORS);
};

export const isColor1Digits = (value: unknown): value is Color1Digits => {
  return eq(value, ...COLOR_1_DIGITS);
};

export const isColor2Digits = (value: unknown): value is Color2Digits => {
  return eq(value, ...COLOR_2_DIGITS);
};
