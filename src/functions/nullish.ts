export function isNullish(val: unknown): val is undefined | null {
  return val === null || val === undefined;
}
