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

export const _unknown = <T>(value?: unknown) => value as T;
export const _any = <T = any>(value?: unknown) => value as T;

const identity = <T>(value: T) => value;

const buildObject = <T extends object>(value: T) => identity(value);

const array = <T extends any[]>(...args: T) => _unknown<T[number][]>(args);

const readonlyArray = <const T extends any[]>(...args: T) =>
  _unknown<ReadonlyArray<T[number]>>(args);

const tuple = <const T extends any[]>(...args: T) => _unknown<T>(args);

const union = <const T extends any[]>(...args: T) =>
  _unknown<T[number]>(args[0]);

const partial = <T>(value: T) => {
  return _unknown<Undefiny<T>>(value);
};

const deepPartial = <T>(value: T) => {
  return _unknown<DeepPartial<T>>(value);
};

const notUndefined = <T>(value?: T) => {
  return _unknown<NotUndefined<T>>(value);
};

const deepNotUndefined = <T extends object | undefined>(value: T) => {
  return _unknown<DeepNotUndefined<T>>(value);
};

const _readonly = <const T>(value: T) => value;

const notReadOnly = <const T extends object>(value: T) =>
  _unknown<NotReadonly<T>>(value);

const _never = _unknown<never>();

const neverify = <T extends object>(value: T) => {
  return _unknown<Neverify<T>>(value);
};

const _string = _unknown<string>();

const _number = _unknown<number>();

const _date = _unknown<Date>();

const _boolean = _unknown<boolean>();

const _null = _unknown<null>();

const _symbol = _unknown<symbol>();

const _bigint = _unknown<bigint>();

const _object = _unknown<object>();

const _function = _unknown<(...args: any[]) => any>();

const rn = _unknown<Rn>();

const ru = _unknown<Ru>();

const ra = _unknown<Ra>();

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
  unknown: _unknown,
  /**
   * return the value with a choosen type,
   *
   * Otherwise, the type is ***any***
   */
  any: _any,
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
