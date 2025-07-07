import type { PrimitiveObject } from '../types/types';

export type FormatKey<T = any> = (key: Extract<keyof T, string>) => string;

/**
 * Creates a deep clone of an object or array, preserving its structure and values.
 *
 *
 * @param value of type {@linkcode PrimitiveObject} The value to deep clone, which can be an object, array, or primitive.
 * @param formatKey A function to format the keys of the cloned object. If not provided, keys will remain unchanged.
 * @param refs A map to keep track of already cloned objects to handle circular references.
 * This is used to prevent infinite loops when cloning objects that reference each other.
 * @returns A deep clone of the input value, preserving the structure and values of the original object or array.
 *
 * Inspired by the `deep-clone` npm {@link https://www.npmjs.com/package/deep-clone|library},
 * @see the {@link https://github.com/thebearingedge/deep-clone/blob/main/src/deep-clone.ts|implementation} for more details.
 */
export default function deepClone<I extends PrimitiveObject>(
  value: I,
  refs = new Map<I, I>(),
): I {
  const ref = refs.get(value);
  if (typeof ref !== 'undefined') return ref;

  if (Array.isArray(value)) {
    const clone: any = [];
    refs.set(value, clone);

    for (let i = 0; i < value.length; i++) {
      clone[i] = deepClone(value[i], refs as any);
    }

    return clone as I;
  }

  if (!(value instanceof Object)) return value as unknown as I;

  const clone: Record<string, PrimitiveObject> = {};
  refs.set(value, clone as I);
  const keys = Object.keys(value);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    clone[key] = deepClone((value as any)[keys[i]], refs);
  }

  if (Object.isFrozen(value)) {
    Object.freeze(clone);
  }

  if (Object.isSealed(value)) {
    Object.seal(clone);
  }

  return clone as I;
}
