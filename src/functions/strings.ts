import { ENGLISH_LETTERS } from '../constants/strings';
import type { Letters } from '../types';
import { eq } from './utils';

/**
 *
 * @param value To test
 * @returns A boolean to specify if value is English letters
 *
 * N.B: This function is  case insensitive
 */
export const isEnglishLetters = (value: string): value is Letters => {
  return eq(value.toLowerCase(), ...ENGLISH_LETTERS);
};
