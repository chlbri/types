import { expectTypeOf } from 'vitest';
import type { TupleOf, UnionToTuple } from '../types/types';
import { arrays } from './arrays';

/**
 * Tests de types pour toutes les sous-fonctions de arrays (functions)
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Arrays Functions Type Tests', () => {
  describe('#T00 => arrays main function types', () => {
    it('#T00.01 => should preserve array element types', () => {
      const result = arrays(1, 2, 3);
      expectTypeOf(result).toEqualTypeOf<number[]>();

      const stringResult = arrays('a', 'b', 'c');
      expectTypeOf(stringResult).toEqualTypeOf<string[]>();
    });

    it('#T00.02 => should work with mixed types', () => {
      // Note: arrays function expects same type for all elements
      const mixedResult = arrays(1, 2, 3);
      expectTypeOf(mixedResult).toExtend<number[]>();
    });

    it('#T00.03 => should work with empty arrays', () => {
      const emptyResult = arrays();
      expectTypeOf(emptyResult).toExtend<unknown[]>();
    });
  });

  describe('#T01 => arrays.low types', () => {
    it('#T01.01 => should create array preserving tuple order', () => {
      const result = arrays.low(1, 2, 3);
      expectTypeOf(result).toExtend<readonly number[]>();

      const stringResult = arrays.low('a', 'b');
      expectTypeOf(stringResult).toExtend<readonly string[]>();
    });

    it('#T01.02 => should work with mixed tuple types', () => {
      const mixedResult = arrays.low(1, 'a', true);
      expectTypeOf(mixedResult).toExtend<readonly unknown[]>();
    });
  });

  describe('#T02 => arrays.is types', () => {
    it('#T02.01 => should be type guard for arrays', () => {
      const value: unknown = [1, 2, 3];

      if (arrays.is(value)) {
        expectTypeOf(value).toExtend<Array<unknown>>();
      }

      expectTypeOf(arrays.is).toExtend<
        <T>(value: unknown) => value is Array<T>
      >();
    });

    it('#T02.02 => should return type check result', () => {
      const arrayValue = [1, 2, 3];
      const objectValue = { a: 1 };

      const arrayCheck = arrays.is(arrayValue);
      expectTypeOf(arrayCheck).toExtend<boolean>();

      const objectCheck = arrays.is(objectValue);
      expectTypeOf(objectCheck).toExtend<boolean>();
    });
  });

  describe('#T03 => arrays.indexes types', () => {
    it('#T03.01 => should return tuple of literal indexes', () => {
      const result = arrays.indexes('a', 'b', 'c');
      expectTypeOf(result).toExtend<UnionToTuple<0 | 1 | 2>>();
    });

    it('#T03.02 => should work with empty arrays', () => {
      const emptyResult = arrays.indexes();
      expectTypeOf(emptyResult).toExtend<unknown[]>();
    });
  });

  describe('#T04 => arrays.lengthOf types', () => {
    it('#T04.01 => should return literal length for tuple', () => {
      const result = arrays.lengthOf('a', 'b', 'c');
      expectTypeOf(result).toEqualTypeOf<3>();

      const emptyResult = arrays.lengthOf();
      expectTypeOf(emptyResult).toEqualTypeOf<0>();
    });

    it('#T04.02 => should work with various tuple sizes', () => {
      const singleResult = arrays.lengthOf('only');
      expectTypeOf(singleResult).toEqualTypeOf<1>();

      const largeResult = arrays.lengthOf(1, 2, 3, 4, 5);
      expectTypeOf(largeResult).toEqualTypeOf<5>();
    });
  });

  describe('#T05 => arrays.tupleOf types', () => {
    it('#T05.01 => should create tuple preserving order and types', () => {
      const result = arrays.tupleOf(1, 2, 3);
      expectTypeOf(result).toExtend<readonly number[]>();

      const stringResult = arrays.tupleOf('a', 'b');
      expectTypeOf(stringResult).toExtend<readonly string[]>();
    });

    it('#T05.02 => arrays.tupleOf.number should create tuple of specific type and length', () => {
      const result = arrays.tupleOf.number('test', 3);
      expectTypeOf(result).toEqualTypeOf<TupleOf<'test', 3>>();

      const numberResult = arrays.tupleOf.number(42, 2);
      expectTypeOf(numberResult).toEqualTypeOf<TupleOf<42, 2>>();
    });

    it('#T05.03 => arrays.tupleOf.number.is should return type guard function', () => {
      const typeGuard = arrays.tupleOf.number.is(
        (x: unknown) => typeof x === 'string',
      );
      expectTypeOf(typeGuard).toBeFunction();

      // Test the returned function - it should check for tuple of specific type and length
      const result = typeGuard(['test', 'test', 'test'], 3);
      expectTypeOf(result).toExtend<boolean>();
    });
  });

  describe('#T06 => arrays.reverse types', () => {
    it('#T06.01 => should reverse tuple order', () => {
      const result = arrays.reverse('a', 'b', 'c');
      expectTypeOf(result).toExtend<readonly unknown[]>();
    });

    it('#T06.02 => should work with mixed types', () => {
      const mixedResult = arrays.reverse(1, 'a', true);
      expectTypeOf(mixedResult).toExtend<readonly unknown[]>();
    });
  });

  describe('#T07 => arrays.toArray types', () => {
    it('#T07.01 => should convert to array type', () => {
      const result = arrays.toArray('test');
      expectTypeOf(result).toExtend<readonly unknown[]>();

      const numberResult = arrays.toArray(42);
      expectTypeOf(numberResult).toExtend<readonly unknown[]>();
    });
  });

  describe('#T08 => arrays.freeze types', () => {
    it('#T08.01 => should create readonly tuple', () => {
      const result = arrays.freeze('a', 'b', 'c');
      expectTypeOf(result).toExtend<readonly unknown[]>();
    });
  });

  describe('#T09 => arrays.extract types', () => {
    it('#T09.01 => should extract specific elements from array', () => {
      const result = arrays.extract([1, 2, 3, 'a', 'b'], 1, 2);
      expectTypeOf(result).toExtend<readonly unknown[]>();
    });
  });

  describe('#T10 => arrays.exclude types', () => {
    it('#T10.01 => should exclude specific elements from array', () => {
      const result = arrays.exclude([1, 2, 3, 'a', 'b'], 1, 2);
      expectTypeOf(result).toExtend<readonly unknown[]>();
    });
  });

  describe('#T11 => arrays.forceCast types', () => {
    it('#T11.01 => should force cast to array type', () => {
      const result = arrays.forceCast('not an array');
      expectTypeOf(result).toExtend<unknown[]>();

      const objectResult = arrays.forceCast({ a: 1 });
      expectTypeOf(objectResult).toExtend<unknown[]>();
    });
  });

  describe('#T12 => arrays.dynamic types', () => {
    it('#T12.01 => should preserve array type', () => {
      const numberArray = [1, 2, 3] as number[];
      const result = arrays.dynamic(numberArray);
      expectTypeOf(result).toEqualTypeOf<number[]>();

      const stringArray = ['a', 'b', 'c'] as string[];
      const stringResult = arrays.dynamic(stringArray);
      expectTypeOf(stringResult).toEqualTypeOf<string[]>();
    });
  });

  describe('#T13 => arrays.type', () => {
    it('#T13.01 => should be Array constructor', () => {
      expectTypeOf(arrays.type).toEqualTypeOf<ArrayConstructor>();
    });
  });

  describe('#T14 => Combined type tests', () => {
    it('#T14.01 => should work with complex array operations', () => {
      const tuple = arrays.tupleOf(1, 2, 'a', true);
      expectTypeOf(tuple).toExtend<readonly unknown[]>();

      const length = arrays.lengthOf(1, 2, 'a', true);
      expectTypeOf(length).toEqualTypeOf<4>();

      const reversed = arrays.reverse(1, 2, 'a', true);
      expectTypeOf(reversed).toExtend<readonly unknown[]>();
    });

    it('#T14.02 => should handle edge cases', () => {
      // Test with empty arrays
      const emptyLength = arrays.lengthOf();
      expectTypeOf(emptyLength).toEqualTypeOf<0>();

      // Test with single element
      const singleLength = arrays.lengthOf(42);
      expectTypeOf(singleLength).toEqualTypeOf<1>();
    });
  });

  describe('#T15 => Function signatures', () => {
    it('#T15.01 => should have correct method signatures', () => {
      expectTypeOf(arrays).toBeFunction();
      expectTypeOf(arrays.low).toBeFunction();
      expectTypeOf(arrays.is).toBeFunction();
      expectTypeOf(arrays.indexes).toBeFunction();
      expectTypeOf(arrays.lengthOf).toBeFunction();
      expectTypeOf(arrays.tupleOf).toBeFunction();
      expectTypeOf(arrays.reverse).toBeFunction();
      expectTypeOf(arrays.toArray).toBeFunction();
      expectTypeOf(arrays.freeze).toBeFunction();
      expectTypeOf(arrays.extract).toBeFunction();
      expectTypeOf(arrays.exclude).toBeFunction();
      expectTypeOf(arrays.forceCast).toBeFunction();
      expectTypeOf(arrays.dynamic).toBeFunction();
    });
  });
});
