import { NOmit } from './objects';
export declare type IndexOfArray<T extends readonly unknown[], S extends number[] = []> = T['length'] extends S['length'] ? S[number] : IndexOfArray<T, [S['length'], ...S]>;
declare type _DivideBy<N extends number, T extends readonly any[]> = T['length'] extends N ? [true] : T extends readonly [...TupleOf<T[number], N>, ...infer U] ? [true, ..._DivideBy<N, U>] : never;
export declare type DivideTupleLengthBy<N extends number, T extends readonly any[]> = _DivideBy<N, T>['length'];
export declare type LengthOf<T> = T extends readonly any[] ? T['length'] : never;
declare type _TupleOf<T, N extends number, R extends unknown[] = []> = R['length'] extends N ? R : _TupleOf<T, N, [...R, T]>;
export declare type TupleOf<T = any, N extends number = number> = N extends N ? number extends N ? T[] : [..._TupleOf<T, N>] : never;
export declare type GetTupleType<T> = T extends TupleOf<infer U, any> ? U : never;
export declare type GetTupleNumber<T> = T extends TupleOf<any, infer U> ? U : never;
declare type _UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
declare type _LastOf<T> = _UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never;
declare type _Push<T extends any[], V> = [...T, V];
declare type _TuplifyUnionBoolean<T> = [T] extends [never] ? true : false;
export declare type TuplifyUnion<T> = true extends _TuplifyUnionBoolean<T> ? [] : _Push<TuplifyUnion<Exclude<T, _LastOf<T>>>, _LastOf<T>>;
export declare type Reverse<T> = T extends [] ? T : T extends [infer Head, ...infer Tail] ? [...Reverse<Tail>, Head] : T;
export declare type NArrayOmit<T extends readonly unknown[], K extends keyof T[number] = keyof T[number]> = NOmit<T[number], K>[];
export {};
