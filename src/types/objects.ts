import type { Fn, Keys, NotUndefined, Primitive } from './common';
import { AddString, type StringEndWith } from './strings';
import type { UnionToIntersection } from './unions';

export type NOmit<T, K extends keyof T> = Omit<T, K>;

export type ReverseMap<T extends Record<string, string>> = {
  [K in keyof T as T[K]]: K;
};

export type DeepReadonly<T> = T extends Primitive
  ? T
  : {
      readonly [P in keyof T]: T[P] extends Fn
        ? T[P]
        : T[P] extends object
          ? DeepReadonly<T[P]>
          : T[P];
    };

export type DeepPartial<T> = T extends Primitive
  ? T
  : {
      [P in keyof T]?: T[P] extends Fn
        ? T[P]
        : T[P] extends object
          ? DeepPartial<T[P]>
          : T[P];
    };

export type DeepNotUndefined<T extends object | undefined> = NotUndefined<{
  [P in keyof T]-?: T[P] extends Fn
    ? T[P]
    : T[P] extends object | undefined
      ? DeepNotUndefined<T[P]>
      : T[P];
}>;

export type NotReadonly<T extends object> = {
  -readonly [P in keyof T]: T[P];
};

export type DeepNotReadonly<T extends object> = NotReadonly<{
  [P in keyof T]: T[P] extends Fn
    ? T[P]
    : T[P] extends object
      ? DeepNotReadonly<T[P]>
      : T[P];
}>;

export type ValuesOf<T, U = any> = Extract<T[keyof T], U>;
export type ObjectValuesOf<T> = Exclude<
  Extract<ValuesOf<T>, object>,
  Array<any>
>;

export type Require<T, K extends keyof T> = NOmit<T, K> &
  Required<Pick<T, K>>;

export type Prop<T, K> = K extends keyof T ? T[K] : never;

export type PickNoInfer<T, S> = Pick<T, Extract<keyof T, S>>;

export type PickBy<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: Extract<T[P], U>;
};

export type PickKeysBy<T, U> = keyof PickBy<T, U>;

export type PickNotBy<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: Exclude<T[P], U>;
};

export type PickKeysNotBy<T, U> = keyof PickNotBy<T, U>;

export type OnPropChangedMethods<T, I extends keyof T = keyof T> = T & {
  [K in Extract<PickKeysBy<T, (...args: any) => any>, I> &
    string as AddString<Capitalize<K>, 'on', 'Changed'>]: (
    cb: (newValue: T[K]) => void,
  ) => void;
};

export type Undefiny<T> = PickNotBy<T, undefined> &
  Partial<PickBy<T, undefined>>;

export type Nullify<T> = PickNotBy<T, null> & Partial<PickBy<T, null>>;

type _OmitWithoutPartial<T, O extends string> = {
  [key in keyof Omit<T, O>]: O extends keyof T[key]
    ? _OmitWithoutPartial<T[key], O>
    : T[key];
};

type _OmitWithPartial<T, O extends string> = Undefiny<
  Nullify<_OmitWithoutPartial<T, O>>
>;

export type OmitRecursive<T, O extends string> = {
  [key in keyof _OmitWithPartial<T, O>]: _OmitWithPartial<T[key], O>;
};

export type Unionize<T extends Record<string, any>> = {
  [P in keyof T]: { [Q in P]: T[P] };
}[keyof T];

// #region FlatMapAll
type ToPaths<
  T,
  P extends string = '',
  Delimiter extends string = '.',
> = T extends object
  ?
      | {
          [K in keyof T]: ToPaths<
            T[K],
            `${P}${K & string}${Delimiter}`,
            Delimiter
          >;
        }[keyof T]
      | {
          path: P;
          type: T;
        }
  : {
      path: P extends `${infer D}${Delimiter}` ? D : never;
      type: T;
    };
type FromPaths<
  T extends {
    path: string;
    type: unknown;
  },
> = {
  [P in T['path']]: Extract<
    T,
    {
      path: P;
    }
  >['type'];
};

type TransformFlatKeys<
  S extends Keys,
  Delimiter extends string,
> = S extends ''
  ? Delimiter
  : S extends string
    ? StringEndWith<S, Delimiter>['prev']
    : never;

/**
 * From "Acid Coder"
 */
export type _FlatMapAll<
  T extends object,
  Delimiter extends string = '.',
> = FromPaths<ToPaths<T, '', Delimiter>>;

export type FlatMapAll<T extends object, Delimiter extends string = '.'> =
  _FlatMapAll<T, Delimiter> extends infer U
    ? {
        [P in keyof U as TransformFlatKeys<P, Delimiter>]: U[P];
      }
    : never;
// #endregion

export type StringKeys<
  T extends object,
  Delimiter extends string = '.',
> = keyof FlatMapAll<T, Delimiter>;

type WithChildren<
  T,
  _omit extends string,
  _withChildren extends boolean = false,
> = _withChildren extends true ? T : Omit<T, _omit>;

type DefaultK<S extends string, D extends string> = S extends '' ? D : S;

// #region type _FlatMapByKey
export type _FlatMapByKey<
  T extends object,
  _omit extends PickKeysBy<T, object>,
  _withChildren extends boolean = false,
  Delimiter extends string = '.',
  Keys extends string = '',
  K extends string = keyof T[_omit] & string,
> = T extends {
  [Key in _omit]?: any;
}
  ? K extends keyof T[_omit]
    ? T[_omit][K] extends infer TK extends object
      ?
          | _FlatMapByKey<
              TK,
              _omit,
              _withChildren,
              Delimiter,
              `${Keys}${Delimiter}${K}`
            >
          | {
              [key in DefaultK<Keys, Delimiter>]: WithChildren<
                T,
                _omit,
                _withChildren
              >;
            }
      : {
          [key in DefaultK<Keys, Delimiter>]: WithChildren<
            T,
            _omit,
            _withChildren
          >;
        }
    : never
  : {
      [key in DefaultK<Keys, Delimiter>]: WithChildren<
        T,
        _omit,
        _withChildren
      >;
    };
// #endregion

type FlatMapByKeyOptions = {
  with?: boolean;
  delimiter?: string;
};

// #region type FlatMapByKeys
export type FlatMapByKeys<
  T extends object,
  _omit extends PickKeysBy<T, object>,
  options extends FlatMapByKeyOptions = {
    with: false;
    delimiter: '.';
  },
> = UnionToIntersection<
  _FlatMapByKey<
    T,
    _omit,
    options['with'] extends true ? true : false,
    options['delimiter'] extends infer D extends string ? D : '.'
  >
>;
// #endregion
