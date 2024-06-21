export const eq = (value: unknown, ...arr: any[]) =>
  arr.some(val => val === value);
