import type { DIGITS } from '~constants';

export type ToString<T extends number | string> = `${T}`;

export type Digit = (typeof DIGITS)[number];
