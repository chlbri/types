import type {
  ExcludeArray,
  ExtractArray,
  IndexesOfArray,
  ReverseArray,
  TupleOf,
} from '../types/arrays.types';
import type { UnionToTuple } from '../types/unions.types';

type Ua = unknown[];
type RuA = ReadonlyArray<unknown>;

export const indexesOfArray = <const T extends RuA>(...array: T) => {
  return array.map((_, index) => index) as UnionToTuple<IndexesOfArray<T>>;
};

export const lengthOf = <T extends RuA>(...array: T) => {
  return array.length as T['length'];
};

export const tupleNOf = <const T, N extends number>(data: T, times: N) => {
  return Array.from({ length: times }, () => data) as TupleOf<T, N>;
};

export const arrayOf = <T extends Ua>(...args: T) => {
  return args;
};

export const tupleOf = <const T extends RuA>(...args: T): T =>
  arrayOf(...args);

export const reduceArray = <T>(value: T | readonly T[] | T[]) => {
  return Array.isArray(value) ? value[0] : (value as T);
};

export const reverseArray = <T extends RuA>(...args: T) => {
  return args.slice().reverse() as ReverseArray<T>;
};

export const reverseTuple = <const T extends any[]>(...args: T) => {
  return reverseArray<T>(...args);
};

export const freezeTuple = <const T extends any[]>(...args: T) => {
  return Object.freeze(reverseArray<T>(...args));
};

export const extractArray = <
  const T extends any[],
  const Ex extends T[number][],
>(
  array: T,
  ...extractors: Ex
) => {
  return array.filter(item => extractors.includes(item)) as ExtractArray<
    T,
    Ex[number]
  >;
};

export const excludeTuple = <
  const T extends any[],
  const Ex extends T[number][],
>(
  array: T,
  ...excludes: Ex
) => {
  return array.filter(item => !excludes.includes(item)) as ExcludeArray<
    T,
    Ex[number]
  >;
};

// const dd = extractArray([1, 2, 3, 4, 2, 3, 1, 2, 7, 1, 3], 1, 3);
// const dd2 = excludeTuple([1, 2, 3, 4, 2, 3, 1, 2, 7, 1, 3], 1, 3);
