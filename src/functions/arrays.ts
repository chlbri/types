import type {
  AnyArray,
  Checker2,
  ExcludeArray,
  ExtractArray,
  IndexesOfArray,
  ReverseArray,
  RuA,
  ToArray,
  TupleOf,
  UnionToTuple,
} from '../types/types';

import { _unknown, castFnBasic } from './commons';

// #region Helpers

const _tupleOf = <const T extends RuA>(...args: T) => {
  const out = args;
  return _unknown<T>(out);
};

// #endregion

//<T>(...values: T[]) => values

export const arrays = castFnBasic(<T>(...values: T[]) => values, {
  low: <T extends unknown[]>(...values: T) => values,

  is: <T>(value: unknown): value is Array<T> => {
    return Array.isArray(value);
  },

  indexes: <const T extends RuA>(...array: T) => {
    const out = array.map((_, index) => index);
    return _unknown<UnionToTuple<IndexesOfArray<T>>>(out);
  },

  lengthOf: <T extends RuA>(...array: T) => {
    const out = array.length;
    return _unknown<T['length']>(out);
  },

  tupleOf: castFnBasic(_tupleOf, {
    number: castFnBasic(
      <const T, N extends number>(data: T, times: N) => {
        const out = Array.from({ length: times }, () => data);
        return _unknown<TupleOf<T, N>>(out);
      },
      {
        is: <T>(fn: Checker2<T>) => {
          const _out = <L extends number>(
            value: unknown,
            length: L,
          ): value is TupleOf<T, L> => {
            const isArray = Array.isArray(value);
            const out =
              isArray && value.length === length && value.every(fn);
            return out;
          };

          return _out;
        },
      },
    ),

    is: <const T>(fn: Checker2<T>) => {
      const _out = (value: unknown): value is Array<T> => {
        return Array.isArray(value) && value.every(fn);
      };

      return _out;
    },
  }),

  reduce: <T>(value: T | readonly [T] | [T]) => {
    const out = Array.isArray(value) ? value[0] : value;
    return _unknown<T>(out);
  },

  toArray: <T>(value: T) => {
    const checkArray = Array.isArray(value);
    const out = checkArray ? value : [value];

    return _unknown<ToArray<T>>(out);
  },

  reverse: <T extends RuA>(...args: T) => {
    const out = args.slice().reverse();
    return _unknown<ReverseArray<T>>(out);
  },

  freeze: <const T extends any[]>(...args: T) =>
    Object.freeze(_tupleOf(...args)),

  extract: <const T extends any[], const Ex extends T[number][]>(
    array: T,
    ...extractors: Ex
  ) => {
    const out = array.filter(item => extractors.includes(item));
    return _unknown<ExtractArray<T, Ex[number]>>(out);
  },

  exclude: <const T extends any[], const Ex extends T[number][]>(
    array: T,
    ...excludes: Ex
  ) => {
    const out = array.filter(item => !excludes.includes(item));
    return _unknown<ExcludeArray<T, Ex[number]>>(out);
  },

  forceCast: (value: unknown) => {
    return _unknown<unknown[]>(value);
  },

  dynamic: <T extends AnyArray>(value: T) => {
    return _unknown<T>(value);
  },

  type: Array,
});
