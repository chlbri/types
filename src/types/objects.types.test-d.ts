import type { Neverify } from './objects.types';

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

type Neverify2 = Neverify<{
  a: never;
  b: {
    c: string;
  };
}>;
expectTypeOf<Neverify2>().toEqualTypeOf<{
  a: never;
  b: {
    c: string;
  };
}>();

type Neverify3 = Neverify<{
  a: never;
  b: {
    c: never;
  };
}>;
expectTypeOf<Neverify3>().toEqualTypeOf<never>();
