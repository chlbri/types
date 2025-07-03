/* eslint-disable @typescript-eslint/no-unused-vars */
import { _unknown } from 'functions/commons';

export const t_array = <T extends unknown[]>(..._: T) => _unknown<T>();
t_array.readonly = <const T extends readonly unknown[]>(..._: T) =>
  _unknown<ReadonlyArray<T[number]>>();
t_array.tuple = <const T extends readonly unknown[]>(..._: T) =>
  _unknown<T>();
t_array.forceCast = <T extends unknown[]>(_: unknown) => _unknown<T>();
t_array.is = <T>(_: T) => _unknown<T extends unknown[] ? true : false>();
t_array.type = _unknown<unknown[]>();
t_array.length = <const T extends unknown[]>(_: T) =>
  _unknown<T['length']>();
