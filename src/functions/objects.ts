import type {
  AllowedNamesLow,
  DeepNotReadonly,
  DeepOmit,
  DeepReadonly,
  DeepRequired,
  Keys,
  NotReadonly,
  Primitive2,
  PrimitiveObject,
  PrimitiveObjectMap,
  SubType,
} from 'types';
import { partialCall } from '../utils';
import { castFn, castFnbasic, commons } from './commons';
import deepClone from './deepclone';

// #region Helpers
function isPlainObject(value: any): value is object {
  return (
    Object.prototype.toString.call(value) == '[object Object]' &&
    value.constructor &&
    value.constructor.name == 'Object'
  );
}

export const isPrimitiveObject = (
  object: any,
): object is PrimitiveObject => {
  const isObject = isPlainObject(object);
  if (isObject) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = (object as any)[key];
        const isPrimitiveMap = isPrimitiveObject(element);
        if (!isPrimitiveMap) return false;
      }
    }
    return true;
  }

  const isArray = Array.isArray(object);
  if (isArray) {
    for (const item of object) {
      const isPrimitiveMap = isPrimitiveObject(item);
      if (!isPrimitiveMap) return false;
    }
    return true;
  }

  return commons.primitive.is(object);
};

const isPrimitiveObjectMap = (
  object: object,
): object is PrimitiveObjectMap => {
  return isPrimitiveObject(object);
};

const require = <T extends object, K extends keyof T>(
  object: T,
  requires: Pick<T, K>,
) => {
  return Object.assign(object, requires) as T;
};

const requireDeep = <T extends object, K extends object>(
  object: T,
  requires: K,
) => {
  Object.assign(requires, object);

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = (object as any)[key];
      if (isPlainObject(element)) {
        (object as any)[key] = requireDeep(element, requires);
      }
    }
  }

  return object as T & K;
};

const _isRequiredDeep = (object: any): object is DeepRequired<any> => {
  const isObject = isPlainObject(object);
  if (isObject) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = (object as any)[key];
        const isPrimitiveMap = _isRequiredDeep(element);
        if (!isPrimitiveMap) return false;
      }
    }
    return true;
  }

  const isArray = Array.isArray(object);
  if (isArray) {
    for (const item of object) {
      const isPrimitiveMap = _isRequiredDeep(item);
      if (!isPrimitiveMap) return false;
    }
    return true;
  }

  return commons.isDefined(object);
};

const _readonly = castFnbasic(
  <T extends object>(object: T): Readonly<T> => {
    return Object.freeze(object);
  },
  {
    forceCast: <T extends object>(object: T): Readonly<T> => {
      return Object.freeze(object);
    },

    dynamic: <U extends object>(object: U): Readonly<U> => {
      return Object.freeze(object);
    },

    is: <T>(object: T): object is Readonly<T> => {
      return Object.isFrozen(object);
    },

    const: <const T extends object>(object: T): Readonly<T> => {
      return Object.freeze(object);
    },

    not: <const T extends object>(object: T): NotReadonly<T> => {
      return object as any;
    },

    deep: castFnbasic(
      <T extends object>(object: T): DeepReadonly<T> => {
        return Object.freeze(object) as any;
      },
      {
        const: <const T extends object>(object: T): DeepReadonly<T> => {
          return Object.freeze(object) as any;
        },
        not: <const T extends object>(object: T): DeepNotReadonly<T> => {
          return object as any;
        },
      },
    ),
  },
);

const omitDeepIs = <K extends Keys[]>(object: object, ...keys: K) => {
  const check1 = keys.every(
    key => !commons.isDefined((object as any)[key]),
  );
  if (!check1) return false;

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = (object as any)[key];
      if (typeof element === 'object' && element !== null) {
        const isDeep = omitDeepIs(element, ...keys);
        if (!isDeep) return false;
      }
    }
  }
  return true;
};

