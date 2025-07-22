/* eslint-disable @typescript-eslint/no-unused-vars */
import { expandFn } from '~utils';
import { _unknown } from '../functions/commons';
import type {
  AnyArray,
  ExcludeArray,
  ExtractArray,
  IndexesOfArray,
  ReduceDeepArray,
  ReverseArray,
  RuA,
  TupleOf,
} from './arrays.types';
import type { UnionToTuple } from './commons.types';

export const arrays = expandFn(
  <T extends AnyArray>(..._: T) => _unknown<T[number][]>(),
  {
    low: <T>(..._: T[]) => _unknown<T[]>(),

    is: <T>(_?: T) => _unknown<T extends unknown[] ? true : false>(),

    indexes: expandFn(
      <const T extends RuA>(..._: T) =>
        _unknown<UnionToTuple<IndexesOfArray<T>>>(),
      {
        union: <const T extends RuA>(..._: T) =>
          _unknown<IndexesOfArray<T>>(),
      },
    ),

    lengthOf: <const T extends RuA>(_?: T) => _unknown<T['length']>(),

    tupleOf: expandFn(<const T extends RuA>(..._: T) => _unknown<T>(), {
      number: expandFn(
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

    reduce: expandFn(<T>(_: T | readonly T[] | T[]) => _unknown<T>(), {
      deep: <T>(_?: T) => _unknown<ReduceDeepArray<T>>(),
    }),

    reverse: <T extends RuA>(..._: T) => _unknown<ReverseArray<T>>(),

    toArray: <T>(_?: T) => _unknown<AnyArray<T>>(),

    freeze: <const T extends RuA>(..._: T) => _unknown<Readonly<T>>(),

    extract: <const T extends AnyArray, const U extends T[number][]>(
      _?: T,
      ...__: U
    ) => _unknown<ExtractArray<T, U[number]>>(),

    exclude: <const T extends AnyArray, const U extends T[number][]>(
      _?: T,
      ...__: U
    ) => _unknown<ExcludeArray<T, U[number]>>(),

    forceCast: (_?: unknown) => _unknown<unknown[]>(),

    dynamic: <T extends unknown[]>(_?: T) => _unknown<T>(),

    type: _unknown<unknown[]>(),
  },
);
