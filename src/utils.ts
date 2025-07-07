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
