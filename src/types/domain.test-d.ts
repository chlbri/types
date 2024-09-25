import { Domain } from './domain';

const useCase1 = {
  call: (arg1: number, arg2: number) => arg1 + arg2,
  __name: 'useCase1',
} as const;
const useCase2 = {
  call: (arg1: boolean, arg2: boolean) => arg1 && arg2,
  __name: 'useCase2',
} as const;

/**
 * Add definition of variable just for linting
 */
const domain: Domain<[typeof useCase1, typeof useCase2]> = {
  useCase1,
  useCase2,
} as any;

expectTypeOf<{
  useCase1: (arg1: number, arg2: number) => number;
  useCase2: (arg1: boolean, arg2: boolean) => boolean;
}>(domain);
