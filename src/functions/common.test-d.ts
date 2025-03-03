import type { TimeLike } from 'fs';
import type { DeepReadonly } from '../types';
import { t, typings } from './common';

expectTypeOf(t.identity(1)).toEqualTypeOf<number>();
expectTypeOf(t.identity(1)).toMatchTypeOf(34);
expectTypeOf(t.identity('str')).not.toMatchTypeOf<number>();

// #region Unknown match any and unknown only
expectTypeOf(typings.unknown(1)).toEqualTypeOf<unknown>();
expectTypeOf(typings.unknown(1)).not.toEqualTypeOf<any>();
expectTypeOf(typings.unknown(1)).toMatchTypeOf<any>();
expectTypeOf(typings.unknown(1)).not.toMatchTypeOf<number>();
// #endregion

// #region any match any and unknown only
expectTypeOf(typings.any(1)).toMatchTypeOf<any>();
expectTypeOf(typings.any(true)).toEqualTypeOf<any>();
expectTypeOf(typings.any('bri')).toMatchTypeOf<unknown>();
expectTypeOf(typings.any(Date.now)).not.toEqualTypeOf<unknown>();
expectTypeOf(typings.any(15)).toMatchTypeOf<string>();
expectTypeOf(typings.any(new Date())).not.toEqualTypeOf<string>();
expectTypeOf(typings.any(new Set())).toMatchTypeOf<number>();
expectTypeOf(typings.any(new Map())).not.toEqualTypeOf<number>();
expectTypeOf(typings.any(new WeakMap())).toMatchTypeOf<boolean>();
expectTypeOf(typings.any(Symbol)).not.toEqualTypeOf<boolean>();
expectTypeOf(typings.any(1)).toMatchTypeOf<Date>();
expectTypeOf(typings.any(1)).not.toEqualTypeOf<Date>();
expectTypeOf(typings.any(1)).toMatchTypeOf<TimeLike>();
expectTypeOf(typings.any(1)).not.toEqualTypeOf<TimeLike>();
// #endregion

expectTypeOf<{ a: 43; b: 32 }>(t.unknown<{ a: 43; b: 32 }>());
expectTypeOf(t.undefined).toEqualTypeOf(undefined);
expectTypeOf<string>(t.string).toEqualTypeOf<string>();
expectTypeOf<number>(t.number).toEqualTypeOf<number>();
expectTypeOf<Date>(t.date).toEqualTypeOf<Date>();
expectTypeOf(t.boolean).toEqualTypeOf<boolean>();
expectTypeOf(t.null).toEqualTypeOf<null>();
expectTypeOf(t.symbol).toEqualTypeOf<symbol>();
expectTypeOf(t.bigint).toEqualTypeOf<bigint>();
expectTypeOf(t.function).toEqualTypeOf<(...args: any) => any>();
expectTypeOf(t.array(1, 2, 3)).toEqualTypeOf<number[]>();

const readonlyArray1 = t.readonlyArray(1, 2, 3);
expectTypeOf(readonlyArray1).toEqualTypeOf<readonly (1 | 2 | 3)[]>();
expectTypeOf(readonlyArray1).not.toMatchTypeOf<(1 | 2 | 3)[]>();
expectTypeOf(readonlyArray1).not.toMatchTypeOf<[1, 2, 3]>();
expectTypeOf(readonlyArray1).toMatchTypeOf<
  readonly (number | number | number)[]
>();

const tuple1 = t.tuple(1, 2, 3);
expectTypeOf(tuple1).toMatchTypeOf<number[]>();
expectTypeOf(tuple1).toMatchTypeOf<[number, number, number]>();
expectTypeOf(tuple1).not.toEqualTypeOf<[number, number, number]>();
expectTypeOf(tuple1).toEqualTypeOf<[1, 2, 3]>();

expectTypeOf<1 | 2 | 3>(t.union(1, 2, 3));
expectTypeOf<{ readonly a: 43; readonly b: 32 }>(
  t.readonly({ a: 43, b: 32 }),
);
expectTypeOf<{ a: 43; b: 32 }>(t.buildObject({ a: 43, b: 32 }));

const notUn1: number | undefined = 45;
expectTypeOf<number>(t.notUndefined(notUn1));

const notUn2: string | undefined = 'hello';
expectTypeOf<string>(t.notUndefined(notUn2));

const notUnd3 = t.notUndefined(undefined);
expectTypeOf<never>(notUnd3);

const deepReadonly1 = t.readonly({
  a: 1,
  b: {
    c: 2,
  },
});

expectTypeOf(deepReadonly1).toMatchTypeOf<{
  readonly a: number;
  readonly b: {
    readonly c: number;
  };
}>();
expectTypeOf(deepReadonly1).toMatchTypeOf<{
  readonly a: number;
  readonly b: NonNullable<unknown>;
}>();
expectTypeOf(deepReadonly1).toEqualTypeOf<{
  readonly a: 1;
  readonly b: {
    readonly c: 2;
  };
}>();
expectTypeOf(deepReadonly1).toEqualTypeOf<
  DeepReadonly<{
    a: 1;
    b: {
      c: 2;
    };
  }>
>();

expectTypeOf(t.notReadOnly(deepReadonly1)).toEqualTypeOf<{
  a: 1;
  b: {
    readonly c: 2;
  };
}>();

const readonly1 = t.readonly({
  a: 1,
  b: {
    c: 2,
  },
});

expectTypeOf(readonly1).not.toEqualTypeOf<{
  readonly a: 1;
  readonly b: {
    c: 2;
  };
}>();

expectTypeOf(readonly1).toEqualTypeOf<{
  readonly a: 1;
  readonly b: {
    readonly c: 2;
  };
}>();

expectTypeOf(readonly1).toMatchTypeOf<{
  a: number;
  b: {
    c: number;
  };
}>();

expectTypeOf(readonly1).toMatchTypeOf<{
  a: 1;
  b: {
    c: 2;
  };
}>();
