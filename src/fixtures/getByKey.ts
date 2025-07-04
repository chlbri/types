import { decompose } from '@bemedev/decompose';
import type { Fn } from 'types';

export const getByKey = (obj: any, key: string) => {
  const func = decompose as unknown as Fn;
  const decomposed = func(obj);
  return decomposed[key];
};
