/* eslint-disable @typescript-eslint/no-unused-vars */
import { _unknown } from '../functions/commons';
import { typeFn, typeFnBasic } from './commons';
import type { Equals, Keys, PrimitiveObjectMap } from './commons.types';
import type {
  AllowedNames,
  DeepNotReadonly,
  DeepNotSubType,
  DeepOmit,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  NotReadonly,
  NotSubType,
  Ra,
  Rn,
  Ru,
  SubType,
  ValuesOf,
} from './objects.types';

const _readonly = typeFnBasic(
  <T extends object>(_?: T) => _unknown<Readonly<T>>(),
  {
    forceCast: <T extends object>(_?: unknown) => _unknown<Readonly<T>>(),

    dynamic: <T extends Readonly<T>>(_?: T) => _unknown<T>(),

    type: _unknown<Readonly<object>>(),

    is: <T extends object>(_?: T) =>
      _unknown<T extends Readonly<T> ? true : false>(),

    not: typeFnBasic(
      <const T extends object>(_?: T) => _unknown<NotReadonly<T>>(),
      {
        is: <const T extends object>(_?: T) =>
          _unknown<T extends NotReadonly<T> ? true : false>(),
      },
    ),

    deep: typeFnBasic(
      <T extends object>(_?: T) => _unknown<DeepReadonly<T>>(),
      {
        not: typeFnBasic(
          <const T extends object>(_?: T) =>
            _unknown<DeepNotReadonly<T>>(),
          {
            is: <const T extends object>(_?: T) =>
              _unknown<T extends DeepNotReadonly<T> ? true : false>(),
          },
        ),

        is: <T extends object>(_?: T) =>
          _unknown<T extends DeepReadonly<T> ? true : false>(),
      },
    ),
  },
);

export const objects = typeFn<object>()({
  keysOf: typeFnBasic(
    <T extends object>(_?: T) => _unknown<(keyof T)[]>(),
    {
      union: <T extends object>(_?: T) => _unknown<keyof T>(),
    },
  ),

  values: typeFnBasic(
    <T extends object>(_?: T) => _unknown<T[keyof T][]>(),
    {
      union: <T extends object>(_?: T) => _unknown<T[keyof T]>(),
    },
  ),

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
      const: typeFnBasic(
        <const T extends object, K extends (keyof T)[]>(_?: T, ...__: K) =>
          _unknown<Omit<T, K[number]>>(),
        {
          is: <const T, K extends (keyof T)[]>(_?: T, ...__: K) => {
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

      by: typeFnBasic(
        <T extends object, K extends any[]>(_?: T, ...__: K) =>
          _unknown<NotSubType<T, K[number]>>(),
        {
          is: <T extends object, K extends any[]>(_?: T, ...__: K) => {
            const _out = <U>(_?: U) =>
              _unknown<
                U extends NotSubType<T, K[number]> ? true : false
              >();
            return _out;
          },

          const: typeFnBasic(
            <const T extends object, K extends ValuesOf<T>[]>(
              _?: T,
              ...__: K
            ) => _unknown<NotSubType<T, K[number]>>(),
            {
              is: <const T extends object, K extends ValuesOf<T>[]>(
                _?: T,
                ...__: K
              ) => {
                const _out = <U>(_?: U) =>
                  _unknown<
                    U extends NotSubType<T, K[number]> ? true : false
                  >();

                return _out;
              },
            },
          ),
        },
      ),

      deep: typeFnBasic(
        <T, K extends Keys[]>(_?: T, ...__: K) =>
          _unknown<DeepOmit<T, K[number]>>(),
        {
          is: <T, K extends Keys[]>(_?: T, ...__: K) => {
            const _out = <U>(_?: U) =>
              _unknown<U extends DeepOmit<T, K[number]> ? true : false>();

            return _out;
          },

          const: typeFnBasic(
            <const T extends object, K extends (keyof T)[]>(
              _?: T,
              ...__: K
            ) => _unknown<DeepOmit<T, K[number]>>(),
            {
              is: <const T extends object, K extends (keyof T)[]>(
                _?: T,
                ...__: K
              ) => {
                const _out = <U>(_?: U) =>
                  _unknown<
                    U extends DeepOmit<T, K[number]> ? true : false
                  >();

                return _out;
              },
            },
          ),

          by: typeFnBasic(
            <T extends object, K extends any[]>(_?: T, ...__: K) =>
              _unknown<DeepNotSubType<T, K[number]>>(),
            {
              is: <T extends object, K extends any[]>(_?: T, ...__: K) => {
                const _out = <U>(_?: U) =>
                  _unknown<
                    U extends DeepNotSubType<T, K[number]> ? true : false
                  >();
                return _out;
              },

              const: typeFnBasic(
                <const T extends object, K extends ValuesOf<T>[]>(
                  _?: T,
                  ...__: K
                ) => _unknown<DeepNotSubType<T, K[number]>>(),
                {
                  is: <const T extends object, K extends ValuesOf<T>[]>(
                    _?: T,
                    ...__: K
                  ) => {
                    const _out = <U>(_?: U) =>
                      _unknown<
                        U extends DeepNotSubType<T, K[number]>
                          ? true
                          : false
                      >();

                    return _out;
                  },
                },
              ),
            },
          ),
        },
      ),
    },
  ),

  reverse: <T extends Record<Keys, Keys>>(_?: T) => {
    return _unknown<{
      [K in keyof T as T[K]]: K;
    }>();
  },

  readonly: _readonly,

  freeze: _readonly,

  required: typeFnBasic(
    <T extends object>(_?: T) => _unknown<Required<T>>(),
    {
      deep: typeFnBasic(
        <T extends object>(_: T) => _unknown<DeepRequired<T>>(),
        {
          is: <T extends object>(_?: T) =>
            _unknown<T extends DeepRequired<T> ? true : false>(),
        },
      ),

      is: <T extends object>(_?: T) =>
        _unknown<T extends Required<T> ? true : false>(),
    },
  ),

  partial: typeFnBasic(
    <T extends object>(_: T) => _unknown<Partial<T>>(),
    {
      deep: <T extends object>(_: T) => _unknown<DeepPartial<T>>(),
    },
  ),

  pick: typeFnBasic(
    <T extends object, K extends (keyof T)[]>(_: T, ...__: K) =>
      _unknown<Pick<T, K[number]>>(),
    {
      by: typeFnBasic(
        <T extends object, K>(_?: T, __?: K) => _unknown<SubType<T, K>>(),
        {
          keys: <T extends object, K>(_: T, __?: K) =>
            _unknown<AllowedNames<T, K>>(),
        },
      ),
    },
  ),

  ru: typeFn<Ru>()(),
  rn: typeFn<Rn>()(),
  ra: typeFn<Ra>()(),

  primitive: typeFn<PrimitiveObjectMap>()(),
});
