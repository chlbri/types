/* eslint-disable @typescript-eslint/no-unused-vars */

import { _unknown } from '../functions/commons';
import type {
  Defaulted,
  Fn,
  Keys,
  NonN,
  Primitive,
  PrimitiveObject,
} from './commons.types';
import type {
  DeepNotReadonly,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  NotReadonly,
} from './objects.types';
import { Neverify } from './objects.types';
import type { Checker, FnBasic } from './types';

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
    dynamic<U extends T>(_?: U): U;
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
  partial: typeFnBasic(
    <T extends object>(_?: T) => _unknown<Partial<T>>(),
    {
      deep: <T extends object>(_?: T) => _unknown<DeepPartial<T>>(),
    },
  ),

  const: <const T extends object>(_?: T) => _unknown<T>(),

  identity: <T>(_?: T) => _unknown<T>(),

  is: {
    defined: <T>(_?: T) => _unknown<T extends undefined ? false : true>(),
    undefined: <T>(_?: T) =>
      _unknown<T extends undefined ? true : false>(),
    null: <T>(_?: T) => _unknown<T extends null ? true : false>(),
    notNull: <T>(_?: T) => _unknown<T extends null ? false : true>(),
  },

  unknown: _unknown,

  any: typeFn()(),

  neverify: <T>(_?: T) => _unknown<Neverify<T>>(),

  required: typeFnBasic(
    <T extends object>(_?: T) => _unknown<Required<T>>(),
    {
      deep: <T extends object>(_?: T) => _unknown<DeepRequired<T>>(),
    },
  ),

  readonly: typeFnBasic(
    <T extends object>(_?: T) => _unknown<Required<T>>(),
    {
      deep: typeFnBasic(
        <T extends object>(_?: T) => _unknown<DeepReadonly<T>>(),
        {
          not: typeFnBasic(
            <T extends object>(_?: T) => _unknown<DeepNotReadonly<T>>(),
            {
              is: <T extends object>(_?: T) =>
                _unknown<T extends DeepNotReadonly<T> ? true : false>(),
            },
          ),

          is: <T extends object>(_?: T) =>
            _unknown<T extends DeepReadonly<T> ? true : false>(),
        },
      ),

      not: typeFnBasic(
        <T extends object>(_?: T) => _unknown<NotReadonly<T>>(),
        {
          is: <T extends object>(_?: T) =>
            _unknown<T extends NotReadonly<T> ? true : false>(),
        },
      ),

      is: <T extends object>(_?: T) =>
        _unknown<T extends Readonly<T> ? true : false>(),
    },
  ),

  primitive: typeFn<Primitive>()(),

  primitiveObject: typeFn<PrimitiveObject>()(),

  symbol: typeFn<symbol>()(),

  date: typeFn<Date>()(),

  function: typeFnBasic(
    <T extends any[], R = any>(..._: [...T, R]) => _unknown<Fn<T, R>>(),
    {
      forceCast: <T extends any[], R = any>(_: unknown) =>
        _unknown<Fn<T, R>>(),

      is: <T extends any[], R = any>(_?: T, __?: R) => {
        const _out = <U>(_?: U) =>
          _unknown<U extends Fn<T, R> ? true : false>();
        return _out;
      },

      dynamic: <T extends any[], R = any>(..._: [...T, R]) =>
        _unknown<Fn<T, R>>(),

      checker: typeFn<Checker>()(),
    },
  ),

  undefiny: <T>(_?: T) => _unknown<T | undefined>(),

  extract: typeFnBasic(
    <T, U extends any[]>(_?: T, ...__: U) =>
      _unknown<Extract<T, U[number]>>(),
    {
      const: <const T, const U extends T[]>(_?: T, ...__: U) =>
        _unknown<Extract<T, U[number]>>(),
    },
  ),

  exclude: typeFnBasic(
    <T, U extends any[]>(_?: T, ...__: U) =>
      _unknown<Exclude<T, U[number]>>(),
    {
      const: <const T, const U extends T[]>(_?: T, ...__: U) =>
        _unknown<Exclude<T, U[number]>>(),
    },
  ),

  union: <const T extends any[]>(..._: T) => _unknown<T[number]>(),

  null: typeFn<null>()(),
  bigint: typeFn<bigint>()(),
  never: _unknown<never>(),
  undefined: _unknown<undefined>(),

  keys: typeFn<Keys>()(),

  defaulted: <T, U extends NonN<T>>(_?: T, __?: U) =>
    _unknown<Defaulted<T, U>>(),
});
