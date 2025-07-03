import { arrays } from './arrays';

// #region Test arrays.indexes with const assertions
const indexes1 = arrays.indexes('a', 'b', 'c');
expectTypeOf(indexes1).toEqualTypeOf<[0, 1, 2]>();

const indexes2 = arrays.indexes();
expectTypeOf(indexes2).toEqualTypeOf<[]>();

const indexes3 = arrays.indexes('x');
expectTypeOf(indexes3).toEqualTypeOf<[0]>();

const indexes4 = arrays.indexes(1, 'str', true);
expectTypeOf(indexes4).toEqualTypeOf<[0, 1, 2]>();

const indexes5 = arrays.indexes('a', 'b', 'c', 'd', 'e');
expectTypeOf(indexes5).toEqualTypeOf<[0, 1, 2, 3, 4]>();
// #endregion

// #region Test with readonly arrays (spread)
const readonlyArray = ['x', 'y'] as const;
const indexes6 = arrays.indexes(...readonlyArray);
expectTypeOf(indexes6).toEqualTypeOf<[0, 1]>();
// #endregion

// #region Test arrays.lengthOf with const assertions
const length1 = arrays.lengthOf('a', 'b', 'c');
expectTypeOf(length1).toEqualTypeOf<3>();

const length2 = arrays.lengthOf();
expectTypeOf(length2).toEqualTypeOf<0>();

const length3 = arrays.lengthOf('x');
expectTypeOf(length3).toEqualTypeOf<1>();

const length4 = arrays.lengthOf(1, 'str', true);
expectTypeOf(length4).toEqualTypeOf<3>();

const length5 = arrays.lengthOf('a', 'b', 'c', 'd', 'e');
expectTypeOf(length5).toEqualTypeOf<5>();

// Test with readonly arrays (spread)
const length6 = arrays.lengthOf(...readonlyArray);
expectTypeOf(length6).toEqualTypeOf<2>();
// #endregion

// #region Test that types are preserved with const assertions
const constArray = [1, 2, 3] as const;
const constIndexes = arrays.indexes(...constArray);
const constLength = arrays.lengthOf(...constArray);
expectTypeOf(constIndexes).toEqualTypeOf<[0, 1, 2]>();
expectTypeOf(constLength).toEqualTypeOf<3>();
// #endregion

// #region Test with longer arrays to ensure type inference works
const longArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const longIndexes = arrays.indexes(...longArray);
const longLength = arrays.lengthOf(...longArray);
expectTypeOf(longIndexes).toBeArray();
expectTypeOf(longIndexes).items.toExtend<number>();
expectTypeOf(longIndexes).toEqualTypeOf<[0, 1, 2, 3, 4, 5, 6, 7]>();
expectTypeOf(longLength).toEqualTypeOf<8>();
// #endregion

// #region Test with mixed types
const mixedArray = [42, 'hello', true, { key: 'value' }, null] as const;
const mixedIndexes = arrays.indexes(...mixedArray);
const mixedLength = arrays.lengthOf(...mixedArray);
expectTypeOf(mixedIndexes).toEqualTypeOf<[0, 1, 2, 3, 4]>();
expectTypeOf(mixedLength).toEqualTypeOf<5>();
// #endregion

// #region Test edge cases - single element with different types
const singleString = ['test'] as const;
const singleNumber = [42] as const;
const singleBoolean = [true] as const;

expectTypeOf(arrays.indexes(...singleString)).toEqualTypeOf<[0]>();
expectTypeOf(arrays.indexes(...singleNumber)).toEqualTypeOf<[0]>();
expectTypeOf(arrays.indexes(...singleBoolean)).toEqualTypeOf<[0]>();

expectTypeOf(arrays.lengthOf(...singleString)).toEqualTypeOf<1>();
expectTypeOf(arrays.lengthOf(...singleNumber)).toEqualTypeOf<1>();
expectTypeOf(arrays.lengthOf(...singleBoolean)).toEqualTypeOf<1>();
// #endregion

