/* eslint-disable @typescript-eslint/no-unused-vars */

import { _unknown } from '../functions/commons';
import { typeFn } from './commons';
import {
  Email,
  type AddString,
  type JoinString,
  type Letters,
  type LowerLetters,
  type SplitStringBy,
  type UpperLetters,
} from './strings.types';

const _contains = <const T extends string, U extends string[]>(
  _?: T,
  ...__: U
) => _unknown<T extends `${string}${U[number]}${string}` ? true : false>();

export const strings = typeFn<string>()({
  getLength: <const T extends string>(_?: T) => _unknown<T['length']>(),

  startsWith: <const T extends string, U extends string>(_?: T, __?: U) =>
    _unknown<T extends `${U}${string}` ? true : false>(),

  endsWith: <const T extends string, U extends string>(_?: T, __?: U) =>
    _unknown<T extends `${string}${U}` ? true : false>(),

  includes: _contains,

  contains: _contains,

  toLowerCase: <const T extends string>(_?: T) => _unknown<Lowercase<T>>(),

  toUpperCase: <const T extends string>(_?: T) => _unknown<Uppercase<T>>(),

  letters: typeFn<Letters>()({
    lower: typeFn<LowerLetters>()(),
    upper: typeFn<UpperLetters>()(),
    type: _unknown<Letters>(),
  }),

  email: typeFn<Email>()(),

  add: <T extends string, Before extends string, After extends string>(
    _?: T,
    __?: Before,
    ___?: After,
  ) => _unknown<AddString<T, Before, After>>(),

  join: <T extends readonly string[], sep extends string = ' '>(
    _?: sep,
    ...__: T
  ) => _unknown<JoinString<T, sep>>(),

  splitBy: <const S extends string, By extends string = '.'>(
    _?: S,
    __?: By,
  ) => _unknown<SplitStringBy<S, By>>(),
});
