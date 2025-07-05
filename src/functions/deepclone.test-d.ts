import { expectTypeOf } from 'vitest';
import deepClone from './deepclone';

// #region Test simple object cloning
const simpleObject = { a: 1, b: 'hello', c: true } as const;
const clonedSimpleObject = deepClone(simpleObject);
expectTypeOf(clonedSimpleObject).toMatchObjectType<typeof simpleObject>();
// #endregion

// #region Test nested object cloning
const nestedObject = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 'nested',
      f: true,
    },
  },
} as const;
const clonedNestedObject = deepClone(nestedObject);
expectTypeOf(clonedNestedObject).toMatchTypeOf<typeof nestedObject>();
// #endregion

// #region Test array cloning
const simpleArray = [1, 2, 3] as any;
const clonedSimpleArray = deepClone(simpleArray);
expectTypeOf(clonedSimpleArray).toMatchTypeOf<any>();

const mixedArray = [1, 'hello', true] as any;
const clonedMixedArray = deepClone(mixedArray);
expectTypeOf(clonedMixedArray).toMatchTypeOf<any>();
// #endregion

// #region Test object with arrays
const objectWithArrays = {
  arr1: [1, 2, 3],
  arr2: ['a', 'b'],
  nested: {
    arr3: [{ x: 1 }, { y: 2 }],
  },
} as const;
const clonedObjectWithArrays = deepClone(objectWithArrays);
expectTypeOf(clonedObjectWithArrays).toEqualTypeOf<
  typeof objectWithArrays
>();
// #endregion

// #region Test edge cases with types
const emptyObject = {} as const;
const clonedEmptyObject = deepClone(emptyObject);
expectTypeOf(clonedEmptyObject).toMatchTypeOf<typeof emptyObject>();

const objectWithNullUndefined = {
  nullValue: null,
  undefinedValue: undefined,
  nested: {
    alsoNull: null,
    alsoUndefined: undefined,
  },
} as const;
const clonedWithNullUndefined = deepClone(objectWithNullUndefined);
expectTypeOf(clonedWithNullUndefined).toMatchTypeOf<
  typeof objectWithNullUndefined
>();
// #endregion

// #region Test function preservation
const objectWithFunction = { func: () => 'test' } as any;
const clonedWithFunction = deepClone(objectWithFunction);
expectTypeOf(clonedWithFunction).toMatchTypeOf<any>();
// #endregion

// #region Test that deepClone accepts PrimitiveObject
const primitiveObjectString: string = 'test';
const clonedPrimitiveString = deepClone(primitiveObjectString);
expectTypeOf(clonedPrimitiveString).toMatchTypeOf<any>();

const primitiveObjectNumber: number = 42;
const clonedPrimitiveNumber = deepClone(primitiveObjectNumber);
expectTypeOf(clonedPrimitiveNumber).toMatchTypeOf<any>();

const primitiveObjectBoolean: boolean = true;
const clonedPrimitiveBoolean = deepClone(primitiveObjectBoolean);
expectTypeOf(clonedPrimitiveBoolean).toMatchTypeOf<any>();

const primitiveObjectNull: null = null;
const clonedPrimitiveNull = deepClone(primitiveObjectNull);
expectTypeOf(clonedPrimitiveNull).toMatchTypeOf<any>();

const primitiveObjectUndefined: undefined = undefined;
const clonedPrimitiveUndefined = deepClone(primitiveObjectUndefined);
expectTypeOf(clonedPrimitiveUndefined).toMatchTypeOf<any>();
// #endregion

// #region Test function type signatures
expectTypeOf(deepClone).toBeFunction();

// Test that deepClone function has the expected signature

expectTypeOf(deepClone).parameter(2).toExtend<Map<any, any> | undefined>();
// #endregion
