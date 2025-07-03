import { Neverify } from './objects.types';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { _unknown } from 'functions/commons';
import type { Defaulted, Keys, Primitive } from './common.types';
import type {
  DeepPartial,
  DeepReadonly,
  DeepRequired,
} from './objects.types';

type FnReturn<T = any, Tr extends object = object> = {
  (_?: T): T;
  forceCast(_?: unknown): T;
  type: T;
  dynamic<U extends T>(_: U): U;
  is<U>(_?: U): U extends T ? true : false;
} & Tr;

export const typeFn = <T = any, Tr extends object = object>(
  extensions?: Tr,
): FnReturn<T, Tr> => {
  const out: any = (_?: T) => _unknown<T>();

  out.forceCast = (_?: unknown) => _unknown<T>();

  out.type = undefined as T;

  out.dynamic = <U extends T>(_: U) => _unknown<U>();

  out.is = <U>(_?: U) => _unknown<U extends T ? true : false>();

  if (extensions) {
    Object.assign(out, extensions);
  }

  return out;
};

const extract = <T, U extends any[]>(_: T, ...__: U) =>
  _unknown<Extract<T, U[number]>>();
extract.strict = <T, U extends T[]>(_: T, ...__: U) =>
  _unknown<Extract<T, U[number]>>();
extract.const = <const T, const U extends T[]>(_: T, ...__: U) =>
  _unknown<Extract<T, U[number]>>();

const exclude = <T, U extends any[]>(_: T, ...__: U) =>
  _unknown<Exclude<T, U[number]>>();
exclude.strict = <T, U extends T[]>(_: T, ...__: U) =>
  _unknown<Exclude<T, U[number]>>();
exclude.const = <const T, const U extends T[]>(_: T, ...__: U) =>
  _unknown<Exclude<T, U[number]>>();

const required = <T extends object>(_: T) => _unknown<Required<T>>();

required.deep = <T extends object>(_: T) => _unknown<DeepRequired<T>>();

const _readonly = <T extends object>(_: T) => _unknown<Readonly<T>>();

_readonly.const = <const T extends object>(_: T) =>
  _unknown<Readonly<T>>();

const readonlyDeep = <T extends object>(_: T) =>
  _unknown<DeepReadonly<T>>();

readonlyDeep.const = <const T extends object>(_: T) =>
  _unknown<DeepReadonly<T>>();

_readonly.deep = readonlyDeep;

const partial = <T extends object>(_: T) => _unknown<Partial<T>>();
partial.deep = <T extends object>(_: T) => _unknown<DeepPartial<T>>();

export const commons = <T>(_?: unknown) => _unknown<T>();

commons.extract = extract;
commons.exclude = exclude;
commons.required = required;
commons.partial = partial;

commons.union = <const T extends any[]>(..._: T) => _unknown<T[number]>();

commons.date = typeFn<Date>();
commons.null = typeFn<null>();
commons.symbol = typeFn<symbol>();
commons.bigint = typeFn<bigint>();
commons.never = _unknown<never>();
commons.undefined = _unknown<undefined>();

commons.function = <T extends any[], R = any>(..._: [...T, R]) =>
  _unknown<(...args: T) => R>();

commons.unknown = _unknown;

commons.any = typeFn();

commons.primitive = typeFn<Primitive>();

commons.undefiny = <T>(_?: T) => _unknown<T | undefined>();

commons.identity = <T>(_?: T) => _unknown<T>();

commons.keys = typeFn<Keys>();

commons.keysOf = <T extends object>(_?: T) => _unknown<keyof T>();

commons.default = <const T, U extends NonNullable<T>>(_: T, __: U) =>
  _unknown<Defaulted<T, U>>();

commons.neverify = <T>(_?: T) => _unknown<Neverify<T>>();
