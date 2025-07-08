import { expectTypeOf } from 'vitest';
import { eq } from './utils';

/**
 * Tests de types pour les fonctions utilitaires
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Utils Functions Type Tests', () => {
  describe('#T00 => eq function signature', () => {
    it('#T00.01 => should have correct function signature', () => {
      expectTypeOf(eq).toExtend<
        (value: unknown, ...arr: any[]) => boolean
      >();
    });
  });

  describe('#T01 => eq type behavior', () => {
    it('#T01.01 => should accept unknown as first parameter', () => {
      const unknownValue: unknown = 'test';
      const result = eq(unknownValue, 'test', 'other');
      expectTypeOf(result).toExtend<boolean>();
    });

    it('#T01.02 => should accept any types in array', () => {
      const result1 = eq('hello', 'hello', 'world');
      expectTypeOf(result1).toExtend<boolean>();

      const result2 = eq(42, 42, 'string', true, null);
      expectTypeOf(result2).toExtend<boolean>();

      const result3 = eq(true, false, true, 0, '');
      expectTypeOf(result3).toExtend<boolean>();
    });

    it('#T01.03 => should work with mixed types', () => {
      const numberValue = 42;
      const stringValue = 'test';
      const booleanValue = true;
      const nullValue = null;
      const undefinedValue = undefined;

      const result = eq(
        numberValue,
        stringValue,
        booleanValue,
        nullValue,
        undefinedValue,
      );
      expectTypeOf(result).toExtend<boolean>();
    });

    it('#T01.04 => should work with objects and arrays', () => {
      const obj = { a: 1 };
      const arr = [1, 2, 3];

      const result1 = eq(obj, obj, arr);
      expectTypeOf(result1).toExtend<boolean>();

      const result2 = eq(arr, obj, arr);
      expectTypeOf(result2).toExtend<boolean>();
    });

    it('#T01.05 => should work with empty array', () => {
      const result = eq('test');
      expectTypeOf(result).toExtend<boolean>();
    });

    it('#T01.06 => should work with complex nested values', () => {
      const complex1 = { nested: { deep: [1, 2, 3] } };
      const complex2 = { nested: { deep: [4, 5, 6] } };

      const result = eq(complex1, complex1, complex2);
      expectTypeOf(result).toExtend<boolean>();
    });
  });

  describe('#T02 => type inference edge cases', () => {
    it('#T02.01 => should handle generic input types', () => {
      function testWithGeneric<T>(value: T, ...comparisons: T[]): boolean {
        return eq(value, ...comparisons);
      }

      const numberResult = testWithGeneric(1, 2, 3);
      expectTypeOf(numberResult).toExtend<boolean>();

      const stringResult = testWithGeneric('a', 'b', 'c');
      expectTypeOf(stringResult).toExtend<boolean>();
    });

    it('#T02.02 => should maintain type safety with rest parameters', () => {
      const values = ['a', 'b', 'c'];
      const result = eq('a', ...values);
      expectTypeOf(result).toExtend<boolean>();
    });

    it('#T02.03 => should work with function values', () => {
      const fn1 = () => 'hello';
      const fn2 = () => 'world';

      const result = eq(fn1, fn1, fn2);
      expectTypeOf(result).toExtend<boolean>();
    });
  });
});
