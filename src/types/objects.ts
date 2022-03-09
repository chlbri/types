import { AddString } from './strings';

export type NExtract<T, U extends T> = Extract<T, U>;
export type NExclude<T, U extends T> = Exclude<T, U>;
export type NOmit<T, K extends keyof T> = Omit<T, K>;

export type Primitive = string | number | boolean | undefined | null;

export type DeepReadonly<T> = T extends Primitive
  ? T
  : { readonly [P in keyof T]: DeepReadonly<T[P]> };

export type DeepPartial<T> = T extends Primitive
  ? T
  : { [P in keyof T]?: DeepPartial<T[P]> };

// #region SubType
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type AllowedNames<Base, Condition> = FilterFlags<
  Base,
  Condition
>[keyof Base];

export type SubType<Base, Condition> = Pick<
  Base,
  AllowedNames<Base, Condition>
>;
// #endregion

// #region NotSubType
type NotFilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? never : Key;
};

type NotAllowedNames<Base, Condition> = NotFilterFlags<
  Base,
  Condition
>[keyof Base];

export type NotSubType<Base, Condition> = Pick<
  Base,
  NotAllowedNames<Base, Condition>
>;
// #endregion

export type OnPropChangedMethods<T, I extends keyof T = keyof T> = T & {
  [K in Extract<NotAllowedNames<T, (...args: any) => any>, I> &
    string as AddString<Capitalize<K>, 'on', 'Changed'>]: (
    cb: (newValue: T[K]) => void,
  ) => void;
};

export type Undefiny<T> = NotSubType<T, undefined> &
  Partial<SubType<T, undefined>>;

export type Nullify<T> = NotSubType<T, null> & Partial<SubType<T, null>>;

type _OmitWithoutPartial<T, O extends string> = {
  [key in keyof Omit<T, O>]: O extends keyof T[key]
    ? /* LengthOf<
        TuplifyUnion<keyof _OmitWithoutPartial<T[key], O>>
      > extends 1
      ? _OmitWithoutPartial<T[key], O>[keyof _OmitWithoutPartial<
          T[key],
          O
        >]
      : */ _OmitWithoutPartial<T[key], O>
    : T[key];
};

type _OmitWithPartial<T, O extends string> = Undefiny<
  Nullify<_OmitWithoutPartial<T, O>>
>;

export type OmitRecursive<T, O extends string> = {
  [key in keyof _OmitWithPartial<T, O>]: _OmitWithPartial<T[key], O>;
};

export type Unionize<T extends Record<string, any>> = {
  [P in keyof T]: { [Q in P]: T[P] };
}[keyof T];

// #region StringKeys
type _StringKeys<T extends Record<string, any>> = T extends {
  [key in infer K]: infer TK;
}
  ? TK extends Record<string, any>
    ? `${string & K}.${_StringKeys<TK>}`
    : K
  : never;

export type StringKeys<T extends Record<string, any>> = _StringKeys<
  Unionize<T>
>;
// #endregion

type _StringKeyAndValues<T extends Record<string, any>> = T extends {
  [key in infer K]: infer TK;
}
  ? TK extends Record<string, any>
    ? _StringKeyAndValues<{
        [key2 in keyof TK as `${string & K}.${string & key2}`]: TK[key2];
      }>
    : {
        [key in keyof T]: T[key];
      }
  : never;

export type StringKeyAndValues<T extends Record<string, any>> =
  _StringKeyAndValues<Unionize<T>>;

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