// #region Test arrays.tupleOf.number with different types and lengths
const tuple1 = arrays.tupleOf.number('hello', 3);
expectTypeOf(tuple1).toEqualTypeOf<['hello', 'hello', 'hello']>();

const tuple2 = arrays.tupleOf.number(42, 5);
expectTypeOf(tuple2).toEqualTypeOf<[42, 42, 42, 42, 42]>();

const tuple3 = arrays.tupleOf.number(true, 2);
expectTypeOf(tuple3).toEqualTypeOf<[true, true]>();

const tuple4obj = { key: 'value' } as const;
const tuple4 = arrays.tupleOf.number(tuple4obj, 4);
expectTypeOf(tuple4).toEqualTypeOf<
  [typeof tuple4obj, typeof tuple4obj, typeof tuple4obj, typeof tuple4obj]
>();

// Test arrays.tupleOf with 0 length
const tuple5 = arrays.tupleOf.number('test', 0);
expectTypeOf(tuple5).toEqualTypeOf<[]>();

// Test arrays.tupleOf with 1 length
const tuple6 = arrays.tupleOf.number('single', 1);
expectTypeOf(tuple6).toEqualTypeOf<['single']>();

// Test arrays.tupleOf with complex types
const complexObject = { id: 1, name: 'test', active: true } as const;
const tuple7 = arrays.tupleOf.number(complexObject, 3);
expectTypeOf(tuple7).toEqualTypeOf<
  [typeof complexObject, typeof complexObject, typeof complexObject]
>();

// Test arrays.tupleOf with null and undefined
const tuple8 = arrays.tupleOf.number(null, 2);
expectTypeOf(tuple8).toEqualTypeOf<[null, null]>();

const tuple9 = arrays.tupleOf.number(undefined, 3);
expectTypeOf(tuple9).toEqualTypeOf<[undefined, undefined, undefined]>();

// Test arrays.tupleOf with arrays
const arrayData = [1, 2, 3] as const;
const tuple10 = arrays.tupleOf.number(arrayData, 2);
expectTypeOf(tuple10).toEqualTypeOf<
  [typeof arrayData, typeof arrayData]
>();

// Test arrays.tupleOf with function
const fn = (x: number) => x * 2;
const tuple11 = arrays.tupleOf.number(fn, 2);
expectTypeOf(tuple11).toEqualTypeOf<[typeof fn, typeof fn]>();
// #endregion

// #region Test arrays function
const array1 = arrays(1, 2, 3);
expectTypeOf(array1).toExtend<number[]>();
expectTypeOf(array1).toHaveProperty(0);
expectTypeOf(array1).toHaveProperty(2);

const array2 = arrays('a', 'b', 'c');
expectTypeOf(array2).toExtend<string[]>();

const array3 = arrays();
expectTypeOf(array3).toEqualTypeOf<unknown[]>();

const array4 = arrays.low(1, 'hello', true);
expectTypeOf(array4).toExtend<(number | string | boolean)[]>();
// #endregion

// #region Test arrays.tupleOf function
const tuple12 = arrays.tupleOf(1, 2, 3);
expectTypeOf(tuple12).toExtend<readonly number[]>();

const tuple13 = arrays.tupleOf('a', 'b', 'c');
expectTypeOf(tuple13).toExtend<readonly string[]>();

const tuple14 = arrays.tupleOf();
expectTypeOf(tuple14).toEqualTypeOf<readonly []>();

const tuple15 = arrays.tupleOf(1, 'hello', true);
expectTypeOf(tuple15).toExtend<readonly (number | string | boolean)[]>();
// #endregion

// #region Test  arrays.reduce function
const reduced1 = arrays.reduce([1, 2, 3]);
expectTypeOf(reduced1).toExtend<number>();

