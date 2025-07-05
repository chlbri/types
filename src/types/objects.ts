/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Equals } from '~utils';
import { _unknown } from '../functions/commons';
import { typeFn, typeFnBasic } from './commons';
import type { Keys, PrimitiveObject } from './commons.types';
import type {
  AllowedNames,
  DeepNotReadonly,
  DeepOmit,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  NotAllowedNames,
  NotReadonly,
  NotSubType,
  Ra,
  Rn,
  Ru,
  SubType,
} from './objects.types';

const _readonly = typeFnBasic(
  <T extends object>(_?: T) => _unknown<Readonly<T>>(),
  {
    forceCast: <T extends object>(_?: unknown) => _unknown<Readonly<T>>(),

    dynamic: <T extends Readonly<T>>(_?: T) => _unknown<T>(),

    type: _unknown<Readonly<object>>(),

    is: <T extends object>(_?: T) =>
      _unknown<T extends Readonly<T> ? true : false>(),

    const: <const T extends object>(_?: T) => _unknown<Readonly<T>>(),

    not: <const T extends object>(_?: T) => _unknown<NotReadonly<T>>(),

    deep: typeFnBasic(
      <T extends object>(_?: T) => _unknown<DeepReadonly<T>>(),
      {
        const: <const T extends object>(_?: T) =>
          _unknown<DeepReadonly<T>>(),
        not: <const T extends object>(_?: T) =>
          _unknown<DeepNotReadonly<T>>(),
      },
    ),
  },
);

export const objects = typeFn<object>()({
  keysOf: <T extends object>(_?: T) => _unknown<(keyof T)[]>(),

  values: <T extends object>(_?: T) => _unknown<T[keyof T][]>(),

  entries: <T extends object>(_?: T) =>
    _unknown<[keyof T, T[keyof T]][]>(),

  byKey: <T extends object, K extends keyof T>(_?: T, __?: K) =>
    _unknown<T[K]>(),

  hasKeys: <T extends object, K extends Keys[]>(_?: T, ...__: K) =>
    _unknown<K[number] extends keyof T ? true : false>(),

  hasAllKeys: <T extends object, K extends Keys[]>(_?: T, ...__: K) =>
    _unknown<Equals<K[number], keyof T>>(),

  omit: typeFnBasic(
    <T, K extends Keys[]>(_?: T, ...__: K) =>
      _unknown<Omit<T, K[number]>>(),
    {
      strict: typeFnBasic(
        <T, K extends (keyof T)[]>(_?: T, ...__: K) =>
          _unknown<Omit<T, K[number]>>(),
        {
          is: <T, K extends (keyof T)[]>(_?: T, ...__: K) => {
            const _out = <U>(_?: U) =>
              _unknown<U extends Omit<T, K[number]> ? true : false>();

            return _out;
          },
        },
      ),

      is: <T, K extends Keys[]>(_?: T, ...__: K) => {
        const _out = <U>(_?: U) =>
          _unknown<U extends Omit<T, K[number]> ? true : false>();

        return _out;
      },

      deep: <T, K extends Keys[]>(_?: T, ...__: K) =>
        _unknown<DeepOmit<T, K[number]>>(),
    },
  ),

  reverse: <T extends Record<Keys, Keys>>(_?: T) =>
    _unknown<{
      [K in keyof T as T[K]]: K;
    }>(),

  readonly: _readonly,

  freeze: _readonly,

  required: typeFnBasic(
    <T extends object>(_: T) => _unknown<Required<T>>(),
    {
      deep: <T extends object>(_: T) => _unknown<DeepRequired<T>>(),
    },
  ),

  partial: typeFnBasic(
    <T extends object>(_: T) => _unknown<Partial<T>>(),
    {
      deep: <T extends object>(_: T) => _unknown<DeepPartial<T>>(),
    },
  ),

  pick: <T extends object, K extends (keyof T)[]>(_: T, ...__: K) =>
    _unknown<Pick<T, K[number]>>(),

  pickBy: typeFnBasic(
    <T extends object, K>(_?: T, __?: K) => _unknown<SubType<T, K>>(),
    {
      keys: <T extends object, K>(_: T, __?: K) =>
        _unknown<AllowedNames<T, K>>(),
    },
  ),

  omitBy: typeFnBasic(
    <T extends object, K>(_?: T, __?: K) => _unknown<NotSubType<T, K>>(),
    {
      keys: <T extends object, K>(_: T, __?: K) =>
        _unknown<NotAllowedNames<T, K>>(),
    },
  ),

  ru: typeFn<Ru>()(),
  rn: typeFn<Rn>()(),
  ra: typeFn<Ra>()(),

  primitive: typeFn<PrimitiveObject>()(),
});
