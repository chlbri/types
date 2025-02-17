import type { NUMBERS } from '../constants';

export type ToString<T extends number | string> = `${T}`;

export type Digit = (typeof NUMBERS.DIGITS)[number];