const _omit = (
  by: Picker,
  object: PrimitiveObjectMap,
  ...valuesOrKeys: any[]
) => {
  const result = deepClone(object);

  const entries = Object.entries(result);
  entries.forEach(([key, value]) => {
    if (by === 'key' && valuesOrKeys.includes(key)) {
      delete result[key];
    } else if (by === 'element' && valuesOrKeys.includes(value)) {
      delete result[key];
    }
  });

  return result;
};

const __omitDeep = (
  by: Picker,
  object: PrimitiveObjectMap,
  ...valuesOrKeys: Primitive2[]
) => {
  const entries = Object.entries(object);
  const result: PrimitiveObjectMap = {};

  entries.forEach(([key, value]) => {
    const isObject = isPlainObject(value);
    if (isObject) {
      const picked = __omitDeep(
        by,
        value as PrimitiveObjectMap,
        ...valuesOrKeys,
      );
      if (Object.keys(picked).length > 0) {
        result[key] = picked;
      }
    } else if (by === 'key' && valuesOrKeys.includes(key)) {
      delete result[key];
    } else if (
      by === 'element' &&
      !!value &&
      valuesOrKeys.includes(value)
    ) {
      delete result[key];
    }
  });

  return result;
};

const _omitDeep = (
  by: Picker,
  object: PrimitiveObjectMap,
  ...valuesOrKeys: Primitive2[]
) => {
  const _result: PrimitiveObjectMap = deepClone(object);
  const result = __omitDeep(by, _result, ...valuesOrKeys);

  return result;
};

const omitDeep = castFnbasic(
  <T extends PrimitiveObjectMap, K extends Keys[]>(
    object: T,
    ...keys: K[]
  ): DeepOmit<T, K[number]> => {
    const result: any = deepClone(object);

    for (const key of keys) {
      delete result[key];
    }

    for (const key in result) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        const element = result[key];
        if (typeof element === 'object' && element !== null) {
          result[key] = omitDeep(element as any, ...keys);
        }
      }
    }
    return result;
  },
  {
    is: omitDeepIs,
  },
);

type Picker = 'element' | 'key';

const _pickDeep = (by: Picker, object: object, ...valuesOrKeys: any[]) => {
  const result: any = {};

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = (object as any)[key];
      const isObject = isPlainObject(element);

      if (isObject) {
        const picked = _pickDeep(by, element, ...valuesOrKeys);
        if (Object.keys(picked).length > 0) {
          result[key] = picked;
        }
      } else {
        const shouldPick =
          by === 'element'
            ? valuesOrKeys.includes(element)
            : valuesOrKeys.includes(key);
        if (shouldPick) result[key] = element;
      }
    }
  }

  return result;
};

const _pick = (by: Picker, object: object, ...keys: any[]) => {
  const result: any = {};
  for (const key of keys) {
    const shouldPick =
      by === 'element'
        ? keys.includes((object as any)[key])
        : keys.includes(key);
    if (shouldPick) {
      result[key] = (object as any)[key];
    }
  }
  return result;
};

// #endregion

