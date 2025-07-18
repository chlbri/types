import type { UnionOmit, UnionToTuple } from './commons.types';

export type IndexesOfArray<
  T extends readonly unknown[],
  S extends number[] = [],
> = T['length'] extends S['length']
  ? S[number]
  : IndexesOfArray<T, [S['length'], ...S]>;

// type _DivideBy<
//   N extends number,
//   T extends readonly any[],
// > = T['length'] extends N
//   ? [true]
//   : T extends readonly [...TupleOf<T[number], N>, ...infer U]
//     ? [true, ..._DivideBy<N, U>]
//     : never;

// export type DivideTupleLengthBy<
//   N extends number,
//   T extends readonly any[],
// > = _DivideBy<N, T>['length'];

type _TupleOf<
  T,
  N extends number,
  R extends unknown[] = [],
> = R['length'] extends N ? R : _TupleOf<T, N, [...R, T]>;

export type TupleOf<T = any, N extends number = number> = N extends N
  ? number extends N
    ? T[]
    : [..._TupleOf<T, N>]
  : never;

export type ReverseArray<T extends RuA> = T extends any
  ? T extends []
    ? T
    : T extends [infer Head, ...infer Tail]
      ? [...ReverseArray<Tail>, Head]
      : T
  : never;

export type RuA = readonly unknown[];

export type AnyArray<T = unknown> = ReadonlyArray<T> | T[];

export type _NArrayOmit<
  T extends readonly object[],
  K extends keyof T[number] = never,
> = Extract<UnionOmit<T[number], K>, object>;

export type NArrayOmit<
  T extends readonly object[],
  K extends keyof T[number] = never,
> =
  _NArrayOmit<T, K> extends infer N extends object
    ? UnionToTuple<N>
    : never;

export type ExtractArray<T extends AnyArray, U> = T extends readonly [
  infer A,
  ...infer B,
]
  ? A extends U
    ? [A, ...ExtractArray<B, U>]
    : [...ExtractArray<B, U>]
  : [];

export type ExcludeArray<T extends AnyArray, U> = T extends readonly [
  infer A,
  ...infer B,
]
  ? A extends U
    ? ExcludeArray<B, U>
    : [A, ...ExcludeArray<B, U>]
  : [];

export type ReduceArray<T> = T extends AnyArray ? T[number] : T;
export type ReduceArrayS<T> = T extends AnyArray ? T[0] : T;

export type ReduceDeepArray<T> =
  ReduceArray<T> extends AnyArray
    ? ReduceDeepArray<ReduceArray<T>>
    : ReduceArray<T>;

export type ToArray<T> = T extends AnyArray ? T : AnyArray<T>;

export type RecursiveArrayOf<T> =
  | Array<_SingleOrRecursiveArrayOf<T>>
  | ReadonlyArray<_SingleOrRecursiveArrayOf<T>>;

type _SingleOrRecursiveArrayOf<T> = T | RecursiveArrayOf<T>;
