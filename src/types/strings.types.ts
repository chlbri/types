import type { ENGLISH_LETTERS } from '../constants';

export type LowerLetters = (typeof ENGLISH_LETTERS)[number];

export type UpperLetters = Uppercase<LowerLetters>;

export type Letters = UpperLetters | LowerLetters;

// export type StringLocalLitterals = Letters | Digit;

export type Email = `${string}@${string}.${string}`;

export type _JoinStringHelper = string | number | boolean | bigint;

export type JoinString<
  T extends readonly string[],
  sep extends string = ' ',
> = T extends []
  ? ''
  : T extends [_JoinStringHelper]
    ? `${T[0]}`
    : T extends [_JoinStringHelper, ...infer U extends readonly string[]]
      ? `${T[0]}${sep}${JoinString<U, sep>}`
      : string;

export type AddString<
  T,
  Before extends string = '',
  After extends string = '',
> = `${Before}${T & string}${After}`;

export type StringEndWith<
  S extends string,
  E extends string,
> = S extends `${infer Prev}${E}`
  ? { response: true; full: S; prev: Prev }
  : { response: false; full: S; prev: S };

export type StringStartWith<
  S extends string,
  E extends string,
> = S extends `${E}${infer Next}`
  ? { response: true; full: S; next: Next }
  : { response: false; full: S; next: S };

export type StringContains<
  S extends string,
  E extends string,
> = S extends `${infer Prev}${E}${infer Next}`
  ? { response: true; full: S; prev: Prev; next: Next }
  : { response: false; full: S; prev: string; next: string };

/**
 * Credit to {@link https://stackoverflow.com/a/70831818/11704485 | Matthieu Riegler}
 */
export type SplitStringBy<
  S extends string,
  By extends string = '.',
> = string extends S
  ? string[]
  : S extends ''
    ? []
    : S extends `${infer T}${By}${infer U}`
      ? [T, ...SplitStringBy<U, By>]
      : [S];

export type ExtractS<T> = Extract<T, string>;
