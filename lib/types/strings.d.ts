import type { NUMBERS, STRINGS } from '../constants';
export type LowerLetters = (typeof STRINGS.ENGLISH_LETTERS)[number];
export type UpperLetters = Uppercase<LowerLetters>;
export type Letters = UpperLetters | LowerLetters;
export type Digit = (typeof NUMBERS.DIGITS)[number];
export type StringLocalLitterals = Letters | Digit;
export type Email = `${string}@${string}.${string}`;
export type _JoinStringHelper = string | number | boolean | bigint;
export type JoinString<T extends readonly any[], sep extends string = ' '> = T extends [] ? '' : T extends [_JoinStringHelper] ? `${T[0]}` : T extends [_JoinStringHelper, ...infer U] ? `${T[0]}${sep}${JoinString<U, sep>}` : string;
export type AddString<T, Before extends string = '', After extends string = ''> = `${Before}${T & string}${After}`;
export type StringEndWith<S extends string, E extends string> = S extends `${infer S1}${E}` ? {
    response: true;
    data: S1;
    full: S;
} : {
    response: false;
    data: S;
};
export type StringStartWith<S extends string, E extends string> = S extends `${E}${infer S1}` ? {
    response: true;
    data: S1;
    full: S;
} : {
    response: false;
    data: S;
};
export type StringContains<S extends string, E extends string> = S extends `${string}${E}${string}` ? {
    response: true;
    data: S;
} : {
    response: false;
    data: S;
};
/**
 * Credit to {@link https://stackoverflow.com/a/70831818/11704485 | Matthieu Riegler}
 */
export type SplitStringBy<S extends string, By extends string = '.'> = string extends S ? string[] : S extends '' ? [] : S extends `${infer T}${By}${infer U}` ? [T, ...SplitStringBy<U, By>] : [S];
//# sourceMappingURL=strings.d.ts.map