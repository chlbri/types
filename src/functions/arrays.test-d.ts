import {
  arrayOf,
  excludeTuple,
  extractArray,
  freezeTuple,
  indexesOfArray,
  lengthOf,
  reduceArray,
  reverseArray,
  reverseTuple,
  tupleNOf,
  tupleOf,
} from './arrays';

// #region Test indexesOfArray with const assertions
const indexes1 = indexesOfArray('a', 'b', 'c');
expectTypeOf(indexes1).toEqualTypeOf<[0, 1, 2]>();

const indexes2 = indexesOfArray();
expectTypeOf(indexes2).toEqualTypeOf<[]>();

const indexes3 = indexesOfArray('x');
expectTypeOf(indexes3).toEqualTypeOf<[0]>();

const indexes4 = indexesOfArray(1, 'str', true);
expectTypeOf(indexes4).toEqualTypeOf<[0, 1, 2]>();

const indexes5 = indexesOfArray('a', 'b', 'c', 'd', 'e');
expectTypeOf(indexes5).toEqualTypeOf<[0, 1, 2, 3, 4]>();
// #endregion

// #region Test with readonly arrays (spread)
const readonlyArray = ['x', 'y'] as const;
const indexes6 = indexesOfArray(...readonlyArray);
expectTypeOf(indexes6).toEqualTypeOf<[0, 1]>();
// #endregion

// #region Test lengthOf with const assertions
const length1 = lengthOf('a', 'b', 'c');
expectTypeOf(length1).toEqualTypeOf<3>();

const length2 = lengthOf();
expectTypeOf(length2).toEqualTypeOf<0>();

const length3 = lengthOf('x');
expectTypeOf(length3).toEqualTypeOf<1>();

const length4 = lengthOf(1, 'str', true);
expectTypeOf(length4).toEqualTypeOf<3>();

const length5 = lengthOf('a', 'b', 'c', 'd', 'e');
expectTypeOf(length5).toEqualTypeOf<5>();

// Test with readonly arrays (spread)
const length6 = lengthOf(...readonlyArray);
expectTypeOf(length6).toEqualTypeOf<2>();
// #endregion

// #region Test that types are preserved with const assertions
const constArray = [1, 2, 3] as const;
const constIndexes = indexesOfArray(...constArray);
const constLength = lengthOf(...constArray);
expectTypeOf(constIndexes).toEqualTypeOf<[0, 1, 2]>();
expectTypeOf(constLength).toEqualTypeOf<3>();
// #endregion

// #region Test with longer arrays to ensure type inference works
const longArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const longIndexes = indexesOfArray(...longArray);
const longLength = lengthOf(...longArray);
expectTypeOf(longIndexes).toMatchTypeOf<number[]>();
expectTypeOf(longIndexes).toHaveProperty(0);
expectTypeOf(longIndexes).toHaveProperty(7);
expectTypeOf(longLength).toEqualTypeOf<8>();
// #endregion

// #region Test with mixed types
const mixedArray = [42, 'hello', true, { key: 'value' }, null] as const;
const mixedIndexes = indexesOfArray(...mixedArray);
const mixedLength = lengthOf(...mixedArray);
expectTypeOf(mixedIndexes).toEqualTypeOf<[0, 1, 2, 3, 4]>();
expectTypeOf(mixedLength).toEqualTypeOf<5>();
// #endregion

// #region Test edge cases - single element with different types
const singleString = ['test'] as const;
const singleNumber = [42] as const;
const singleBoolean = [true] as const;

expectTypeOf(indexesOfArray(...singleString)).toEqualTypeOf<[0]>();
expectTypeOf(indexesOfArray(...singleNumber)).toEqualTypeOf<[0]>();
expectTypeOf(indexesOfArray(...singleBoolean)).toEqualTypeOf<[0]>();

