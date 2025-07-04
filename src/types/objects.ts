/* eslint-disable @typescript-eslint/no-unused-vars */
import { _unknown } from '../functions/commons';
import { typeFn } from './common';
import type {
  Keys,
  PrimitiveObject,
  PrimitiveObjectMap,
} from './common.types';
import type {
  AllowedNames,
  DeepNotReadonly,
  DeepOmit,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  NotAllowedNames,
  NotReadonly,
  NotSubType,
  Ra,
  Rn,
  Ru,
  SubType,
} from './objects.types';

export const objects = <T extends object>(_?: T) => _unknown<T>();

objects.forceCast = <T extends object>(_?: unknown) => _unknown<T>();
objects.is = <T>(_?: T) => _unknown<T extends object ? true : false>();

objects.type = _unknown<object>();
objects.keysOf = <T extends object>(_?: T) => _unknown<(keyof T)[]>();
objects.values = <T extends object>(_?: T) => _unknown<T[keyof T][]>();
objects.entries = <T extends object>(_?: T) =>
  _unknown<[keyof T, T[keyof T]][]>();
objects.byKey = <T extends object, K extends keyof T>(_?: T, __?: K) =>
  _unknown<T[K]>();
objects.hasKeys = <T extends object, K extends Keys[]>(_?: T, ...__: K) =>
  _unknown<K[number] extends keyof T ? true : false>();
objects.hasAllKeys = <T extends object, K extends Keys[]>(
  _?: T,
  ...__: K
) => _unknown<keyof T extends K[number] ? true : false>();

const omit = <T extends PrimitiveObjectMap, K extends Keys[]>(
  _?: T,
  ...__: K
) => _unknown<Omit<T, K[number]>>();

omit.strict = <T extends PrimitiveObjectMap, K extends (keyof T)[]>(
  _?: T,
  ...__: K
) => _unknown<Omit<T, K[number]>>();

omit.deep = <T extends PrimitiveObjectMap, K extends Keys[]>(
  _?: T,
  ...__: K
) => _unknown<DeepOmit<T, K[number]>>();

objects.omit = omit;
objects.reverse = <T extends Record<Keys, Keys>>(_?: T) =>
  _unknown<{
    [K in keyof T as T[K]]: K;
  }>();

const _readonly = <T extends object>(_?: T) => _unknown<Readonly<T>>();
_readonly.const = <const T extends object>(_?: T) =>
  _unknown<Readonly<T>>();

_readonly.not = <const T extends object>(_?: T) =>
  _unknown<NotReadonly<T>>();

const _readonlyDeep = <T extends object>(_?: T) =>
  _unknown<DeepReadonly<T>>();

_readonlyDeep.const = <const T extends object>(_?: T) =>
  _unknown<DeepReadonly<T>>();

_readonlyDeep.not = <const T extends object>(_?: T) =>
  _unknown<DeepNotReadonly<T>>();

_readonly.deep = _readonlyDeep;

objects.readonly = _readonly;

const required = <T extends object>(_: T) => _unknown<Required<T>>();
required.deep = <T extends object>(_: T) => _unknown<DeepRequired<T>>();

objects.required = required;

const partial = <T extends object>(_: T) => _unknown<Partial<T>>();
partial.deep = <T extends object>(_: T) => _unknown<DeepPartial<T>>();

objects.partial = partial;

objects.pick = <T extends object, K extends (keyof T)[]>(_: T, ...__: K) =>
  _unknown<Pick<T, K[number]>>();

const pickBy = <T extends object, K>(_?: T, __?: K) =>
  _unknown<SubType<T, K>>();

pickBy.keys = <T extends object, K>(_: T, __?: K) =>
  _unknown<AllowedNames<T, K>>();

objects.pickBy = pickBy;

const omitBy = <T extends object, K>(_?: T, __?: K) =>
  _unknown<NotSubType<T, K>>();

omitBy.keys = <T extends object, K>(_: T, __?: K) =>
  _unknown<NotAllowedNames<T, K>>();

objects.omitBy = omitBy;

objects.ru = typeFn<Ru>();
objects.rn = typeFn<Rn>();
objects.ra = typeFn<Ra>();

objects.primitive = typeFn<PrimitiveObject>();
