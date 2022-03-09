import { IUseCase } from './usecases';

export type Domain<T extends readonly IUseCase[]> = T['length'] extends 0
  ? unknown
  : T extends [infer U1, ...infer D]
  ? D extends readonly IUseCase[]
    ? U1 extends IUseCase
      ? { [key in U1['__name']]: U1['call'] } & Domain<D>
      : unknown
    : unknown
  : unknown;
