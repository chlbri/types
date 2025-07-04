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
  Ra,
  Ru,
  SubType,
} from 'types';
import { partialCall } from '../utils';
import { castFn, castFnBasic, commons } from './commons';
import deepClone from './deepclone';

// #region Helpers
function isPlainObject(value: any): value is object {
  return (
    Object.prototype.toString.call(value) == '[object Object]' &&
    value.constructor &&
    value.constructor.name == 'Object'
  );
}

const require = <T extends object>(object: T, requires: object) => {
  return Object.assign(object, requires);
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

const _readonly = castFnBasic(
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

    deep: castFnBasic(
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

const _omitDeepIs = (
  by: Picker,
  object: object,
  ...valuesOrKeys: Primitive2[]
) => {
  const entries = Object.entries(object);
  for (const [key, value] of entries) {
    const isObject = isPlainObject(value);
    if (isObject) {
      const isDeep = _omitDeepIs(by, value, ...valuesOrKeys);
      if (!isDeep) return false;
    } else {
      const shouldOmit =
        by === 'element'
          ? valuesOrKeys.includes(value)
          : valuesOrKeys.includes(key);
      if (shouldOmit) return false;
    }
  }
  return true;
};

const _omitIs = (
  by: Picker,
  object: PrimitiveObjectMap,
  ...valuesOrKeys: any[]
) => {
  const entries = Object.entries(object);
  for (const [key, value] of entries) {
    const checkKey = by === 'key' && valuesOrKeys.includes(key);
    const checkElement = by === 'element' && valuesOrKeys.includes(value);
    if (checkKey) {
      return false;
    } else if (checkElement) {
      return false;
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
  ...valuesOrKeys: any[]
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

      result[key] = picked;
    } else if (by === 'key' && !valuesOrKeys.includes(key)) {
      result[key] = value;
    } else if (
      by === 'element' &&
      !!value &&
      !valuesOrKeys.includes(value)
    ) {
      result[key] = value;
    }
  });

  return result;
};

const _omitDeep = (
  by: Picker,
  object: PrimitiveObjectMap,
  ...valuesOrKeys: any[]
) => {
  const _result: PrimitiveObjectMap = deepClone(object);
  const result = __omitDeep(by, _result, ...valuesOrKeys);

  return result;
};

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
  const entries = Object.entries(object);

  entries.forEach(([key, value]) => {
    const shouldPick =
      by === 'element' ? keys.includes(value) : keys.includes(key);

    if (shouldPick) {
      result[key] = value;
    }
  });

  return result;
};

// #endregion

export const objects = castFn<object>()({
  is: isPlainObject,

  type: Object,

  keysOf: <T extends object>(object: T): (keyof T)[] => {
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

  hasKeys: <T extends object, K extends Keys[]>(
    object: T,
    ...keys: K
  ): K[number] extends keyof T ? true : false => {
    return keys.every(key => key in object) as any;
  },

  hasAllKeys: <T extends object, K extends Keys[]>(
    object: T,
    ...keys: K
  ): keyof T extends K[number] ? true : false => {
    return (
      Object.keys(object).every(key => keys.includes(key)) &&
      (keys.every(key => key in object) as any)
    );
  },

  omit: castFnBasic(
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

      is: partialCall(_omitIs, 'key') as <K extends Keys[]>(
        object: PrimitiveObjectMap,
        ...keys: K
      ) => boolean,

      by: castFnBasic(
        partialCall(_omit, 'element') as <
          T extends PrimitiveObjectMap,
          K extends any[],
        >(
          object: T,
          ...values: K
        ) => SubType<T, K[number]>,
        {
          is: partialCall(_omitIs, 'element'),
        },
      ),

      deep: castFnBasic(
        partialCall(_omitDeep, 'key') as <
          T extends PrimitiveObjectMap,
          K extends Keys[],
        >(
          object: T,
          ...keys: K
        ) => DeepOmit<T, K[number]>,
        {
          by: castFnBasic(
            partialCall(_omitDeep, 'element') as <
              T extends PrimitiveObjectMap,
              K extends Keys[],
            >(
              object: T,
              ...values: K
            ) => SubType<T, K[number]>,
            {
              is: partialCall(_omitDeepIs, 'element'),
            },
          ),
          is: partialCall(_omitDeepIs, 'key') as (
            object: PrimitiveObjectMap,
            ...keys: Keys[]
          ) => boolean,
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

  require: castFnBasic(require, {
    clone: castFnBasic(
      <T extends PrimitiveObject>(object: T, requires: object): T => {
        return require(deepClone(object) as any, requires);
      },
    ),

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

    is: castFnBasic(
      <T extends object>(object: T): object is Required<T> => {
        const values = Object.values(object);
        return values.every(
          value => value !== undefined && value !== null,
        );
      },
      {
        deep: _isRequiredDeep,
      },
    ),
  }),

  pick: castFnBasic(
    partialCall(_pick, 'key') as <T extends object, K extends any[]>(
      object: T,
      ...keys: K
    ) => Pick<T, K[number]>,
    {
      deep: castFnBasic(partialCall(_pickDeep, 'key'), {
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

  ru: castFn<Ru>()(),

  ra: castFn<Ra>()(),

  primitive: castFn<PrimitiveObjectMap>()({
    is: (object: unknown): object is PrimitiveObjectMap => {
      if (!isPlainObject(object)) return false;
      return commons.primitiveObject.is(object);
    },

    clone: <T extends PrimitiveObjectMap>(object: T): T => {
      return deepClone(object);
    },
  }),
});
