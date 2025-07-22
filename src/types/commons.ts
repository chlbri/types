/* eslint-disable @typescript-eslint/no-unused-vars */

import { expandFn } from '~utils';
import { _unknown } from '../functions/commons';
import type {
  Checker,
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
import type { Checker2 } from './types';

export const typeFn = <T = any>() => {
  const _out = <Tr extends object = object>(extensions?: Tr) => {
    const out = expandFn((_?: T) => _unknown<T>(), {
      ...(extensions as Tr),
      forceCast: (_?: unknown) => _unknown<T>(),
      dynamic: <U extends T>(_?: U) => _unknown<U>(),
      is: <U>(_?: U) => _unknown<U extends T ? true : false>(),
      type: _unknown<T>(),
    });

    return out;
  };

  return _out;
};

export const commons = expandFn(<T>(_?: unknown) => _unknown<T>(), {
  partial: expandFn(<T extends object>(_?: T) => _unknown<Partial<T>>(), {
    deep: <T extends object>(_?: T) => _unknown<DeepPartial<T>>(),
  }),

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

  required: expandFn(
    <T extends object>(_?: T) => _unknown<Required<T>>(),
    {
      deep: <T extends object>(_?: T) => _unknown<DeepRequired<T>>(),
    },
  ),

  readonly: expandFn(
    <T extends object>(_?: T) => _unknown<Required<T>>(),
    {
      deep: expandFn(
        <T extends object>(_?: T) => _unknown<DeepReadonly<T>>(),
        {
          not: expandFn(
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

      not: expandFn(
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

  function: expandFn(
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

      checker: typeFn<Checker>()({
        byType: expandFn(<T>(_?: Checker2<T>) => _unknown<Checker2<T>>(), {
          forceCast: <T>(_?: Fn<[unknown], boolean>) =>
            _unknown<Checker2<T>>(),
        }),
      }),
    },
  ),

  undefiny: <T>(_?: T) => _unknown<T | undefined>(),

  extract: expandFn(
    <T, U extends any[]>(_?: T, ...__: U) =>
      _unknown<Extract<T, U[number]>>(),
    {
      const: <const T, const U extends T[]>(_?: T, ...__: U) =>
        _unknown<Extract<T, U[number]>>(),
    },
  ),

  exclude: expandFn(
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
