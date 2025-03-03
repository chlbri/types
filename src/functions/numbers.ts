import { DIGITS } from '~constants';
import type { Digit } from '../types';
import { eq } from './utils';

export const IsDigit = (value: unknown): value is Digit => {
  return eq(value, ...DIGITS);
};
