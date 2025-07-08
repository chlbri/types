import { expectTypeOf } from 'vitest';
import type { PrimitiveObject } from '../types/types';
import deepClone from './deepclone';

/**
 * Tests de types pour la fonction deepClone
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('DeepClone Type Tests', () => {
  describe('#T00 => deepClone function signature', () => {
    it('#T00.01 => should have correct function signature', () => {
      expectTypeOf(deepClone).toExtend<
        <I extends PrimitiveObject>(value: I, refs?: Map<I, I>) => I
      >();
    });
  });

  describe('#T01 => object cloning types', () => {
    it('#T01.01 => should preserve object type structure', () => {
      const obj = { a: 1, b: 'test', c: true };
      const cloned = deepClone(obj);
      expectTypeOf(cloned).toExtend<{
        a: number;
        b: string;
        c: boolean;
      }>();
    });

    it('#T01.02 => should work with nested objects', () => {
      const nested = {
        level1: {
          level2: {
            value: 'deep',
          },
        },
        other: 42,
      };
      const cloned = deepClone(nested);
      expectTypeOf(cloned).toExtend<{
        level1: { level2: { value: string } };
        other: number;
      }>();
    });

    it('#T01.03 => should work with const objects', () => {
      const constObj = { a: 1, b: 'test' } as const;
      const cloned = deepClone(constObj);
      expectTypeOf(cloned).toExtend<{
        readonly a: 1;
        readonly b: 'test';
      }>();
    });
  });

  describe('#T02 => primitive types', () => {
    it('#T02.01 => should handle primitive values', () => {
      const num = 42;
      const clonedNum = deepClone(num);
      expectTypeOf(clonedNum).toExtend<number>();

      const str = 'hello';
      const clonedStr = deepClone(str);
      expectTypeOf(clonedStr).toExtend<string>();

      const bool = true;
      const clonedBool = deepClone(bool);
      expectTypeOf(clonedBool).toExtend<boolean>();
    });

    it('#T02.02 => should handle null and undefined', () => {
      const nullValue = null;
      const clonedNull = deepClone(nullValue);
      expectTypeOf(clonedNull).toExtend<null>();

      const undefinedValue = undefined;
      const clonedUndefined = deepClone(undefinedValue);
      expectTypeOf(clonedUndefined).toExtend<undefined>();
    });
  });

  describe('#T03 => complex structures', () => {
    it('#T03.01 => should handle objects with primitive properties', () => {
      const objWithPrimitives = {
        id: 1,
        name: 'test',
        active: true,
        score: 95.5,
        data: null,
      };
      const cloned = deepClone(objWithPrimitives);
      expectTypeOf(cloned).toExtend<{
        id: number;
        name: string;
        active: boolean;
        score: number;
        data: null;
      }>();
    });

    it('#T03.02 => should handle deeply nested objects', () => {
      const deeplyNested = {
        level1: {
          level2: {
            level3: {
              value: 'deep',
              count: 42,
            },
          },
        },
      };
      const cloned = deepClone(deeplyNested);
      expectTypeOf(cloned).toExtend<{
        level1: {
          level2: {
            level3: {
              value: string;
              count: number;
            };
          };
        };
      }>();
    });
  });

  describe('#T04 => edge cases', () => {
    it('#T04.01 => should handle empty objects', () => {
      const emptyObj = {};
      const clonedEmptyObj = deepClone(emptyObj);
      expectTypeOf(clonedEmptyObj).toExtend<object>();
    });

    it('#T04.02 => should work with optional references parameter', () => {
      const obj = { a: 1 };
      const refs = new Map();

      const clonedWithRefs = deepClone(obj, refs);
      expectTypeOf(clonedWithRefs).toExtend<{ a: number }>();

      const clonedWithoutRefs = deepClone(obj);
      expectTypeOf(clonedWithoutRefs).toExtend<{ a: number }>();
    });
  });

  describe('#T05 => type inference', () => {
    it('#T05.01 => should infer generic types correctly', () => {
      // Test that the generic I is properly inferred
      function testGeneric<T extends PrimitiveObject>(input: T): T {
        return deepClone(input);
      }

      const result = testGeneric({ x: 10, y: 'test' });
      expectTypeOf(result).toExtend<{ x: number; y: string }>();
    });

    it('#T05.02 => should maintain type constraints', () => {
      // Ensure the function only accepts PrimitiveObject types
      expectTypeOf(deepClone).parameter(0).toExtend<PrimitiveObject>();
    });
  });

  describe('#T06 => mixed types', () => {
    it('#T06.01 => should handle objects with different primitive types', () => {
      const mixed = {
        str: 'hello',
        num: 42,
        bool: true,
        nullValue: null,
        undefinedValue: undefined,
        nested: {
          inner: 'value',
        },
      };
      const cloned = deepClone(mixed);
      expectTypeOf(cloned).toExtend<{
        str: string;
        num: number;
        bool: boolean;
        nullValue: null;
        undefinedValue: undefined;
        nested: {
          inner: string;
        };
      }>();
    });

    it('#T06.02 => should preserve readonly properties', () => {
      const readonlyObj = {
        readonly: 'value',
        mutable: 42,
      } as const;
      const cloned = deepClone(readonlyObj);
      expectTypeOf(cloned).toExtend<{
        readonly readonly: 'value';
        readonly mutable: 42;
      }>();
    });
  });
});
