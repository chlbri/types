import { expandFn } from '~utils';
import { ENGLISH_LETTERS } from '../constants/strings';
import type {
  AddString,
  JoinString,
  Letters,
  LowerLetters,
  SplitStringBy,
  UpperLetters,
} from '../types/types';
import { _unknown, castFn } from './commons';

/**
 *
 * @param value To test
 * @returns A boolean to specify if value is English letters
 *
 * N.B: This function is  case insensitive
 */
const isEnglishLetters = (value: string): value is Letters => {
  if (value.length === 0) return false;

  // Check if all characters are English letters
  for (const char of value.toLowerCase()) {
    if (!ENGLISH_LETTERS.includes(char as any)) {
      return false;
    }
  }
  return true;
};

const _contains = <U extends string[]>(
  value: unknown,
  ...segment: U
): value is `${string}${U[number]}${string}` => {
  if (typeof value !== 'string') return false;

  // Check if the string contains any of the segments
  for (const seg of segment) {
    if (value.includes(seg)) {
      return true;
    }
  }
  return false;
};

export const strings = castFn<string>()({
  is: expandFn(
    (value: unknown) => {
      return typeof value === 'string';
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
      instance: (value: unknown): value is String => {
        return value instanceof String;
      },
    },
  ),

  type: String,

  getLength: <const T extends string>(value: T) => {
    const out = value.length;
    return _unknown<T['length']>(out);
  },

  startsWith: <U extends string>(
    value: unknown,
    prefix: U,
  ): value is `${U}${string}` => {
    return typeof value === 'string' && value.startsWith(prefix);
  },

  endsWith: <U extends string>(
    value: unknown,
    suffix: U,
  ): value is `${string}${U}` => {
    return typeof value === 'string' && value.endsWith(suffix);
  },

  includes: _contains,

  contains: _contains,

  toLowerCase: <T extends string>(value: T) => {
    const out = value.toLowerCase();
    return _unknown<Lowercase<T>>(out);
  },

  toUpperCase: <T extends string>(value: T) => {
    const out = value.toUpperCase();
    return _unknown<Uppercase<T>>(out);
  },

  letters: castFn<Letters>()({
    is: (value: unknown): value is Letters => {
      return typeof value === 'string' && isEnglishLetters(value);
    },

    lower: castFn<LowerLetters>()({
      is: (value: unknown): value is LowerLetters => {
        return (
          typeof value === 'string' &&
          isEnglishLetters(value) &&
          value === value.toLowerCase()
        );
      },
    }),

    upper: castFn<UpperLetters>()({
      is: (value: unknown): value is UpperLetters => {
        return (
          typeof value === 'string' &&
          isEnglishLetters(value) &&
          value === value.toUpperCase()
        );
      },
    }),
  }),

  add: <T extends string, Before extends string, After extends string>(
    value: T,
    before = '' as Before,
    after = '' as After,
  ) => {
    const out = `${before}${value}${after}`;
    return _unknown<AddString<T, Before, After>>(out);
  },

  join: <T extends readonly string[], S extends string = ' '>(
    sep = ' ' as S,
    ...args: T
  ) => {
    const out = args.join(sep);
    return _unknown<JoinString<T, S>>(out);
  },

  splitBy: <const S extends string, By extends string = '.'>(
    value: S,
    by = '.' as By,
  ) => {
    const out = value.split(by);
    return _unknown<SplitStringBy<S, By>>(out);
  },
});
