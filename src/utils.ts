import type { Fn } from 'types';

export type ArrayR = readonly any[] | any[];

export type Checker<T = any> =
  | ((value: unknown) => value is T)
  | ((value: unknown) => boolean);

export type FnBasic<Main extends Fn, Tr extends object> = Tr & Main;

type PartialCall_F = <
  T extends ArrayR = ArrayR,
  U extends ArrayR = ArrayR,
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
