import type { DeepNotReadonly, NotReadonly } from '../types';
import type { NotUndefined } from '../types/common';

export function anify<T>(value?: unknown) {
  return value as T;
}

const identity = <const T>(value: T) => value;

const buildObject = <T extends object>(value: T) => identity(value);

const array = <T extends any[]>(...args: T) => anify<T[number][]>(args);

const readonlyArray = <const T extends any[]>(...args: T) =>
  anify<ReadonlyArray<T[number]>>(args);

const tuple = <const T extends any[]>(...args: T) => anify<T>(args);

const union = <const T extends any[]>(...args: T) =>
  anify<T[number]>(args[0]);

const notUndefined = <T>(value: T) => {
  return anify<NotUndefined<T>>(value);
};

const notReadOnly = <const T extends object>(value: T) =>
  anify<NotReadonly<T>>(value);

const deepNotReadOnly = <const T extends object>(value: T) =>
  anify<DeepNotReadonly<T>>(value);

const deepReadonly = <const T>(value: T) => value;

export const typings = {
  /**
   * value is undefined, type is string
   */
  string: anify<string>(),
  /**
   * value is undefined, type is number
   */
  number: anify<number>(),
  /**
   * value is undefined, type is Date
   */
  date: anify<Date>(),
  /**
   * value is undefined, type is boolean
   */
  boolean: anify<boolean>(),
  /**
   * value and type are undefined
   */
  undefined,
  /**
   * value is undefined, type is null
   */
  null: anify<null>(),
  /**
   * value is undefined, type is symbol
   */
  symbol: anify<symbol>(),
  /**
   * value is undefined, type is bigint
   */
  bigint: anify<bigint>(),
  /**
   * value is undefined, type is object
   */
  object: anify<object>(),
  /**
   * Undefined, not callable, type is Function
   *
   * Type : *(...args: any) => any*
   */
  function: anify<(...args: any) => any>(),
  /**
   * return the same value with the same type
   */
  identity,
  /**
   * return the value with a choosen type,
   *
   * Otherwise, the type is ***unknown***
   */
  anify,
  /**
   * Function to build object
   */
  buildObject,
  /**
   * Build union type by spread params
   */
  union,
  /**
   * Build array type by spread params
   */
  array,
  readonlyArray,
  tuple,
  notUndefined,
  readonly: <const T extends object>(value: T) =>
    anify<Readonly<DeepNotReadonly<T>>>(value),
  deepReadonly,
  notReadOnly,
  deepNotReadOnly,
};

export const t = typings;
