/* eslint-disable @typescript-eslint/no-unused-vars */
import { _unknown } from '../functions/commons';
import { typeFn } from './commons';
import type { Digit } from './numbers.types';

export const t_number = <T extends number>(_: T) => _unknown<T>();
t_number.toString = <T extends number | string>(_: T) =>
  _unknown<`${T}`>();
t_number.digit = typeFn<Digit>();
t_number.forceCast = <T extends number>(_: unknown) => _unknown<T>();
t_number.is = <T>(_: T) => _unknown<T extends number ? true : false>();
t_number.type = _unknown<number>();

t_number.zero = _unknown<0>();
t_number.one = _unknown<1>();
t_number.minus1 = _unknown<-1>();
t_number.bigint = typeFn<bigint>();
