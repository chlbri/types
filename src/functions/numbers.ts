import { DIGITS } from '~constants';
import type { Digit } from '../types';
import { castFn } from './commons';
import { eq } from './utils';

export const numbers = castFn<number>()({
  is: (arg: unknown): arg is number => typeof arg === 'number',

  digit: castFn<Digit>()({
    is: (value: unknown): value is Digit => eq(value, ...DIGITS),
  }),

  type: Number,
});
