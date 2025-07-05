import { expectTypeOf } from 'vitest';
import { arrays } from './arrays';
import type { AnyArray, TupleOf } from './arrays.types';

// Test arrays.type - constant type
expectTypeOf(arrays.type).toEqualTypeOf<unknown[]>();

// Test arrays.forceCast
expectTypeOf(arrays.forceCast('not array')).toEqualTypeOf<unknown[]>();
expectTypeOf(arrays.forceCast<string[]>('not array')).toEqualTypeOf<
  string[]
>();

// Test arrays.dynamic
expectTypeOf(arrays.dynamic([1, 2, 3] as const)).toEqualTypeOf<
  [1, 2, 3]
>();
expectTypeOf(arrays.dynamic(['a', 'b', 'c'] as const)).toEqualTypeOf<
  ['a', 'b', 'c']
>();

// Test arrays.is type guard
expectTypeOf(arrays.is<[1, 2, 3]>()).toEqualTypeOf<true>();
expectTypeOf(arrays.is<string>()).toEqualTypeOf<false>();
expectTypeOf(arrays.is<object>()).toEqualTypeOf<false>();

// Test arrays.low - generic array creation
expectTypeOf(arrays.low<string>()).toEqualTypeOf<string[]>();
expectTypeOf(arrays.low<number>()).toEqualTypeOf<number[]>();

// Test arrays.indexes
const testArray = ['a', 'b', 'c'] as const;
expectTypeOf(arrays.indexes(...testArray)).toEqualTypeOf<[0, 1, 2]>();
expectTypeOf(arrays.indexes.union(...testArray)).toEqualTypeOf<
  0 | 1 | 2
>();

// Test arrays.lengthOf
expectTypeOf(arrays.lengthOf(testArray)).toEqualTypeOf<3>();
expectTypeOf(arrays.lengthOf([1, 2, 3, 4] as const)).toEqualTypeOf<4>();

// Test arrays.tupleOf
expectTypeOf(arrays.tupleOf('a', 'b', 'c')).toEqualTypeOf<
  readonly ['a', 'b', 'c']
>();
expectTypeOf(arrays.tupleOf(1, 2, 3)).toEqualTypeOf<readonly [1, 2, 3]>();

// Test arrays.tupleOf.number - creates tuple of N identical elements
expectTypeOf(arrays.tupleOf.number('test', 3)).toEqualTypeOf<
  TupleOf<'test', 3>
>();
expectTypeOf(arrays.tupleOf.number(42, 2)).toEqualTypeOf<TupleOf<42, 2>>();

// Test arrays.tupleOf.number.is - type guard for specific tuple
const tupleChecker = arrays.tupleOf.number.is('hello', 3);
expectTypeOf(
  tupleChecker<['hello', 'hello', 'hello']>(),
).toEqualTypeOf<true>();
expectTypeOf(tupleChecker<['hello', 'hello']>()).toEqualTypeOf<false>();

// Test arrays.tupleOf.is - checks if type is array-like
expectTypeOf(arrays.tupleOf.is<[1, 2, 3]>()).toEqualTypeOf<true>();
expectTypeOf(arrays.tupleOf.is<string>()).toEqualTypeOf<false>();

// Test arrays.reduce - reduces array/tuple to union
expectTypeOf(arrays.reduce([1, 2, 3])).toEqualTypeOf<number>();
expectTypeOf(arrays.reduce('string')).toEqualTypeOf<string>();

// Test arrays.reduce.const
const constArray = [1, 2, 3] as const;
expectTypeOf(arrays.reduce.const(constArray)).toEqualTypeOf<1 | 2 | 3>();

// Test arrays.reduce.deep - deeply reduces nested arrays
const deepArray = [
  [1, 2],
  [3, 4],
] as const;
expectTypeOf(arrays.reduce.deep(deepArray)).toEqualTypeOf<1 | 2 | 3 | 4>();

// Test arrays.toArray - converts any type to array type
expectTypeOf(arrays.toArray('string')).toEqualTypeOf<AnyArray<string>>();
expectTypeOf(arrays.toArray([1, 2, 3] as const)).toEqualTypeOf<
  AnyArray<readonly [1, 2, 3]>
>();
expectTypeOf(arrays.toArray({ a: 1, b: 2 } as const)).toEqualTypeOf<
  AnyArray<Readonly<{ a: 1; b: 2 }>>
>();

// Test arrays.reverse - reverses tuple type
const numTuple = [1, 2, 3] as const;
const strTuple = ['a', 'b', 'c'] as const;
expectTypeOf(arrays.reverse(...numTuple)).toEqualTypeOf<[3, 2, 1]>();
expectTypeOf(arrays.reverse(...strTuple)).toEqualTypeOf<['c', 'b', 'a']>();

// Test arrays.freeze - makes array readonly
expectTypeOf(arrays.freeze(...numTuple)).toEqualTypeOf<
  Readonly<[1, 2, 3]>
>();
expectTypeOf(arrays.freeze('a', 'b')).toEqualTypeOf<
  Readonly<['a', 'b']>
>();

// Test arrays.extract - extracts matching types from array
const mixedArray = [1, 'a', true, 2, 'b'] as const;
expectTypeOf(arrays.extract(mixedArray, 1, 2)).toEqualTypeOf<[1, 2]>();
expectTypeOf(arrays.extract(mixedArray, 'a', 'b')).toEqualTypeOf<
  ['a', 'b']
>();

// Test arrays.exclude - excludes matching types from array
expectTypeOf(arrays.exclude(mixedArray, 1, 2)).toEqualTypeOf<
  ['a', true, 'b']
>();

expectTypeOf(arrays.exclude(mixedArray, 'a', 'b')).toExtend<
  (number | boolean)[]
>();

expectTypeOf(arrays.exclude(mixedArray, 'a', 'b')).toEqualTypeOf<
  [1, true, 2]
>();
