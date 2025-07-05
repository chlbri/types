/* eslint-disable @typescript-eslint/no-unused-vars */
import { _unknown } from '../functions/commons';
import type {
  AnyArray,
  ExcludeArray,
  ExtractArray,
  IndexesOfArray,
  ReduceArray,
  ReduceDeepArray,
  ReverseArray,
  RuA,
  TupleOf,
} from './arrays.types';
import { typeFnBasic } from './commons';
import type { UnionToTuple } from './commons.types';

export const arrays = typeFnBasic(
  (..._: unknown[]) => _unknown<unknown[]>(),
  {
    low: <T>(..._: T[]) => _unknown<T[]>(),

    is: <T>(_?: T) => _unknown<T extends unknown[] ? true : false>(),

    indexes: typeFnBasic(
      <const T extends RuA>(..._: T) =>
        _unknown<UnionToTuple<IndexesOfArray<T>>>(),
      {
        union: <const T extends RuA>(..._: T) =>
          _unknown<IndexesOfArray<T>>(),
      },
    ),

    lengthOf: <const T extends RuA>(_?: T) => _unknown<T['length']>(),

    tupleOf: typeFnBasic(<const T extends RuA>(..._: T) => _unknown<T>(), {
      number: typeFnBasic(
        <const T, N extends number>(_?: T, __?: N) =>
          _unknown<TupleOf<T, N>>(),
        {
          is: <const U, N extends number>(_?: U, __?: N) => {
            const _out = <T>(_?: T) =>
              _unknown<T extends TupleOf<U, N> ? true : false>();
            return _out;
          },
        },
      ),
      is: <const T>(_?: T) => _unknown<T extends RuA ? true : false>(),
    }),

    reduce: typeFnBasic(<T>(_: T | readonly T[] | T[]) => _unknown<T>(), {
      const: <const T>(_?: T) => _unknown<ReduceArray<T>>(),
      deep: <const T>(_?: T) => _unknown<ReduceDeepArray<T>>(),
    }),

    toArray: <T>(_?: T) => _unknown<AnyArray<T>>(),

    reverse: <T extends RuA>(..._: T) => _unknown<ReverseArray<T>>(),

    freeze: <const T extends RuA>(..._: T) => _unknown<Readonly<T>>(),

    extract: <const T extends unknown[], U extends T[number][]>(
      _?: T,
      ...__: U
    ) => _unknown<ExtractArray<T, U[number]>>(),

    exclude: <const T extends unknown[], U extends T[number][]>(
      _?: T,
      ...__: U
    ) => _unknown<ExcludeArray<T, U[number]>>(),

    forceCast: <T extends unknown[]>(_?: unknown) => _unknown<T>(),

    dynamic: <T extends unknown[]>(_?: T) => _unknown<T>(),

    type: _unknown<unknown[]>(),
  },
);
