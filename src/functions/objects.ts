import type { NOmit } from 'types';

export const deepCopy = <T extends object>(object: T): T => {
  return JSON.parse(JSON.stringify(object));
};

export const omit = <T extends object, K extends keyof T>(
  object: T,
  ...keys: K[]
): NOmit<T, K> => {
  const result = { ...object };
  for (const key of keys) {
    delete result[key];
  }
  return result;
};