const reduced2 = arrays.reduce(42);
expectTypeOf(reduced2).toExtend<number>();

const reduced3 = arrays.reduce(['a', 'b', 'c'] as const);
expectTypeOf(reduced3).toExtend<string>();

const reduced4 = arrays.reduce([true, false]);
expectTypeOf(reduced4).toExtend<boolean>();
// #endregion

// #region Test reverseArray function
const reversed1 = arrays.reverse(1, 2, 3);
expectTypeOf(reversed1).toExtend<number[]>();

const reversed2 = arrays.reverse('a', 'b', 'c');
expectTypeOf(reversed2).toExtend<string[]>();

const reversed3 = arrays.reverse();
expectTypeOf(reversed3).toEqualTypeOf<[]>();

const reversed4 = arrays.reverse(true);
expectTypeOf(reversed4).toExtend<boolean[]>();

const reversed5 = arrays.reverse(1, 'hello', true);
expectTypeOf(reversed5).toExtend<(number | string | boolean)[]>();
// #endregion

// #region Test reverseTuple function
const reversedTuple1 = arrays.reverse.tuple(1, 2, 3);
expectTypeOf(reversedTuple1).toExtend<number[]>();

const reversedTuple2 = arrays.reverse.tuple('a', 'b', 'c');
expectTypeOf(reversedTuple2).toExtend<string[]>();

const reversedTuple3 = arrays.reverse.tuple();
expectTypeOf(reversedTuple3).toEqualTypeOf<[]>();
// #endregion

// #region Test  arrays.freeze function
const frozenTuple1 = arrays.freeze(1, 2, 3);
expectTypeOf(frozenTuple1).toExtend<readonly number[]>();

const frozenTuple2 = arrays.freeze('a', 'b', 'c');
expectTypeOf(frozenTuple2).toExtend<readonly string[]>();

const frozenTuple3 = arrays.freeze();
expectTypeOf(frozenTuple3).toExtend<readonly []>();

const frozenTuple4 = arrays.freeze(1, 'hello', true);
expectTypeOf(frozenTuple4).toExtend<
  readonly (number | string | boolean)[]
>();

const frozenTuple5 = arrays.freeze(true);
expectTypeOf(frozenTuple5).toExtend<readonly boolean[]>();
// #endregion

// #region Exclude/Extract

const testArray = [1, 2, 3, 4, 2, 3, 1, 2, 7, 1, 3];
const emptyArray: any[] = [];

// #region Test extractArray function - using mutable arrays
const extractedEmpty = arrays.extract(emptyArray);
expectTypeOf(extractedEmpty).toExtend<any[]>();

const extracted1 = arrays.extract(testArray, 1, 3);
expectTypeOf(extracted1).toExtend<number[]>();

const extracted2 = arrays.extract(testArray, 2);
expectTypeOf(extracted2).toExtend<number[]>();

const stringArray = ['a', 'b', 'c', 'b', 'a'];
const extracted3 = arrays.extract(stringArray, 'a');
expectTypeOf(extracted3).toExtend<string[]>();

const extracted4 = arrays.extract(stringArray, 'a', 'c');
expectTypeOf(extracted4).toExtend<string[]>();
// #endregion

// #region Test  arrays.exclude function
const excluded1 = arrays.exclude(testArray, 1, 3);
expectTypeOf(excluded1).toExtend<number[]>();

const excluded2 = arrays.exclude(testArray, 2);
expectTypeOf(excluded2).toExtend<number[]>();

const excluded3 = arrays.exclude(stringArray, 'a');
expectTypeOf(excluded3).toExtend<string[]>();

const excluded4 = arrays.exclude(stringArray, 'a', 'c');
expectTypeOf(excluded4).toExtend<string[]>();

const excludedEmpty = arrays.exclude(emptyArray);
expectTypeOf(excludedEmpty).toExtend<any[]>();
// #endregion

// #endregion
