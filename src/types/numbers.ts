/* eslint-disable @typescript-eslint/no-unused-vars */
import { _unknown, typeFn } from '~utils';
import type { Digit } from './numbers.types';

export const numbers = typeFn<number>()({
  getString: <const T extends number>(_: T) => _unknown<`${T}`>(),

  digit: typeFn<Digit>()(),

  type: _unknown<number>(),

  ZERO: _unknown<0>(),

  ONE: _unknown<1>(),

  MINUS_1: _unknown<-1>(),

  bigint: typeFn<bigint>()(),
});
