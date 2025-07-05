/* eslint-disable @typescript-eslint/no-unused-vars */
import { _unknown } from '../functions/commons';
import { typeFn } from './commons';
import type { Digit } from './numbers.types';

export const numbers = typeFn<number>()({
  toString: <T extends number | string>(_: T) => _unknown<`${T}`>(),

  digit: typeFn<Digit>()(),

  type: _unknown<number>(),

  ZERO: _unknown<0>(),

  ONE: _unknown<1>(),

  MINUS_1: _unknown<-1>(),

  bigint: typeFn<bigint>()(),
});
