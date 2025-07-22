/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CUSTOM,
  PARTIAL,
  PRIMITIVE_OBJECTS,
  PRIMITIVES,
} from './constants';
import type {
  Custom,
  ObjectS,
  PartialCustom,
  TransformO,
} from './types.types';

const _transform = <T>(object?: any): T => {
  let out: any;

  const isArray = Array.isArray(object);
  if (isArray) {
    out = object.map(_transform);
    return out;
  }

  const isObject = typeof object === 'object';

  if (isObject) {
    out = {};

    const entries = Object.entries(object).filter(
      ([key]) => key !== PARTIAL,
    );
    if (entries.length === 0) return out;

    const isCustom = Object.keys(object).every(key => key === CUSTOM);

    if (isCustom) return out;

    entries.forEach(([key, value]) => {
      out[key] = _transform(value);
    });

    return out;
  }

  for (const primitive of PRIMITIVES) {
    if (object === primitive) return out;
  }

  for (const primitive of PRIMITIVE_OBJECTS.filter(
    value => value !== 'date',
  )) {
    if (object === primitive) {
      out = {};
      return out;
    }
  }

  return out;
};

export const transform = <T extends ObjectS>(object?: T) =>
  _transform<TransformO<T>>(object);

transform.const = <const T extends ObjectS>(object?: T) => {
  return _transform<TransformO<T>>(object);
};

transform.custom = <T = any>(_?: T): Custom<T> => {
  const out: any = {};
  out[CUSTOM] = undefined;
  return out;
};

transform.partial = <T extends ObjectS>(value: T): T & PartialCustom => {
  const entries = Object.entries(value).filter(([key]) => key !== PARTIAL);
  const out: any = {};

  entries.forEach(([key, value]) => {
    out[key] = value;
  });

  out[PARTIAL] = undefined;

  return out;
};

transform.tuple = <T extends ObjectS[]>(...els: T) => transform(els);

transform.union = <T extends ObjectS[]>(..._: T) =>
  transform.custom<TransformO<T[number]>>();
