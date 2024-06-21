import type { NotUndefined } from '../types/common';

export function anify<T>(value?: unknown) {
  return value as T;
}

const identity = <T>(value: T) => value;

const _object = <T extends object>(value: T) => identity(value);

const readonlyObject = <const T extends object>(_rest: T) => {
  return _object(_rest);
};

const array = <T extends any[]>(...args: T) => anify<T[number][]>(args);

const readonlyArray = <const T extends any[]>(...args: T) =>
  anify<ReadonlyArray<T[number]>>(args);

const tuple = <const T extends any[]>(...args: T) => anify<T>(args);

const union = <const T extends any[]>(...args: T) =>
  anify<T[number]>(args[0]);

const notUndefined = <T>(value: T) => {
  return anify<NotUndefined<T>>(value);
};

export const typings = {
  identity,
  anify,
  object: _object,
  readonlyObject,
  union,
  array,
  readonlyArray,
  tuple,
  string: anify<string>(),
  number: anify<number>(),
  date: anify<Date>(),
  boolean: anify<boolean>(),
  undefined,
  null: anify<null>(),
  symbol: anify<symbol>(),
  bigint: anify<bigint>(),
  function: anify<(...args: any) => any>(),
  notUndefined,
};

export const t = typings;
