import type {
  DeepNotReadonly,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  Neverify,
  NotReadonly,
  NotUndefined,
  Primitive,
} from '../types';

type FnReturn<T = any, Tr extends object = object> = {
  (arg: T): T;
  forceCast(arg: unknown): T;
  dynamic<U extends T>(arg: U): U;
} & Tr;

export const castFn = <T = any, Tr extends object = object>(
  extensions?: Tr,
): FnReturn<T, Tr> => {
  const out: any = (arg: T) => arg as T;

  out.forceCast = (arg: unknown) => arg as T;

  out.dynamic = <U extends T>(arg: U) => arg;

  if (extensions) {
    Object.assign(out, extensions);
  }

  return out;
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
readonlyNot.notDeep = <const T extends object>(value: T) =>
  _unknown<DeepNotReadonly<T>>(value);

_readonly.not = readonlyNot;

const neverify = <T>(value: T) => {
  return _unknown<Neverify<T>>(value);
};

export const commons = <T>(value: unknown) => value as T;
commons.partial = partial;
commons.identity = identity;
commons.unknown = <T>(value: unknown) => value as T;
commons.any = castFn();
commons.neverify = neverify;
commons.required = required;
commons.readonly = _readonly;
commons.primitive = castFn<Primitive>({
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
commons.undefined = identity(undefined);
commons.null = identity(null);
commons.symbol = castFn<symbol>({
  is: (value: unknown): value is symbol => {
    return typeof value === 'symbol';
  },
});
commons.date = castFn<Date>({
  is: (value: unknown): value is Date => {
    return value instanceof Date;
  },
});

commons.undefiny = <T>(value?: T) => value;
