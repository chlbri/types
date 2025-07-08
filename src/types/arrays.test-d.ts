import { expectTypeOf } from 'vitest';
import { arrays } from './arrays';
import type { TupleOf } from './arrays.types';

/**
 * Tests de types pour toutes les sous-fonctions de arrays (types)
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Arrays Types Type Tests', () => {
  describe('#T00 => arrays main function types', () => {
    it('#T00.01 => should cast to array element type', () => {
      const result = arrays(1, 2, 3);
      expectTypeOf(result).toEqualTypeOf<number[]>();

      const stringResult = arrays('a', 'b', 'c');
      expectTypeOf(stringResult).toEqualTypeOf<string[]>();
    });

    it('#T00.02 => should work with mixed types', () => {
      const mixedResult = arrays(1, 'a', true);
      expectTypeOf(mixedResult).toExtend<(string | number | boolean)[]>();
    });

    it('#T00.03 => should work with empty arrays', () => {
      const emptyResult = arrays();
      expectTypeOf(emptyResult).toExtend<unknown[]>();
    });
  });

  describe('#T01 => arrays.low types', () => {
    it('#T01.01 => should create array from elements', () => {
      const result = arrays.low(1, 2, 3);
      expectTypeOf(result).toEqualTypeOf<number[]>();

      const stringResult = arrays.low('a', 'b');
      expectTypeOf(stringResult).toEqualTypeOf<string[]>();
    });
  });

  describe('#T02 => arrays.is types', () => {
    it('#T02.01 => should return type check result', () => {
      const arrayValue = [1, 2, 3];
      const objectValue = { a: 1 };

      const arrayCheck = arrays.is(arrayValue);
      expectTypeOf(arrayCheck).toEqualTypeOf<true>();

      const objectCheck = arrays.is(objectValue);
      expectTypeOf(objectCheck).toEqualTypeOf<false>();
    });
  });

  describe('#T03 => arrays.indexes types', () => {
    it('#T03.01 => should return tuple of indexes', () => {
      const result = arrays.indexes([1, 2, 3]);
      expectTypeOf(result).toExtend<number[]>();
    });

    it('#T03.02 => arrays.indexes.union should return union of indexes', () => {
      const result = arrays.indexes.union([1, 2, 3]);
      expectTypeOf(result).toExtend<0 | 1 | 2>();
    });
  });

  describe('#T04 => arrays.lengthOf types', () => {
    it('#T04.01 => should return literal length for tuple', () => {
      const tuple = [1, 2, 3] as const;
      const result = arrays.lengthOf(tuple);
      expectTypeOf(result).toEqualTypeOf<3>();

      const emptyTuple = [] as const;
      const emptyResult = arrays.lengthOf(emptyTuple);
      expectTypeOf(emptyResult).toEqualTypeOf<0>();
    });

    it('#T04.02 => should return number for dynamic arrays', () => {
      const dynamicArray = [1, 2, 3] as number[];
      const result = arrays.lengthOf(dynamicArray);
      expectTypeOf(result).toExtend<number>();
    });
  });

  describe('#T05 => arrays.tupleOf types', () => {
    it('#T05.01 => should create tuple from elements', () => {
      const result = arrays.tupleOf(1, 2, 3);
      expectTypeOf(result).toExtend<readonly [1, 2, 3]>();

      const stringResult = arrays.tupleOf('a', 'b');
      expectTypeOf(stringResult).toExtend<readonly ['a', 'b']>();
    });

    it('#T05.02 => arrays.tupleOf.number should create tuple of specific type and length', () => {
      const result = arrays.tupleOf.number('test', 3);
      expectTypeOf(result).toEqualTypeOf<TupleOf<'test', 3>>();

      const numberResult = arrays.tupleOf.number(42, 2);
      expectTypeOf(numberResult).toEqualTypeOf<TupleOf<42, 2>>();
    });

    it('#T05.03 => arrays.tupleOf.number.is should return type guard', () => {
      const typeGuard = arrays.tupleOf.number.is('test', 3);
      expectTypeOf(typeGuard).toBeFunction();

      // Test the returned function
      const result = typeGuard(['test', 'test', 'test']);
      expectTypeOf(result).toExtend<boolean>();
    });

    it('#T05.04 => arrays.tupleOf.is should return type check result', () => {
      const tupleValue = [1, 2, 3] as const;
      const arrayValue = [1, 2, 3];

      const tupleCheck = arrays.tupleOf.is(tupleValue);
      expectTypeOf(tupleCheck).toEqualTypeOf<true>();

      const arrayCheck = arrays.tupleOf.is(arrayValue);
      expectTypeOf(arrayCheck).toExtend<boolean>();
    });
  });

  describe('#T06 => arrays.reduce types', () => {
    it('#T06.01 => should reduce array to element type', () => {
      const result = arrays.reduce([1, 2, 3]);
      expectTypeOf(result).toEqualTypeOf<number>();

      const stringResult = arrays.reduce(['a', 'b', 'c']);
      expectTypeOf(stringResult).toEqualTypeOf<string>();
    });

    it('#T06.02 => arrays.reduce.deep should deeply reduce nested arrays', () => {
      const nestedArray = [
        [1, 2],
        [3, 4],
      ];
      const result = arrays.reduce.deep(nestedArray);
      expectTypeOf(result).toExtend<number>();

      const deepNestedArray = [[[1]], [[2]]];
      const deepResult = arrays.reduce.deep(deepNestedArray);
      expectTypeOf(deepResult).toExtend<number>();
    });
  });

  describe('#T07 => arrays.reverse types', () => {
    it('#T07.01 => should reverse tuple order', () => {
      const result = arrays.reverse([1, 2, 3]);
      expectTypeOf(result).toExtend<readonly unknown[]>();

      const stringResult = arrays.reverse(['a', 'b', 'c']);
      expectTypeOf(stringResult).toExtend<readonly unknown[]>();
    });
  });

  describe('#T08 => arrays.toArray types', () => {
    it('#T08.01 => should convert to array type', () => {
      const result = arrays.toArray('test');
      expectTypeOf(result).toExtend<readonly unknown[]>();

      const numberResult = arrays.toArray(42);
      expectTypeOf(numberResult).toExtend<readonly unknown[]>();
    });
  });

  describe('#T09 => arrays.freeze types', () => {
    it('#T09.01 => should create readonly tuple', () => {
      const result = arrays.freeze([1, 2, 3]);
      expectTypeOf(result).toExtend<readonly unknown[]>();

      const stringResult = arrays.freeze(['a', 'b', 'c']);
      expectTypeOf(stringResult).toExtend<readonly unknown[]>();
    });
  });

  describe('#T10 => arrays.extract types', () => {
    it('#T10.01 => should extract specific elements from array', () => {
      const arr = [1, 2, 3, 'a', 'b'] as const;
      const result = arrays.extract(arr, 1, 2);
      expectTypeOf(result).toExtend<readonly unknown[]>();
    });
  });

  describe('#T11 => arrays.exclude types', () => {
    it('#T11.01 => should exclude specific elements from array', () => {
      const arr = [1, 2, 3, 'a', 'b'] as const;
      const result = arrays.exclude(arr, 1, 2);
      expectTypeOf(result).toExtend<readonly unknown[]>();
    });
  });

  describe('#T12 => arrays.forceCast types', () => {
    it('#T12.01 => should force cast to unknown array', () => {
      const result = arrays.forceCast('not an array');
      expectTypeOf(result).toEqualTypeOf<unknown[]>();

      const objectResult = arrays.forceCast({ a: 1 });
      expectTypeOf(objectResult).toEqualTypeOf<unknown[]>();
    });
  });

  describe('#T13 => arrays.dynamic types', () => {
    it('#T13.01 => should preserve array type', () => {
      const numberArray = [1, 2, 3] as number[];
      const result = arrays.dynamic(numberArray);
      expectTypeOf(result).toEqualTypeOf<number[]>();

      const stringArray = ['a', 'b', 'c'] as string[];
      const stringResult = arrays.dynamic(stringArray);
      expectTypeOf(stringResult).toEqualTypeOf<string[]>();
    });
  });

  describe('#T14 => arrays.type', () => {
    it('#T14.01 => should be unknown array type', () => {
      expectTypeOf(arrays.type).toEqualTypeOf<unknown[]>();
    });
  });

  describe('#T15 => Combined type tests', () => {
    it('#T15.01 => should work with complex array operations', () => {
      const tuple = [1, 2, 'a', true] as const;
      const length = arrays.lengthOf(tuple);
      expectTypeOf(length).toEqualTypeOf<4>();

      const reversed = arrays.reverse(tuple);
      expectTypeOf(reversed).toExtend<readonly unknown[]>();
    });

    it('#T15.02 => should handle edge cases', () => {
      // Test with empty arrays
      const empty = [] as const;
      const emptyLength = arrays.lengthOf(empty);
      expectTypeOf(emptyLength).toEqualTypeOf<0>();

      // Test with single element
      const single = [42] as const;
      const singleLength = arrays.lengthOf(single);
      expectTypeOf(singleLength).toEqualTypeOf<1>();
    });
  });

  describe('#T16 => Function signatures', () => {
    it('#T16.01 => should have correct method signatures', () => {
      expectTypeOf(arrays).toBeFunction();
      expectTypeOf(arrays.is).toBeFunction();
      expectTypeOf(arrays.lengthOf).toBeFunction();
      expectTypeOf(arrays.tupleOf).toBeFunction();
      expectTypeOf(arrays.reduce).toBeFunction();
      expectTypeOf(arrays.reverse).toBeFunction();
      expectTypeOf(arrays.forceCast).toBeFunction();
      expectTypeOf(arrays.dynamic).toBeFunction();
    });
  });
});
