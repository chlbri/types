/* eslint-disable @typescript-eslint/no-unused-vars */

import { _unknown } from 'functions/common';
import { typeFn } from './common';
import {
  Email,
  type AddString,
  type JoinString,
  type Letters,
  type LowerLetters,
  type SplitStringBy,
  type UpperLetters,
} from './strings.types';

export const strings = <T extends string>(_?: T) => _unknown<T>();
strings.forceCast = <T extends string>(_?: unknown) => _unknown<T>();
strings.is = <T>(_?: T) => _unknown<T extends string ? true : false>();
strings.type = _unknown<string>();
strings.length = <const T extends string>(_?: T) =>
  _unknown<T['length']>();
strings.startsWith = <const T extends string, U extends string>(
  _?: T,
  __?: U,
) => _unknown<T extends `${U}${string}` ? true : false>();
strings.endsWith = <const T extends string, U extends string>(
  _?: T,
  __?: U,
) => _unknown<T extends `${string}${U}` ? true : false>();
strings.includes = <const T extends string, U extends string[]>(
  _?: T,
  ...__: U
) => _unknown<T extends `${string}${U[number]}${string}` ? true : false>();
strings.toLowerCase = <const T extends string>(_?: T) =>
  _unknown<Lowercase<T>>();
strings.toUpperCase = <const T extends string>(_?: T) =>
  _unknown<Uppercase<T>>();
strings.letters = <const T extends Letters>(_?: T) => _unknown<T>();
strings.lowerLetters = <const T extends LowerLetters>(_?: T) =>
  _unknown<T>();
strings.upperLetters = <const T extends UpperLetters>(_?: T) =>
  _unknown<T>();

strings.isLetters = <T>(_?: T) =>
  _unknown<T extends Letters ? true : false>();
strings.isLowerLetters = <T>(_?: T) =>
  _unknown<T extends LowerLetters ? true : false>();
strings.isUpperLetters = <T>(_?: T) =>
  _unknown<T extends UpperLetters ? true : false>();
strings.isLowerCase = <const T>(_?: T) =>
  _unknown<T extends Lowercase<string> ? true : false>();
strings.isUpperCase = <const T>(_?: T) =>
  _unknown<T extends Uppercase<string> ? true : false>();
strings.email = typeFn<Email>();
strings.add = <
  T extends string,
  Before extends string,
  After extends string,
>(
  _?: T,
  __?: Before,
  ___?: After,
) => _unknown<AddString<T, Before, After>>();
strings.join = <T extends readonly string[], sep extends string = ' '>(
  _?: sep,
  ...__: T
) => _unknown<JoinString<T, sep>>();
strings.splitBy = <const S extends string, By extends string = '.'>(
  _?: S,
  __?: By,
) => _unknown<SplitStringBy<S, By>>();
