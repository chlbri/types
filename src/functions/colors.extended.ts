import { COLOR_3_DIGITS } from '../constants/colors/3digits';
import type { Color3Digits } from '../types/colors.extended';
import { eq } from './utils';

export const isColor3Digits = (value: unknown): value is Color3Digits => {
  return eq(value, ...COLOR_3_DIGITS);
};
