import type { UnionOmit, UnionToTuple } from './unions';

export type IndexOfArray<
  T extends readonly unknown[],
  S extends number[] = [],
> = T['length'] extends S['length']
  ? S[number]
  : IndexOfArray<T, [S['length'], ...S]>;

type _DivideBy<
  N extends number,
  T extends readonly any[],
> = T['length'] extends N
  ? [true]
  : T extends readonly [...TupleOf<T[number], N>, ...infer U]
    ? [true, ..._DivideBy<N, U>]
    : never;

export type DivideTupleLengthBy<
  N extends number,
  T extends readonly any[],
> = _DivideBy<N, T>['length'];

export type LengthOf<T> = T extends readonly any[] ? T['length'] : never;

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

export type GetTupleType<T> = T extends TupleOf<infer U, any> ? U : never;

export type GetTupleNumber<T> =
  T extends TupleOf<any, infer U> ? U : never;

export type ReduceArray<T> = T extends any[] ? T[number] : T;

export type ReduceArrayByKey<T, K extends string> =
  ReduceArray<T> extends Record<K, infer V> ? V : never;

export type ReverseArray<T> = T extends []
  ? T
  : T extends [infer Head, ...infer Tail]
    ? [...ReverseArray<Tail>, Head]
    : T;

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

export type ExtractArray<T extends any[], U> = T extends [
  infer A,
  ...infer B,
]
  ? A extends U
    ? [A, ...ExtractArray<B, U>]
    : [...ExtractArray<B, U>]
  : [];

export type ExcludeArray<T extends any[], U> = T extends [
  infer A,
  ...infer B,
]
  ? A extends U
    ? ExcludeArray<B, U>
    : [A, ...ExcludeArray<B, U>]
  : [];
