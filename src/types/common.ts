export type Primitive = string | number | boolean | undefined | null;

export type NExtract<T, U extends T> = Extract<T, U>;
export type NExclude<T, U extends T> = Exclude<T, U>;

export type NotUndefined<T> = Exclude<T, undefined>;

export type Fn<Args extends any[] = any[], R = any> = (...args: Args) => R;

export type Cast<A, B> = A extends B ? A : B;

export type Keys = keyof any;
