import { DIGITS } from '~constants';
import type { Digit } from '../types';
import { castFn, commons } from './commons';
import { eq } from './utils';

export const numbers = castFn<number>()({
  toString: <T extends number | string>(arg: T): `${T}` => `${arg}`,

  digit: castFn<Digit>()({
    is: (value: unknown): value is Digit => eq(value, ...DIGITS),
  }),

  is: (arg: unknown): arg is number => typeof arg === 'number',

  type: Number,

  ZERO: commons.identity(0),

  ONE: commons.identity(1),

  MINUS_1: commons.identity(-1),

  bigint: castFn<bigint>()({
    is: (value: unknown): value is bigint => typeof value === 'bigint',
  }),
});
