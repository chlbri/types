import type { Checker } from '~utils';
import type {
  ExcludeArray,
  ExtractArray,
  IndexesOfArray,
  ReverseArray,
  RuA,
  TupleOf,
  UnionToTuple,
} from '../types';

import { _unknown, castFnBasic } from './commons';

// #region Helpers
const _reverse = <T extends RuA>(...args: T) => {
  const out = args.slice().reverse();
  return _unknown<ReverseArray<T>>(out);
};

const _tupleOf = <const T extends RuA>(...args: T) => {
  const out = args;
  return _unknown<T>(out);
};

const _reduce = <T>(value: T | readonly T[] | T[]) => {
  const out = Array.isArray(value) ? value[0] : value;
  return _unknown<T>(out);
};

// #endregion

export const arrays = castFnBasic(<T>(...values: T[]) => values, {
  low: <T extends any[]>(...values: T) => {
    const out = values;
    return _unknown<T>(out);
  },

  is: castFnBasic(
    <T = any>(value: unknown): value is Array<T> => {
      return Array.isArray(value);
    },
    {
      strict: <T = any>(fn: Checker<T>) => {
        const _out = (value: unknown): value is Array<T> => {
          return Array.isArray(value) && value.every(fn);
        };

        return _out;
      },
    },
  ),

  indexes: <const T extends RuA>(...array: T) => {
    const out = array.map((_, index) => index);
    return _unknown<UnionToTuple<IndexesOfArray<T>>>(out);
  },

  lengthOf: <T extends RuA>(...array: T) => {
    const out = array.length;
    return _unknown<T['length']>(out);
  },

  tupleOf: castFnBasic(_tupleOf, {
    number: <const T, N extends number>(data: T, times: N) => {
      const out = Array.from({ length: times }, () => data);
      return _unknown<TupleOf<T, N>>(out);
    },

    is: <T = any>(fn: Checker<T>) => {
      const _out = <L extends number>(
        value: unknown,
        length: L,
      ): value is TupleOf<T, L> => {
        const isArray = Array.isArray(value);
        const out = isArray && value.every(fn) && value.length === length;
        return out;
      };

      return _out;
    },
  }),

  reduce: castFnBasic(_reduce, {
    const: <const T>(value: T | readonly T[] | T[]) => {
      return _reduce<T>(value);
    },
  }),

  reverse: castFnBasic(_reverse, {
    tuple: <const T extends any[]>(...args: T) => _reverse<T>(...args),
    freeze: <const T extends any[]>(...args: T) =>
      Object.freeze(_reverse<T>(...args)),
  }),

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
});
