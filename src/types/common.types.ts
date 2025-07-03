import type { SoR } from './arrays.types';

export type Primitive = string | number | boolean | undefined | null;

export type SingleOrArray<T> = T | T[] | ReadonlyArray<T>;

export type SoA<T> = SingleOrArray<T>;

export interface PrimitiveObjectMap {
  [key: Keys]: SoR<_PrimitiveObject>;
}

/**
 * A type that represents a primitive value, which can be a string, number, boolean,
 * null, undefined, or an object.
 */
export type _PrimitiveObject = Primitive | PrimitiveObjectMap;

export type PrimitiveObject = SoR<_PrimitiveObject>;

export type Pi = Primitive;

export type NExtract<T, U extends T> = Extract<T, U>;
export type NExclude<T, U extends T> = Exclude<T, U>;

export type NotUndefined<T> = Exclude<T, undefined>;

export type Nu<T> = NotUndefined<T>;

export type Undefiny<T> = T | undefined;

export type Un<T> = Undefiny<T>;

export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

export type Cast<A, B> = A extends B ? A : B;

export type Keys = keyof any;

export type Defaulted<T, U extends NonNullable<T>> = T extends
  | undefined
  | never
  | null
  ? U
  : T;
