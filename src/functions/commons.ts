import type {
  DeepNotReadonly,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  Fn,
  Neverify,
  NotReadonly,
  NotUndefined,
  Primitive,
  PrimitiveObject,
} from '../types';
import { isPlainObject } from '../utils';

type FnReturnBasic<Main extends Fn, Tr extends object> = Tr & Main;

type FnReturn<T, Tr extends object> = Tr & {
  (arg: T): T;
  forceCast(arg: unknown): T;
  dynamic<U extends T>(arg: U): U;
};

export const castFnBasic = <
  Main extends Fn,
  const Tr extends object = object,
>(
  main: Main,
  extensions?: Tr,
): FnReturnBasic<Main, Tr> => {
  const out: any = main;

  if (extensions) {
    Object.assign(out, extensions);
  }

  return out;
};

const _isPrimitiveObject = (object: any): object is PrimitiveObject => {
  const isObject = isPlainObject(object);
  if (isObject) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = (object as any)[key];
        const isPrimitiveMap = _isPrimitiveObject(element);
        if (!isPrimitiveMap) return false;
      }
    }
    return true;
  }

  const isArray = Array.isArray(object);
  if (isArray) {
    for (const item of object) {
      const isPrimitiveMap = _isPrimitiveObject(item);
      if (!isPrimitiveMap) return false;
    }
    return true;
  }

  return commons.primitive.is(object);
};

export const castFn = <T = any>() => {
  const _out = <const Tr extends object = object>(
    extensions?: Tr,
  ): FnReturn<T, Tr> => {
    const out: any = castFnBasic((arg: T) => arg as T, {
      ...extensions,
      forceCast: (arg: unknown) => {
        return arg as T;
      },
      dynamic: <U extends T>(arg: U) => {
        return arg;
      },
    });
    return out;
  };
  return _out;
};

export const _unknown = <T>(value?: unknown) => value as T;

export const identity = <T>(value: T) => value;

const partial = <T>(value: T) => {
  return _unknown<Partial<T>>(value);
};

partial.deep = <T>(value: T) => {
  return _unknown<DeepPartial<T>>(value);
};

const required = <T>(value: T) => {
  return _unknown<NotUndefined<T>>(value);
};
required.deep = <T extends object | undefined>(value: T) => {
  return _unknown<DeepRequired<T>>(value);
};

const _readonly = <T>(value: T) => value as Readonly<T>;
_readonly.const = <const T extends object>(value: T) => _unknown<T>(value);
const readonlyDeep = <T extends object>(value: T) =>
  _unknown<DeepReadonly<T>>(value);
readonlyDeep.const = <const T extends object>(value: T) =>
  _unknown<DeepReadonly<T>>(value);

_readonly.deep = readonlyDeep;

const readonlyNot = <T extends object>(value: T) =>
  _unknown<NotReadonly<T>>(value);

readonlyNot.const = <const T extends object>(value: T) =>
  readonlyNot(value);
readonlyNot.deep = <const T extends object>(value: T) =>
  _unknown<DeepNotReadonly<T>>(value);

_readonly.not = readonlyNot;

export const commons = <T>(value: unknown) => value as T;
commons.partial = partial;
commons.identity = identity;
commons.isDefined = <T>(value: T): value is NonNullable<T> => {
  return value !== undefined && value !== null;
};
commons.isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};

commons.isNull = (value: unknown): value is null => {
  return value === null;
};
commons.unknown = <T>(value: unknown) => value as T;
commons.any = castFn()();
commons.neverify = <T>(value: T) => {
  return _unknown<Neverify<T>>(value);
};
commons.required = required;
commons.readonly = _readonly;
commons.primitive = castFn<Primitive>()({
  is: (value: unknown): value is Primitive => {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null ||
      value === undefined
    );
  },
});
commons.primitiveObject = castFn<PrimitiveObject>()({
  is: _isPrimitiveObject,
});
commons.undefined = identity(undefined);
commons.null = identity(null);
commons.symbol = castFn<symbol>()({
  is: (value: unknown): value is symbol => typeof value === 'symbol',
});
commons.date = castFn<Date>()({
  is: (value: unknown): value is Date => {
    return value instanceof Date;
  },
} as const);

commons.undefiny = <T>(value?: T) => value;
