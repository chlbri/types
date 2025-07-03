import type {
  ExcludeArray,
  ExtractArray,
  IndexesOfArray,
  ReverseArray,
  TupleOf,
} from '../types/arrays.types';
import type { UnionToTuple } from '../types/unions.types';
import { _unknown } from './commons';

type RuA = ReadonlyArray<unknown>;

export const arrays = <T>(...values: T[]) => values;

arrays.low = <T extends any[]>(...values: T) =>
  _unknown<T[number][]>(values);

arrays.indexes = <const T extends RuA>(
  ...array: T
): UnionToTuple<IndexesOfArray<T>> => {
  return array.map((_, index) => index) as any;
};

arrays.lengthOf = <T extends RuA>(...array: T) => {
  return array.length as T['length'];
};

const tupleOf = <const T extends RuA>(...args: T): T => args;

tupleOf.number = <const T, N extends number>(data: T, times: N) => {
  return Array.from({ length: times }, () => data) as TupleOf<T, N>;
};

arrays.tupleOf = tupleOf;

const reduce = <T>(value: T | readonly T[] | T[]) => {
  return Array.isArray(value) ? value[0] : (value as T);
};

reduce.const = <const T>(value: T | readonly T[] | T[]) => {
  return reduce<T>(value);
};

arrays.reduce = reduce;

export const reverse = <T extends RuA>(...args: T) => {
  return args.slice().reverse() as ReverseArray<T>;
};
reverse.tuple = <const T extends any[]>(...args: T) => {
  return reverse<T>(...args);
};

reverse.freeze = <const T extends any[]>(...args: T) => {
  return Object.freeze(reverse<T>(...args));
};

arrays.reverse = reverse;

arrays.freeze = <const T extends any[]>(...args: T) =>
  Object.freeze(arrays.tupleOf(...args));

arrays.extract = <const T extends any[], const Ex extends T[number][]>(
  array: T,
  ...extractors: Ex
) => {
  return array.filter(item => extractors.includes(item)) as ExtractArray<
    T,
    Ex[number]
  >;
};

arrays.exclude = <const T extends any[], const Ex extends T[number][]>(
  array: T,
  ...excludes: Ex
) => {
  return array.filter(item => !excludes.includes(item)) as ExcludeArray<
    T,
    Ex[number]
  >;
};
