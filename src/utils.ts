/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AnyArray, Fn } from './types/types';

type PartialCall_F = <
  T extends AnyArray = AnyArray,
  U extends AnyArray = AnyArray,
  R = any,
>(
  f: Fn<[...T, ...U], R>,
  ...headArgs: T
) => (...tailArgs: U) => R;

export const partialCall: PartialCall_F = (f, ...headArgs) => {
  return (...tailArgs) => f(...headArgs, ...tailArgs);
};

export function isPlainObject(value: any): value is object {
  return (
    Object.prototype.toString.call(value) == '[object Object]' &&
    value.constructor &&
    value.constructor.name == 'Object'
  );
}

export const _unknown = <T>(value?: unknown) => value as T;

export type FnBasic<Main extends Fn, Tr extends object> = Tr & Main;

export const castFn = <T>() => {
  const _out = <const Tr extends object = object>(extensions?: Tr) => {
    const out = expandFn((arg: T) => arg, {
      ...(extensions as Tr),
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

export const typeFn = <T = any>() => {
  const _out = <Tr extends object = object>(extensions?: Tr) => {
    const out = expandFn((_?: T) => _unknown<T>(), {
      ...(extensions as Tr),
      forceCast: (_?: unknown) => _unknown<T>(),
      dynamic: <U extends T>(_?: U) => _unknown<U>(),
      is: <U>(_?: U) => _unknown<U extends T ? true : false>(),
      type: _unknown<T>(),
    });

    return out;
  };

  return _out;
};

export const expandFn = <
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
