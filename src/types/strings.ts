import { NUMBERS, STRINGS } from '../constants';

export type LowerLetters = typeof STRINGS.ENGLISH_LETTERS[number];

export type UpperLetters = Uppercase<LowerLetters>;

export type Letters = UpperLetters | LowerLetters;

export type Digit = typeof NUMBERS.DIGITS[number];

export type StringLocalLitterals = Letters | Digit;

export type Email = `${string}@${string}.${string}`;

export type _JoinStringHelper = string | number | boolean | bigint;

export type JoinString<
  T extends readonly any[],
  sep extends string = ' ',
> = T extends []
  ? ''
  : T extends [_JoinStringHelper]
  ? `${T[0]}`
  : T extends [_JoinStringHelper, ...infer U]
  ? `${T[0]}${sep}${JoinString<U, sep>}`
  : string;

export type AddString<
  T,
  Before extends string = '',
  After extends string = '',
> = `${Before}${T & string}${After}`;