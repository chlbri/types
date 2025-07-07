import type { RecursiveArrayOf } from './arrays.types';
import type { TrueObject } from './objects.types';

export type SingleOrRecursiveArrayOf<T> = T | RecursiveArrayOf<T>;

export type SoR<T> = SingleOrRecursiveArrayOf<T>;

export type Primitive2 = string | number | boolean;
export type Primitive = Primitive2 | undefined | null;

export type SingleOrArray<T> = T | T[] | ReadonlyArray<T>;

export type SoA<T> = SingleOrArray<T>;

export type PrimitiveObjectMap = {
  [key: Keys]: SoR<_PrimitiveObject>;
} & TrueObject;

type _PrimitiveObject = Primitive | PrimitiveObjectMap;

/**
 * A type that represents a primitive object, which can be a primitive value or an object
 *
 * @remark
 */
export type PrimitiveObject = SoR<_PrimitiveObject>;

export type NExtract<T, U extends T> = Extract<T, U>;
export type NExclude<T, U extends T> = Exclude<T, U>;

export type NotUndefined<T> = Exclude<T, undefined>;

export type Nu<T> = NotUndefined<T>;

export type Undefiny<T> = T | undefined;

export type Un<T> = Undefiny<T>;

export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

export type Cast<A, B> = A extends B ? A : B;

export type Keys = keyof any;

export type NonN<T> = T extends undefined | null ? any : NonNullable<T>;

export type Defaulted<T, U extends NonN<T>> = T extends
  | undefined
  | never
  | null
  ? U
  : T;

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

export type Checker<T = any> =
  | ((value: unknown) => value is T)
  | ((value: unknown) => boolean);

export type FnBasic<Main extends Fn, Tr extends object> = Tr & Main;

export type Equals<T, U> = T extends U
  ? U extends T
    ? true
    : false
  : false;
