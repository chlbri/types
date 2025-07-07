import { isPlainObject } from '~utils';
import type {
  Checker,
  DeepNotReadonly,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  Defaulted,
  Fn,
  FnBasic,
  Neverify,
  NonN,
  NotReadonly,
  NotUndefined,
  Primitive,
  PrimitiveObject,
} from '../types/types';
import deepClone from './deepclone';

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
): FnBasic<Main, Tr> => {
  const out: any = main;

  if (extensions) {
    Object.assign(out, extensions);
  }

  return out;
};

export const castFn = <T>() => {
  const _out = <const Tr extends object = object>(
    extensions?: Tr,
  ): FnReturn<T, Tr> => {
    const out: any = castFnBasic((arg: T) => arg, {
      ...extensions,
      forceCast: (arg: unknown) => {
        return _unknown<T>(arg);
      },
      dynamic: <U extends T>(arg: U) => {
        return arg;
      },
    });
    return out;
  };
  return _out;
};

// #region Helpers

const _isPrimitive = (value: unknown): value is Primitive => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null ||
    value === undefined
  );
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

  return _isPrimitive(object);
};

const _identity = <T>(value: T) => value;

const _partial = <T>(value: T) => {
  return _unknown<Partial<T>>(value);
};

const _required = <T>(value: T) => {
  return _unknown<NotUndefined<T>>(value);
};

const _function = <T extends any[], R = any>(fn: Fn<T, R>) => fn;

// #endregion

export const _unknown = <T>(value?: unknown) => value as T;

export const commons = castFnBasic(<T>(value: unknown) => value as T, {
  partial: castFnBasic(_partial, {
    deep: <T>(value: T) => {
      return _unknown<DeepPartial<T>>(value);
    },
  }),

  const: <const T>(value: T) => value,

  clone: <T extends PrimitiveObject>(object: T): T => {
    return deepClone(object);
  },

  identity: _identity,

  isDefined: <T>(value: T): value is NonNullable<T> => {
    return value !== undefined && value !== null;
  },

  isUndefined: (value: unknown): value is undefined => {
    return value === undefined;
  },

  isNull: (value: unknown): value is null => {
    return value === null;
  },

  unknown: <T>(value: unknown) => value as T,

  any: castFn<any>()(),

  neverify: <T>(value: T) => {
    return _unknown<Neverify<T>>(value);
  },

  required: castFnBasic(_required, {
    deep: <T extends object | undefined>(value: T) => {
      return _unknown<DeepRequired<T>>(value);
    },
  }),

  readonly: castFnBasic(<T>(value: T) => value as Readonly<T>, {
    deep: castFnBasic(
      <T extends object>(value: T) => _unknown<DeepReadonly<T>>(value),
      {
        not: <const T extends object>(value: T) =>
          _unknown<DeepNotReadonly<T>>(value),
      },
    ),

    not: <T extends object>(value: T) => _unknown<NotReadonly<T>>(value),
  }),

  primitive: castFn<Primitive>()({
    is: _isPrimitive,
  }),

  primitiveObject: castFn<PrimitiveObject>()({
    is: _isPrimitiveObject,
  }),

  function: castFnBasic(_function, {
    is: castFnBasic(
      (value: unknown): value is Fn => {
        return typeof value === 'function';
      },
      {
        strict: <T extends any[] = any[], R = any>(
          fn: Checker<Fn<T, R>>,
        ) => {
          return (value: unknown): value is Fn<T, R> =>
            typeof value === 'function' && fn(value);
        },
      },
    ),

    forceCast: <T extends any[], R = any>(value: unknown) => {
      return _unknown<Fn<T, R>>(value);
    },

    dynamic: <T extends any[], R = any>(value: Fn<T, R>) => value,

    checker: castFn<Checker>()({
      /**
       * Very low
       * Checks if value is a function with one argument
       * @param value value to check
       * @returns true if value is a function with one argument
       */
      is: (value: unknown): value is Checker => {
        return (
          typeof value === 'function' &&
          value.length === 1 &&
          !/^\s*class\s+/.test(value.toString())
        );
      },
    }),
  }),

  undefined: _identity(undefined),

  null: _identity(null),

  symbol: castFn<symbol>()({
    is: (value: unknown): value is symbol => typeof value === 'symbol',
  }),

  date: castFn<Date>()({
    is: (value: unknown): value is Date => {
      return value instanceof Date;
    },
  } as const),

  undefiny: <T>(value?: T) => value,

  defaulted: <T, const U extends NonN<T>>(value: T, defaultValue: U) => {
    const out =
      value === undefined || value === null ? defaultValue : value;
    return _unknown<Defaulted<T, U>>(out);
  },
});