export const objects = castFn<object>()({
  is: isPlainObject,

  type: Object,

  keys: <T extends object>(object: T): (keyof T)[] => {
    return Object.keys(object) as any;
  },

  keysof: <T extends object>(object: T): (keyof T)[] => {
    return Object.keys(object) as any;
  },

  values: <T extends object>(object: T): T[keyof T][] => {
    return Object.values(object) as any;
  },
  entries: <T extends object>(object: T): [keyof T, T[keyof T]][] => {
    return Object.entries(object) as any;
  },

  byKey: <T extends object, K extends keyof T>(
    object: T,
    key: K,
  ): T[K] => {
    return object[key];
  },

  hasKeys: <T extends object, K extends (keyof T)[]>(
    object: T,
    ...keys: K
  ): K[number] extends keyof T ? true : false => {
    return keys.every(key => key in object) as any;
  },

  hasAllKeys: <T extends object, K extends (keyof T)[]>(
    object: T,
    ...keys: K
  ): keyof T extends K[number] ? true : false => {
    return Object.keys(object).every((key: any) =>
      keys.includes(key),
    ) as any;
  },

  omit: castFnbasic(
    partialCall(_omit, 'key') as <
      T extends PrimitiveObjectMap,
      K extends any[],
    >(
      object: T,
      ...keys: K
    ) => Omit<T, K[number]>,

    {
      strict: <T extends PrimitiveObjectMap, K extends (keyof T)[]>(
        object: T,
        ...keys: K
      ): Omit<T, K[number]> => {
        const result = deepClone(object);

        for (const key of keys) {
          if (key in result) {
            delete result[key];
          }
        }

        return result;
      },

      is: <T extends object, K extends (keyof T)[]>(
        object: T,
        ...keys: K
      ) => {
        return keys.every(key => !commons.isDefined(object[key]));
      },

      by: partialCall(_omit, 'element') as <
        T extends PrimitiveObjectMap,
        K extends any[],
      >(
        object: T,
        ...values: K
      ) => SubType<T, K[number]>,

      deep: castFnbasic(
        partialCall(_omitDeep, 'key') as <
          T extends PrimitiveObjectMap,
          K extends Keys[],
        >(
          object: T,
          ...keys: K[]
        ) => DeepOmit<T, K[number]>,
        {
          by: partialCall(_omitDeep, 'element') as <
            T extends PrimitiveObjectMap,
            K extends Keys[],
          >(
            object: T,
            ...values: K[]
          ) => SubType<T, K[number]>,
          is: omitDeepIs,
        },
      ),
    },
  ),

  reverse: <T extends Record<Keys, Keys>>(
    object: T,
  ): { [K in keyof T as T[K]]: K } => {
    const result: any = {};
    for (const key in object) {
      result[object[key]] = key;
    }
    return result;
  },

  readonly: _readonly,

  freeze: _readonly,

  require: castFnbasic(require, {
    clone: <
      T extends PrimitiveObject,
      K extends AllowedNamesLow<T, undefined>,
    >(
      object: T,
      requires: Pick<T, K>,
    ): T => {
      return require(deepClone(object) as any, requires);
    },

    strict: <T extends object, K extends AllowedNamesLow<T, undefined>>(
      object: T,
      requires: Pick<T, K>,
    ) => require(object, requires),

    const: <
      const T extends object,
      K extends AllowedNamesLow<T, undefined>,
    >(
      object: T,
      requires: Pick<T, K>,
    ) => require(object, requires),

    is: <T extends object>(object: T): object is Required<T> => {
      const values = Object.values(object);
      return values.every(value => value !== undefined && value !== null);
    },

    deep: castFnbasic(requireDeep, {
      clone: <T extends PrimitiveObject, K extends object>(
        object: T,
        requires: K,
      ) => {
        return requireDeep(deepClone(object) as any, requires);
      },

      const: <const T extends object, K extends object>(
        object: T,
        requires: K,
      ) => {
        return requireDeep(object, requires);
      },

      is: _isRequiredDeep,
    }),
  }),

  pick: castFnbasic(
    partialCall(_pick, 'key') as <T extends object, K extends any[]>(
      object: T,
      ...keys: K
    ) => Pick<T, K[number]>,
    {
      deep: castFnbasic(partialCall(_pickDeep, 'key'), {
        by: partialCall(_pickDeep, 'element'),
      }),

      by: partialCall(_pick, 'element') as <
        T extends object,
        K extends any[],
      >(
        object: T,
        ...keys: K
      ) => SubType<T, K[number]>,
    },
  ),

  primitive: castFn<PrimitiveObject>()({
    is: isPrimitiveObject,

    clone: <T extends PrimitiveObject>(object: T): T => {
      return deepClone(object);
    },
  }),

  primitiveMap: castFn<PrimitiveObjectMap>()({
    is: isPrimitiveObjectMap,

    clone: <T extends PrimitiveObjectMap>(object: T): T => {
      return deepClone(object);
    },
  }),
});