expectTypeOf(lengthOf(...singleString)).toEqualTypeOf<1>();
expectTypeOf(lengthOf(...singleNumber)).toEqualTypeOf<1>();
expectTypeOf(lengthOf(...singleBoolean)).toEqualTypeOf<1>();
// #endregion

// #region Test tupleNOf with different types and lengths
const tuple1 = tupleNOf('hello', 3);
expectTypeOf(tuple1).toEqualTypeOf<['hello', 'hello', 'hello']>();

const tuple2 = tupleNOf(42, 5);
expectTypeOf(tuple2).toEqualTypeOf<[42, 42, 42, 42, 42]>();

const tuple3 = tupleNOf(true, 2);
expectTypeOf(tuple3).toEqualTypeOf<[true, true]>();

const tuple4obj = { key: 'value' } as const;
const tuple4 = tupleNOf(tuple4obj, 4);
expectTypeOf(tuple4).toEqualTypeOf<
  [typeof tuple4obj, typeof tuple4obj, typeof tuple4obj, typeof tuple4obj]
>();

// Test tupleOf with 0 length
const tuple5 = tupleNOf('test', 0);
expectTypeOf(tuple5).toEqualTypeOf<[]>();

// Test tupleOf with 1 length
const tuple6 = tupleNOf('single', 1);
expectTypeOf(tuple6).toEqualTypeOf<['single']>();

// Test tupleOf with complex types
const complexObject = { id: 1, name: 'test', active: true } as const;
const tuple7 = tupleNOf(complexObject, 3);
expectTypeOf(tuple7).toEqualTypeOf<
  [typeof complexObject, typeof complexObject, typeof complexObject]
>();

// Test tupleOf with null and undefined
const tuple8 = tupleNOf(null, 2);
expectTypeOf(tuple8).toEqualTypeOf<[null, null]>();

const tuple9 = tupleNOf(undefined, 3);
expectTypeOf(tuple9).toEqualTypeOf<[undefined, undefined, undefined]>();

// Test tupleOf with arrays
const arrayData = [1, 2, 3] as const;
const tuple10 = tupleNOf(arrayData, 2);
expectTypeOf(tuple10).toEqualTypeOf<
  [typeof arrayData, typeof arrayData]
>();

// Test tupleOf with function
const fn = (x: number) => x * 2;
const tuple11 = tupleNOf(fn, 2);
expectTypeOf(tuple11).toEqualTypeOf<[typeof fn, typeof fn]>();
// #endregion

// #region Test arrayOf function
const array1 = arrayOf(1, 2, 3);
expectTypeOf(array1).toMatchTypeOf<number[]>();
expectTypeOf(array1).toHaveProperty(0);
expectTypeOf(array1).toHaveProperty(2);

const array2 = arrayOf('a', 'b', 'c');
expectTypeOf(array2).toMatchTypeOf<string[]>();

const array3 = arrayOf();
expectTypeOf(array3).toEqualTypeOf<[]>();

const array4 = arrayOf(1, 'hello', true);
expectTypeOf(array4).toMatchTypeOf<(number | string | boolean)[]>();
// #endregion

// #region Test tupleOf function
const tuple12 = tupleOf(1, 2, 3);
expectTypeOf(tuple12).toMatchTypeOf<readonly number[]>();

const tuple13 = tupleOf('a', 'b', 'c');
expectTypeOf(tuple13).toMatchTypeOf<readonly string[]>();

const tuple14 = tupleOf();
expectTypeOf(tuple14).toEqualTypeOf<readonly []>();

const tuple15 = tupleOf(1, 'hello', true);
expectTypeOf(tuple15).toMatchTypeOf<
  readonly (number | string | boolean)[]
>();
// #endregion

// #region Test reduceArray function
const reduced1 = reduceArray([1, 2, 3]);
expectTypeOf(reduced1).toMatchTypeOf<number>();

const reduced2 = reduceArray(42);
expectTypeOf(reduced2).toMatchTypeOf<number>();

