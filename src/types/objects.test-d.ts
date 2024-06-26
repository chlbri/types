import { anify } from '../functions/common';
import type {
  DeepNever,
  FlatMapAll,
  FlatMapByKeys,
  Neverify,
  StringKeys,
} from './objects';

type FlatTest1 = {
  a: {
    b: {
      a: { c: string };
    };
  };
  d: number;
  e: boolean;
  f: {
    g: number;
    a: {
      c: string;
    };
  };
};

type FlatMapAll1 = FlatMapAll<FlatTest1>;
assertType<{
  '.': FlatTest1;
  d: number;
  e: boolean;
  a: {
    b: {
      a: {
        c: string;
      };
    };
  };
  'a.b': {
    a: {
      c: string;
    };
  };
  'a.b.a': {
    c: string;
  };
  f: {
    g: number;
    a: {
      c: string;
    };
  };
  'f.a': {
    c: string;
  };
  'a.b.a.c': string;
  'f.a.c': string;
  'f.g': number;
}>(anify<FlatMapAll1>());

type StringKeys1 = StringKeys<FlatTest1>;
assertType<
  | '.'
  | 'a'
  | 'd'
  | 'e'
  | 'f'
  | 'a.b.a.c'
  | 'f.a.c'
  | 'f.g'
  | 'a.b'
  | 'a.b.a'
  | 'f.a'
>(anify<StringKeys1>());

type FlatMapAll2 = FlatMapAll<FlatTest1, '/'>;
assertType<{
  '/': FlatTest1;
  d: number;
  e: boolean;
  a: {
    b: {
      a: {
        c: string;
      };
    };
  };
  'a/b': {
    a: {
      c: string;
    };
  };
  'a/b/a': {
    c: string;
  };
  f: {
    g: number;
    a: {
      c: string;
    };
  };
  'f/a': {
    c: string;
  };
  'a/b/a/c': string;
  'f/a/c': string;
  'f/g': number;
}>(anify<FlatMapAll2>());

type StringKeys2 = StringKeys<FlatTest1, '/'>;
assertType<
  | '/'
  | 'a'
  | 'd'
  | 'e'
  | 'f'
  | 'a/b/a/c'
  | 'f/a/c'
  | 'f/g'
  | 'a/b'
  | 'a/b/a'
  | 'f/a'
>(anify<StringKeys2>());

type FlatMapByKeys1 = FlatMapByKeys<FlatTest1, 'a', { delimiter: '/' }>;
assertType<{
  '/': {
    d: number;
    e: boolean;
    f: {
      g: number;
      a: {
        c: string;
      };
    };
  };
  '/b': Record<string, never>;
}>(anify<FlatMapByKeys1>());

type FlatTestRecursive1 = {
  a: {
    b: {
      a: {
        c: {
          a: {
            d: boolean;
          };
        };
      };
    };
  };
  d: number;
  e: boolean;
};

type FlatMapByKeys2 = FlatMapByKeys<
  FlatTestRecursive1,
  'a',
  { delimiter: '/' }
>;
assertType<{
  '/': {
    d: number;
    e: boolean;
  };
  '/b': Record<string, never>;
  '/b/c': Record<string, never>;
}>(anify<FlatMapByKeys2>());

type FlatMapByKeys3 = FlatMapByKeys<
  FlatTestRecursive1,
  'a',
  { with: true }
>;
assertType<{
  '.': FlatTestRecursive1;
  '.b': {
    a: {
      c: {
        a: {
          d: boolean;
        };
      };
    };
  };
  '.b.c': {
    a: {
      d: boolean;
    };
  };
}>(anify<FlatMapByKeys3>());

type Neverify1 = Neverify<{
  a: 1;
  b: {
    c: 2;
  };
}>;
expectTypeOf<Neverify1>().toEqualTypeOf<{
  a: 1;
  b: {
    c: 2;
  };
}>();

type Neverify2 = Neverify<DeepNever>;
expectTypeOf<Neverify2>().toEqualTypeOf<never>();
