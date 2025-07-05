/* eslint-disable @typescript-eslint/no-unused-vars */

import type { FnBasic } from '~utils';
import { _unknown } from '../functions/commons';
import type { Defaulted, Fn, Keys, Primitive } from './commons.types';
import type {
  DeepPartial,
  DeepReadonly,
  DeepRequired,
} from './objects.types';
import { Neverify } from './objects.types';

export const typeFnBasic = <
  Main extends Fn,
  const Tr extends object = object,
>(
  main: Main,
  extensions?: Tr,
): FnBasic<Main, Tr> => {
  const out: any = main;

  if (extensions) {
    Object.assign(out, extensions);
  }

  return out;
};

type FnReturn<T = any, Tr extends object = object> = FnBasic<
  (_?: T) => T,
  {
    forceCast(_?: unknown): T;
    type: T;
    dynamic<U extends T>(_: U): U;
    is<U>(_?: U): U extends T ? true : false;
  } & Tr
>;

export const typeFn = <T = any>() => {
  const _out = <Tr extends object = object>(
    extensions?: Tr,
  ): FnReturn<T, Tr> => {
    const out: any = (_?: T) => _unknown<T>();

    out.forceCast = (_?: unknown) => _unknown<T>();

    out.type = _unknown<T>();

    out.dynamic = <U extends T>(_?: U) => _unknown<U>();

    out.is = <U>(_?: U) => _unknown<U extends T ? true : false>();

    if (extensions) {
      Object.assign(out, extensions);
    }

    return out;
  };

  return _out;
};

export const commons = typeFnBasic(<T>(_?: unknown) => _unknown<T>(), {
  extract: typeFnBasic(
    <T, U extends any[]>(_?: T, ...__: U) =>
      _unknown<Extract<T, U[number]>>(),
    {
      strict: <T, U extends T[]>(_?: T, ...__: U) =>
        _unknown<Extract<T, U[number]>>(),
      const: <const T, const U extends T[]>(_?: T, ...__: U) =>
        _unknown<Extract<T, U[number]>>(),
    },
  ),

  exclude: typeFnBasic(
    <T, U extends any[]>(_?: T, ...__: U) =>
      _unknown<Exclude<T, U[number]>>(),
    {
      strict: <T, U extends T[]>(_?: T, ...__: U) =>
        _unknown<Exclude<T, U[number]>>(),
      const: <const T, const U extends T[]>(_?: T, ...__: U) =>
        _unknown<Exclude<T, U[number]>>(),
    },
  ),

  required: typeFnBasic(
    <T extends object>(_?: T) => _unknown<Required<T>>(),
    {
      deep: <T extends object>(_?: T) => _unknown<DeepRequired<T>>(),
    },
  ),

  readonly: typeFnBasic(
    <T extends object>(_?: T) => _unknown<Required<T>>(),
    {
      const: <const T extends object>(_?: T) => _unknown<Readonly<T>>(),

      deep: typeFnBasic(
        <T extends object>(_?: T) => _unknown<DeepReadonly<T>>(),
        {
          const: <const T extends object>(_?: T) =>
            _unknown<DeepReadonly<T>>(),
        },
      ),
    },
  ),

  partial: typeFnBasic(
    <T extends object>(_?: T) => _unknown<Partial<T>>(),
    {
      deep: <T extends object>(_?: T) => _unknown<DeepPartial<T>>(),
    },
  ),

  union: <const T extends any[]>(..._: T) => _unknown<T[number]>(),

  date: typeFn<Date>()(),
  null: typeFn<null>()(),
  symbol: typeFn<symbol>()(),
  bigint: typeFn<bigint>()(),
  never: _unknown<never>(),
  undefined: _unknown<undefined>(),

  function: <T extends any[], R = any>(..._: [...T, R]) =>
    _unknown<(...args: T) => R>(),

  unknown: _unknown,

  any: typeFn()(),

  primitive: typeFn<Primitive>()(),

  undefiny: <T>(_?: T) => _unknown<T | undefined>(),

  identity: <T>(_?: T) => _unknown<T>(),

  keys: typeFn<Keys>()(),

  keysOf: <T extends object>(_?: T) => _unknown<keyof T>(),

  default: <T, U extends NonNullable<T>>(_?: T, __?: U) =>
    _unknown<Defaulted<T, U>>(),

  neverify: <T>(_?: T) => _unknown<Neverify<T>>(),
});
