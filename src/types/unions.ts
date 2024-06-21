import type { Keys } from './common';

export type UnionKeys<U> = U extends Record<infer K, any> ? K : never;

export type UnionToIntersection<U extends object> = {
  [K in UnionKeys<U>]: U extends Record<K, infer T> ? T : never;
};

export type UnionToIntersection2<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type UnionOmit<T, K extends Keys> = T extends any
  ? Omit<T, K>
  : never;

export type UnionNOmit<T, K extends keyof T> = UnionOmit<T, K>;

export type LastOfUnion<T> = (
  (T extends any ? (x: () => T) => void : never) extends (
    x: infer I,
  ) => void
    ? I
    : never
) extends () => infer U
  ? U
  : never;

export type UnionToTuple<T, A extends any[] = []> = [T] extends [never]
  ? A
  : UnionToTuple<Exclude<T, LastOfUnion<T>>, [LastOfUnion<T>, ...A]>;

// #endregion

// #region type TuplifyUnion
type _UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type _LastOf<T> =
  _UnionToIntersection<
    T extends unknown ? () => T : never
  > extends () => infer R
    ? R
    : never;

type _Push<T extends unknown[], V> = [...T, V];

type _TuplifyUnionBoolean<T> = [T] extends [never] ? true : false;

// TS4.1+
export type TuplifyUnion<T> =
  true extends _TuplifyUnionBoolean<T>
    ? []
    : _Push<TuplifyUnion<Exclude<T, _LastOf<T>>>, _LastOf<T>>;
// #endregion
// #endregion
