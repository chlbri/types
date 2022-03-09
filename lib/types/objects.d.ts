import { AddString } from './strings';
export declare type NExtract<T, U extends T> = Extract<T, U>;
export declare type NExclude<T, U extends T> = Exclude<T, U>;
export declare type NOmit<T, K extends keyof T> = Omit<T, K>;
export declare type Primitive = string | number | boolean | undefined | null;
export declare type DeepReadonly<T> = T extends Primitive ? T : {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export declare type DeepPartial<T> = T extends Primitive ? T : {
    [P in keyof T]?: DeepPartial<T[P]>;
};
declare type FilterFlags<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
declare type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
export declare type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;
declare type NotFilterFlags<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? never : Key;
};
declare type NotAllowedNames<Base, Condition> = NotFilterFlags<Base, Condition>[keyof Base];
export declare type NotSubType<Base, Condition> = Pick<Base, NotAllowedNames<Base, Condition>>;
export declare type OnPropChangedMethods<T, I extends keyof T = keyof T> = T & {
    [K in Extract<NotAllowedNames<T, (...args: any) => any>, I> & string as AddString<Capitalize<K>, 'on', 'Changed'>]: (cb: (newValue: T[K]) => void) => void;
};
export declare type Undefiny<T> = NotSubType<T, undefined> & Partial<SubType<T, undefined>>;
export declare type Nullify<T> = NotSubType<T, null> & Partial<SubType<T, null>>;
declare type _OmitWithoutPartial<T, O extends string> = {
    [key in keyof Omit<T, O>]: O extends keyof T[key] ? _OmitWithoutPartial<T[key], O> : T[key];
};
declare type _OmitWithPartial<T, O extends string> = Undefiny<Nullify<_OmitWithoutPartial<T, O>>>;
export declare type OmitRecursive<T, O extends string> = {
    [key in keyof _OmitWithPartial<T, O>]: _OmitWithPartial<T[key], O>;
};
export declare type Unionize<T extends Record<string, any>> = {
    [P in keyof T]: {
        [Q in P]: T[P];
    };
}[keyof T];
declare type _StringKeys<T extends Record<string, any>> = T extends {
    [key in infer K]: infer TK;
} ? TK extends Record<string, any> ? `${string & K}.${_StringKeys<TK>}` : K : never;
export declare type StringKeys<T extends Record<string, any>> = _StringKeys<Unionize<T>>;
declare type _StringKeyAndValues<T extends Record<string, any>> = T extends {
    [key in infer K]: infer TK;
} ? TK extends Record<string, any> ? _StringKeyAndValues<{
    [key2 in keyof TK as `${string & K}.${string & key2}`]: TK[key2];
}> : {
    [key in keyof T]: T[key];
} : never;
export declare type StringKeyAndValues<T extends Record<string, any>> = _StringKeyAndValues<Unionize<T>>;
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export {};
