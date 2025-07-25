import { expandFn, partialCall } from '~utils';
import type {
  AllowedNamesLow,
  DeepNotReadonly,
  DeepOmit,
  DeepReadonly,
  DeepRequired,
  Keys,
  KeyTypes,
  KeyTypesFrom,
  NotReadonly,
  NotSubType,
  Primitive2,
  PrimitiveObjectMap,
  Ra,
  Ru,
  SubType,
  To,
} from '../types/types';
import { _unknown, castFn, commons } from './commons';

// #region Helpers

type Picker = 'element' | 'key';

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

const _readonly = expandFn(
  <T extends object>(object: T) => {
    return Object.freeze(object);
  },
  {
    forceCast: <T extends object>(object: unknown) => {
      const out = Object.freeze(object);
      return _unknown<Readonly<T>>(out);
    },

    dynamic: <U extends object>(object: U) => {
      return Object.freeze(object);
    },

    is: <T>(object: T): object is Readonly<T> => {
      return Object.isFrozen(object);
    },

    not: <const T extends object>(object: T) => {
      return _unknown<NotReadonly<T>>(object);
    },

    deep: expandFn(
      <T extends object>(object: T) => {
        const out = Object.freeze(object);
        return _unknown<DeepReadonly<T>>(out);
      },
      {
        not: <T extends object>(object: T) => {
          return _unknown<DeepNotReadonly<T>>(object);
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
  const result: any = {};

  const entries = Object.entries(object);
  entries.forEach(([key, value]) => {
    const checkKey = by === 'key' && !valuesOrKeys.includes(key);
    const checkElement = by === 'element' && !valuesOrKeys.includes(value);
    if (checkKey) {
      result[key] = value;
    } else if (checkElement) {
      result[key] = value;
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
  const result = __omitDeep(by, object, ...valuesOrKeys);

  return result;
};

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

const checkEntries = (keys: KeyTypes, object: object) => {
  const entries = Object.entries(keys);
  return entries.every(([key, type]) => {
    const check1 = key in object;
    if (!check1) return false;

    const value = (object as any)[key];
    if (typeof type === 'string') {
      return typeof value === type;
    } else if (typeof type === 'function') {
      return type(value);
    }
    return false;
  });
};

// #endregion

export const objects = castFn<object>()({
  trueObject: castFn<To>()({ is: isPlainObject }),

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

  hasKeys: expandFn(
    <K extends Keys[]>(
      object: object,
      ...keys: K
    ): object is Record<K[number], unknown> => {
      return keys.every(key => key in object);
    },
    {
      typings: <K extends KeyTypes>(
        object: object,
        keys: K,
      ): object is KeyTypesFrom<K> => {
        return checkEntries(keys, object);
      },

      all: expandFn(
        <K extends Keys[]>(
          object: object,
          ...keys: K
        ): object is Record<K[number], unknown> => {
          return (
            Object.keys(object).every(key => keys.includes(key)) &&
            keys.every(key => key in object)
          );
        },
        {
          typings: <K extends KeyTypes>(
            object: object,
            keys: K,
          ): object is KeyTypesFrom<K> => {
            const check0 = Object.keys(object).every(key =>
              Object.keys(keys).includes(key),
            );
            if (!check0) return false;

            return checkEntries(keys, object);
          },
        },
      ),
    },
  ),

  omit: expandFn(
    partialCall(_omit, 'key') as <
      T extends PrimitiveObjectMap,
      K extends any[],
    >(
      object: T,
      ...keys: K
    ) => Omit<T, K[number]>,

    {
      strict: expandFn(
        partialCall(_omit, 'key') as <
          T extends object,
          K extends (keyof T)[],
        >(
          object: T,
          ...keys: K
        ) => Omit<T, K[number]>,
        {
          is: partialCall(_omitIs, 'key') as <
            T extends object,
            K extends (keyof T)[],
          >(
            object: T,
            ...keys: K
          ) => boolean,
        },
      ),

      const: expandFn(
        partialCall(_omit, 'key') as <
          const T extends object,
          K extends (keyof T)[],
        >(
          object: T,
          ...keys: K
        ) => Omit<T, K[number]>,
        {
          is: partialCall(_omitIs, 'key') as <
            const T extends object,
            K extends (keyof T)[],
          >(
            object: T,
            ...keys: K
          ) => boolean,
        },
      ),

      is: partialCall(_omitIs, 'key') as <K extends Keys[]>(
        object: PrimitiveObjectMap,
        ...keys: K
      ) => boolean,

      by: expandFn(
        partialCall(_omit, 'element') as <
          T extends object,
          K extends any[],
        >(
          object: T,
          ...values: K
        ) => SubType<T, K[number]>,
        {
          is: partialCall(_omitIs, 'element'),
        },
      ),

      deep: expandFn(
        partialCall(_omitDeep, 'key') as <
          T extends PrimitiveObjectMap,
          K extends Keys[],
        >(
          object: T,
          ...keys: K
        ) => DeepOmit<T, K[number]>,
        {
          by: expandFn(
            partialCall(_omitDeep, 'element') as <
              T extends PrimitiveObjectMap,
              K extends Keys[],
            >(
              object: T,
              ...values: K
            ) => NotSubType<T, K[number]>,
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

  required: expandFn(require, {
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

    is: expandFn(
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

  pick: expandFn(
    partialCall(_pick, 'key') as <T extends object, K extends any[]>(
      object: T,
      ...keys: K
    ) => Pick<T, K[number]>,
    {
      deep: expandFn(partialCall(_pickDeep, 'key'), {
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
  }),
});
