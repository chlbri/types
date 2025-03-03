import type { Fn, Keys, NotUndefined, Primitive } from './common.types';
import { AddString, type StringEndWith } from './strings.types';
import type { UnionToIntersection } from './unions.types';

export type NOmit<T, K extends keyof T> = Omit<T, K>;

export type DeepOmit<T, K extends Keys> = {
  [P in Exclude<keyof T, K>]: T[P] extends Fn
    ? T[P]
    : T[P] extends object
      ? DeepOmit<T[P], K>
      : T[P];
};

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
    : T[P] extends object
      ? DeepNotUndefined<T[P]>
      : T[P];
}>;

export type NotReadonly<T extends object> = {
  -readonly [P in keyof T]-?: T[P];
};

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

export type PartialUndefiny<T> = PickNotBy<T, undefined> &
  Partial<PickBy<T, undefined>>;

export type Nullify<T> = PickNotBy<T, null> & Partial<PickBy<T, null>>;

type _OmitWithoutPartial<T, O extends string> = {
  [key in keyof Omit<T, O>]: O extends keyof T[key]
    ? _OmitWithoutPartial<T[key], O>
    : T[key];
};

type _OmitWithPartial<T, O extends string> = PartialUndefiny<
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

type FlatMapByKeyOptions = {
  with?: boolean;
  delimiter?: string;
};

// #region type FlatMapByKeys
export type FlatMapByKeys<
  T extends TrueO,
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

// #region SubTypes
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type NotFilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? never : Key;
};

export type AllowedNames<Base, Condition> = FilterFlags<
  Base,
  Condition
>[keyof Base];

export type NotAllowedNames<Base, Condition> = NotFilterFlags<
  Base,
  Condition
>[keyof Base];

export type SubType<Base extends object, Condition> = Pick<
  Base,
  AllowedNames<Base, Condition>
>;

export type NotSubType<Base extends object, Condition> = Pick<
  Base,
  NotAllowedNames<Base, Condition>
>;

// #endregion

interface _Never {
  [key: Keys]: DeepNever;
}

export type DeepNever = never | _Never;

export type Dn = DeepNever;

export type Neverify<T extends object> = T extends DeepNever ? never : T;

export type Ru = Record<Keys, unknown>;

export type Rn = Record<Keys, never>;

export type Ra = Record<Keys, any>;

export type TrueObject = object & {
  [Symbol.iterator]?: never;
  //@ts-expect-error - 'SymbolConstructor' does not exist on type 'object'
  [SymbolConstructor]?: never;
};

export type TrueO = TrueObject;