const reduced3 = reduceArray(['a', 'b', 'c'] as const);
expectTypeOf(reduced3).toMatchTypeOf<string>();

const reduced4 = reduceArray([true, false]);
expectTypeOf(reduced4).toMatchTypeOf<boolean>();
// #endregion

// #region Test reverseArray function
const reversed1 = reverseArray(1, 2, 3);
expectTypeOf(reversed1).toMatchTypeOf<number[]>();

const reversed2 = reverseArray('a', 'b', 'c');
expectTypeOf(reversed2).toMatchTypeOf<string[]>();

const reversed3 = reverseArray();
expectTypeOf(reversed3).toEqualTypeOf<[]>();

const reversed4 = reverseArray(true);
expectTypeOf(reversed4).toMatchTypeOf<boolean[]>();

const reversed5 = reverseArray(1, 'hello', true);
expectTypeOf(reversed5).toMatchTypeOf<(number | string | boolean)[]>();
// #endregion

// #region Test reverseTuple function
const reversedTuple1 = reverseTuple(1, 2, 3);
expectTypeOf(reversedTuple1).toMatchTypeOf<number[]>();

const reversedTuple2 = reverseTuple('a', 'b', 'c');
expectTypeOf(reversedTuple2).toMatchTypeOf<string[]>();

const reversedTuple3 = reverseTuple();
expectTypeOf(reversedTuple3).toEqualTypeOf<[]>();
// #endregion

// #region Test freezeTuple function
const frozenTuple1 = freezeTuple(1, 2, 3);
expectTypeOf(frozenTuple1).toMatchTypeOf<readonly number[]>();

const frozenTuple2 = freezeTuple('a', 'b', 'c');
expectTypeOf(frozenTuple2).toMatchTypeOf<readonly string[]>();

const frozenTuple3 = freezeTuple();
expectTypeOf(frozenTuple3).toMatchTypeOf<readonly []>();

const frozenTuple4 = freezeTuple(1, 'hello', true);
expectTypeOf(frozenTuple4).toMatchTypeOf<
  readonly (number | string | boolean)[]
>();

const frozenTuple5 = freezeTuple(true);
expectTypeOf(frozenTuple5).toMatchTypeOf<readonly boolean[]>();
// #endregion

// #region Exclude/Extract

const testArray = [1, 2, 3, 4, 2, 3, 1, 2, 7, 1, 3];
const emptyArray: any[] = [];

// #region Test extractArray function - using mutable arrays
const extractedEmpty = extractArray(emptyArray);
expectTypeOf(extractedEmpty).toMatchTypeOf<any[]>();

const extracted1 = extractArray(testArray, 1, 3);
expectTypeOf(extracted1).toMatchTypeOf<number[]>();

const extracted2 = extractArray(testArray, 2);
expectTypeOf(extracted2).toMatchTypeOf<number[]>();

const stringArray = ['a', 'b', 'c', 'b', 'a'];
const extracted3 = extractArray(stringArray, 'a');
expectTypeOf(extracted3).toMatchTypeOf<string[]>();

const extracted4 = extractArray(stringArray, 'a', 'c');
expectTypeOf(extracted4).toMatchTypeOf<string[]>();
// #endregion

// #region Test excludeTuple function
const excluded1 = excludeTuple(testArray, 1, 3);
expectTypeOf(excluded1).toMatchTypeOf<number[]>();

const excluded2 = excludeTuple(testArray, 2);
expectTypeOf(excluded2).toMatchTypeOf<number[]>();

const excluded3 = excludeTuple(stringArray, 'a');
expectTypeOf(excluded3).toMatchTypeOf<string[]>();

const excluded4 = excludeTuple(stringArray, 'a', 'c');
expectTypeOf(excluded4).toMatchTypeOf<string[]>();

const excludedEmpty = excludeTuple(emptyArray);
expectTypeOf(excludedEmpty).toMatchTypeOf<any[]>();
// #endregion

// #endregion
