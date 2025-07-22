import type { AnyArray, NOmit, PrimitiveObject, SoRa } from 'types/types';
import type {
  CUSTOM,
  PARTIAL,
  PRIMITIVE_OBJECTS,
  PRIMITIVES,
} from './constants';

export type PrimitiveS = (typeof PRIMITIVES)[number];

export type TransformS<T extends PrimitiveS> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : T extends 'boolean'
      ? boolean
      : T extends 'bigint'
        ? bigint
        : T extends 'symbol'
          ? symbol
          : T extends 'undefined'
            ? undefined
            : T extends 'null'
              ? null
              : never;

export type MapS = {
  [key: string]: ObjectS;
};

export type Custom<T = any> = {
  [CUSTOM]: T;
};

export type PartialCustom = {
  [PARTIAL]: undefined;
};

export type _ObjectS =
  | MapS
  | PrimitiveS
  | Custom
  | PartialCustom
  | (typeof PRIMITIVE_OBJECTS)[number];

export type ObjectS = SoRa<_ObjectS>;

export type TransformO<T> = T extends PrimitiveS
  ? TransformS<T>
  : T extends 'date'
    ? Date
    : T extends 'object'
      ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {}
      : T extends 'primitive'
        ? PrimitiveObject
        : T extends PartialCustom
          ? Partial<TransformO<NOmit<T, typeof PARTIAL>>>
          : T extends AnyArray<any>
            ? T[number] extends infer TKN extends ObjectS
              ? TransformO<TKN>[]
              : never
            : {
                [K in keyof T]: TransformO<T[K]>;
              };
