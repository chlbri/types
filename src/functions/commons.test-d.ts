import type { TimeLike } from 'fs';
import { commons } from './commons';

expectTypeOf(commons.identity(1)).toEqualTypeOf<number>();
expectTypeOf(commons.identity(1)).toMatchTypeOf(34);
expectTypeOf(commons.identity('str')).not.toMatchTypeOf<number>();

// #region Unknown match any and unknown only
expectTypeOf(commons.unknown(1)).toEqualTypeOf<unknown>();
expectTypeOf(commons.unknown(1)).not.toEqualTypeOf<any>();
expectTypeOf(commons.unknown(1)).toMatchTypeOf<any>();
expectTypeOf(commons.unknown(1)).not.toMatchTypeOf<number>();
// #endregion

// #region any match any and unknown only
expectTypeOf(commons.any(1)).toMatchTypeOf<any>();
expectTypeOf(commons.any(true)).toEqualTypeOf<any>();
expectTypeOf(commons.any('bri')).toMatchTypeOf<unknown>();
expectTypeOf(commons.any(Date.now)).not.toEqualTypeOf<unknown>();
expectTypeOf(commons.any(15)).toMatchTypeOf<string>();
expectTypeOf(commons.any(new Date())).not.toEqualTypeOf<string>();
expectTypeOf(commons.any(new Set())).toExtend<number>();
expectTypeOf(commons.any(new Map())).not.toEqualTypeOf<number>();
expectTypeOf(commons.any(new WeakMap())).toExtend<boolean>();
expectTypeOf(commons.any(Symbol)).not.toEqualTypeOf<boolean>();
expectTypeOf(commons.any(1)).toExtend<Date>();
expectTypeOf(commons.any(1)).not.toEqualTypeOf<Date>();
expectTypeOf(commons.any(1)).toExtend<TimeLike>();
expectTypeOf(commons.any(1)).not.toEqualTypeOf<TimeLike>();
// #endregion

expectTypeOf<{ a: 43; b: 32 }>(commons.unknown<{ a: 43; b: 32 }>({}));
expectTypeOf(commons.undefined).toEqualTypeOf(undefined);
expectTypeOf(commons.null).toEqualTypeOf<null>();

const notUn1: number | undefined = 45;
expectTypeOf<number>(commons.required(notUn1));

const notUn2: string | undefined = 'hello';
expectTypeOf<string>(commons.required(notUn2));

const notUnd3 = commons.required(undefined);
expectTypeOf<never>(notUnd3);

const deepReadonly1 = commons.readonly.deep({
  a: 1,
  b: {
    c: 2,
  },
});

// Test that deep readonly works correctly
expectTypeOf(deepReadonly1).toEqualTypeOf<{
  readonly a: number;
  readonly b: {
    readonly c: number;
  };
}>();

// Test that readonly.deep.not works with a readonly object
const readonlyObj = {
  a: 1,
  b: {
    c: 2,
  },
} as const;

const deepNotReadonly = commons.readonly.deep.not(readonlyObj);
expectTypeOf(deepNotReadonly).toEqualTypeOf<{
  a: 1;
  b: {
    c: 2;
  };
}>();

expectTypeOf(commons.readonly.not(deepReadonly1)).toEqualTypeOf<{
  a: number;
  b: {
    readonly c: number;
  };
}>();

const readonly1 = commons.readonly({
  a: 1,
  b: {
    c: 2,
  },
});

expectTypeOf(readonly1).toEqualTypeOf<{
  readonly a: number;
  readonly b: {
    c: number;
  };
}>();

// Test readonly.not - it should remove readonly modifiers
const readonlyValue = readonly1;
const notReadonly = commons.readonly.not(readonlyValue);

// The result should have readonly modifiers removed
expectTypeOf(notReadonly).toEqualTypeOf<{
  a: number;
  b: {
    c: number;
  };
}>();
