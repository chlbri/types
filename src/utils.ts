import type { Fn } from 'types';

export type ArrayR = readonly any[] | any[];

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
