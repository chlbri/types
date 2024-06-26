import type {
  DeepNotUndefined,
  DeepPartial,
  Neverify,
  NotReadonly,
  NotUndefined,
  Ra,
  Rn,
  Ru,
  Undefiny,
} from '../types';

export function anify<T>(value?: unknown) {
  return value as T;
}

const identity = <T>(value: T) => value;

const buildObject = <T extends object>(value: T) => identity(value);

const array = <T extends any[]>(...args: T) => anify<T[number][]>(args);

const readonlyArray = <const T extends any[]>(...args: T) =>
  anify<ReadonlyArray<T[number]>>(args);

const tuple = <const T extends any[]>(...args: T) => anify<T>(args);

const union = <const T extends any[]>(...args: T) =>
  anify<T[number]>(args[0]);

const partial = <T>(value: T) => {
  return anify<Undefiny<T>>(value);
};

const deepPartial = <T>(value: T) => {
  return anify<DeepPartial<T>>(value);
};

const notUndefined = <T>(value?: T) => {
  return anify<NotUndefined<T>>(value);
};

const deepNotUndefined = <T extends object | undefined>(value: T) => {
  return anify<DeepNotUndefined<T>>(value);
};

const _readonly = <const T>(value: T) => value;

const notReadOnly = <const T extends object>(value: T) =>
  anify<NotReadonly<T>>(value);

const _never = anify<never>();

const neverify = <T extends object>(value: T) => {
  return anify<Neverify<T>>(value);
};

const _string = anify<string>();

const _number = anify<number>();

const _date = anify<Date>();

const _boolean = anify<boolean>();

const _null = anify<null>();

const _symbol = anify<symbol>();

const _bigint = anify<bigint>();

const _object = anify<object>();

const _function = anify<(...args: any[]) => any>();

const rn = anify<Rn>();

const ru = anify<Ru>();

const ra = anify<Ra>();

export const typings = {
  /**
   * value is undefined, type is string
   */
  string: _string,
  /**
   * value is undefined, type is number
   */
  number: _number,
  /**
   * value is undefined, type is Date
   */
  date: _date,
  /**
   * value is undefined, type is boolean
   */
  boolean: _boolean,
  /**
   * value is undefined, type is boolean
   */
  never: _never,
  /**
   * value and type are undefined
   */
  undefined,
  /**
   * value is undefined, type is null
   */
  null: _null,
  /*
   * value is undefined, type is symbol
   */
  symbol: _symbol,
  /**
   * value is undefined, type is bigint
   */
  bigint: _bigint,
  /**
   * value is undefined, type is object
   */
  object: _object,
  /**
   * Undefined, not callable, type is Function
   *
   * Type : *(...args: any) => any*
   */
  rn,
  ru,
  ra,
  function: _function,
  /**
   * value and type are undefined|T
   */
  partial,
  /**
   * value and type are DeepPartial<T>
   */
  deepPartial,
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
  neverify,
  readonlyArray,
  tuple,
  notUndefined,
  deepNotUndefined,
  dnu: deepNotUndefined,
  readonly: _readonly,
  notReadOnly,
};

export const t = typings;
