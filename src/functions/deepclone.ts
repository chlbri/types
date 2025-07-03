import type { PrimitiveObject } from 'types';

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
export default function deepClone<
  I extends PrimitiveObject,
  F extends FormatKey<I> = FormatKey<I>,
  O extends PrimitiveObject = I,
>(value: I, formatKey?: F, refs = new Map<I, O>()): O {
  const ref = refs.get(value);
  if (typeof ref !== 'undefined') return ref;

  if (Array.isArray(value)) {
    const clone: any = [];
    refs.set(value, clone);

    for (let i = 0; i < value.length; i++) {
      clone[i] = deepClone(value[i], formatKey, refs as any);
    }

    return clone as O;
  }

  if (!(value instanceof Object)) return value as unknown as O;

  const clone: Record<string, PrimitiveObject> = {};
  refs.set(value, clone as O);
  const keys = Object.keys(value);

  for (let i = 0; i < keys.length; i++) {
    const checkF = typeof formatKey === 'function';
    const key = checkF ? formatKey(keys[i] as any) : keys[i];
    clone[key] = deepClone((value as any)[keys[i]], formatKey, refs);
  }

  if (Object.isFrozen(value)) {
    Object.freeze(clone);
  }

  if (Object.isSealed(value)) {
    Object.seal(clone);
  }

  return clone as O;
}

function formatKeys<F extends FormatKey>(format: F) {
  return <I extends PrimitiveObject, O extends PrimitiveObject = I>(
    value: I,
  ) => deepClone<I, F, O>(value, format);
}

/**
 * Creates a deep clone of an object or array, formatting its keys using the provided function.
 *
 *
 * @param format of type {@linkcode FormatKey} The function to format the keys of the cloned object.
 *
 * Inspired by the `deep-clone` npm {@link https://www.npmjs.com/package/deep-clone|library},
 * @see the {@link https://github.com/thebearingedge/deep-clone/blob/main/src/deep-clone.ts|implementation} for more details.
 *
 * @see {@linkcode formatKeys} for more details.
 */
deepClone.formatKeys = formatKeys;
