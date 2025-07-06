import { describe, expect, it } from 'vitest';
import { booleans } from './booleans';

describe('booleans functions', () => {
  describe('#00 => booleans main function', () => {
    describe('#00.01 => Acceptation', () => {
      it('#00.01.01 should be defined', () => {
        expect(booleans).toBeDefined();
      });

      it('#00.01.02 should be a function', () => {
        expect(typeof booleans).toBe('function');
      });

      it('#00.01.03 should have sub functions', () => {
        expect(Object.keys(booleans).length).toBeGreaterThan(0);
      });
    });

    describe('#00.02 => Usage of func "booleans("', () => {
      it('#00.02.01 should return true for true input', () => {
        const result = booleans(true);
        expect(result).toBe(true);
      });

      it('#00.02.02 should return false for false input', () => {
        const result = booleans(false);
        expect(result).toBe(false);
      });
    });
  });

  describe('#01 => booleans.forceCast', () => {
    it('#01.01 should force cast any value to boolean type', () => {
      const value = 'not a boolean';
      const result = booleans.forceCast(value);
      expect(result).toBe(value);
      // TypeScript should treat result as boolean type
    });

    it('#01.02 should work with actual boolean values', () => {
      const result1 = booleans.forceCast(true);
      const result2 = booleans.forceCast(false);
      expect(result1).toBe(true);
      expect(result2).toBe(false);
    });

    it('#01.03 should work with truthy values', () => {
      const result = booleans.forceCast(1);
      expect(result).toBe(1);
    });

    it('#01.04 should work with falsy values', () => {
      const result = booleans.forceCast(0);
      expect(result).toBe(0);
    });

    it('#01.05 should work with null and undefined', () => {
      const nullResult = booleans.forceCast(null);
      const undefinedResult = booleans.forceCast(undefined);
      expect(nullResult).toBeNull();
      expect(undefinedResult).toBeUndefined();
    });
  });

  describe('#02 => booleans.dynamic', () => {
    it('#02.01 should return the same boolean value', () => {
      const result1 = booleans.dynamic(true);
      const result2 = booleans.dynamic(false);
      expect(result1).toBe(true);
      expect(result2).toBe(false);
    });

    it('#02.02 should preserve the exact boolean type', () => {
      const trueValue = true;
      const falseValue = false;
      const result1 = booleans.dynamic(trueValue);
      const result2 = booleans.dynamic(falseValue);
      expect(result1).toBe(trueValue);
      expect(result2).toBe(falseValue);
    });
  });

  describe('#03 => booleans.is', () => {
    it('#03.01 should return true for boolean values', () => {
      expect(booleans.is(true)).toBe(true);
      expect(booleans.is(false)).toBe(true);
    });

    it('#03.02 should return false for non-boolean values', () => {
      expect(booleans.is(1)).toBe(false);
      expect(booleans.is(0)).toBe(false);
      expect(booleans.is('true')).toBe(false);
      expect(booleans.is('false')).toBe(false);
      expect(booleans.is(null)).toBe(false);
      expect(booleans.is(undefined)).toBe(false);
      expect(booleans.is({})).toBe(false);
      expect(booleans.is([])).toBe(false);
    });

    it('#03.03 should work as type guard', () => {
      const value: unknown = true;
      if (booleans.is(value)) {
        // TypeScript should infer value as boolean
        expect(typeof value).toBe('boolean');
      }
    });

    it('#03.04 should handle edge cases', () => {
      expect(booleans.is(Boolean(1))).toBe(true);
      expect(booleans.is(Boolean(0))).toBe(true);
      expect(booleans.is(new Boolean(true))).toBe(false); // Boolean object, not primitive
    });
  });

  describe('#04 => booleans.type', () => {
    it('#04.01 should be the Boolean constructor', () => {
      expect(booleans.type).toBe(Boolean);
    });

    it('#04.02 should be a function', () => {
      expect(typeof booleans.type).toBe('function');
    });

    it('#04.03 should have correct name', () => {
      expect(booleans.type.name).toBe('Boolean');
    });

    it('#04.04 should be able to create boolean objects', () => {
      const boolObj = new booleans.type(true);
      expect(boolObj).toBeInstanceOf(Boolean);
      expect(boolObj.valueOf()).toBe(true);
    });

    it('#04.05 should be able to convert values to boolean primitives', () => {
      expect(booleans.type(1)).toBe(true);
      expect(booleans.type(0)).toBe(false);
      expect(booleans.type('hello')).toBe(true);
      expect(booleans.type('')).toBe(false);
    });
  });

  describe('#05 => booleans.true', () => {
    describe('#05.01 => booleans.true main function', () => {
      it('#05.01.01 should be defined', () => {
        expect(booleans.true).toBeDefined();
        expect(typeof booleans.true).toBe('function');
      });

      it('#05.01.02 should return true', () => {
        const result = booleans.true(true);
        expect(result).toBe(true);
      });

      it('#05.01.03 should work with any input (cast to true type)', () => {
        const result = booleans.true(false as any);
        expect(result).toBe(false); // Input is preserved but typed as true
      });
    });

    describe('#05.02 => booleans.true.CONST', () => {
      it('#05.02.01 should be the literal true value', () => {
        expect(booleans.true.CONST).toBe(true);
      });

      it('#05.02.02 should be exactly true, not any truthy value', () => {
        expect(booleans.true.CONST).toBe(true);
        expect(booleans.true.CONST).not.toBe(1);
        expect(booleans.true.CONST).not.toBe('true');
      });
    });

    describe('#05.03 => booleans.true.is', () => {
      it('#05.03.01 should return true only for true value', () => {
        expect(booleans.true.is(true)).toBe(true);
        expect(booleans.true.is(false)).toBe(false);
      });

      it('#05.03.02 should return false for truthy non-true values', () => {
        expect(booleans.true.is(1)).toBe(false);
        expect(booleans.true.is('true')).toBe(false);
        expect(booleans.true.is({})).toBe(false);
        expect(booleans.true.is([])).toBe(false);
        expect(booleans.true.is('non-empty string')).toBe(false);
      });

      it('#05.03.03 should return false for falsy values', () => {
        expect(booleans.true.is(0)).toBe(false);
        expect(booleans.true.is('')).toBe(false);
        expect(booleans.true.is(null)).toBe(false);
        expect(booleans.true.is(undefined)).toBe(false);
        expect(booleans.true.is(NaN)).toBe(false);
      });

      it('#05.03.04 should work as strict type guard for true', () => {
        const value: boolean = true;
        if (booleans.true.is(value)) {
          // TypeScript should infer value as literal true
          expect(value).toBe(true);
        }
      });

      it('#05.03.05 should handle Boolean objects', () => {
        expect(booleans.true.is(new Boolean(true))).toBe(false);
        expect(booleans.true.is(Boolean(true))).toBe(true);
      });
    });

    describe('#05.04 => booleans.true other methods', () => {
      it('#05.04.01 should have forceCast method', () => {
        expect(booleans.true.forceCast).toBeDefined();
        expect(typeof booleans.true.forceCast).toBe('function');
      });

      it('#05.04.02 should have dynamic method', () => {
        expect(booleans.true.dynamic).toBeDefined();
        expect(typeof booleans.true.dynamic).toBe('function');
      });

      it('#05.04.03 should have CONST property', () => {
        expect(booleans.true.CONST).toBeDefined();
      });

      it('#05.04.04 forceCast should work with any value', () => {
        const result = booleans.true.forceCast('not true');
        expect(result).toBe('not true'); // Value preserved but typed as true
      });

      it('#05.04.05 dynamic should preserve true values', () => {
        const result = booleans.true.dynamic(true);
        expect(result).toBe(true);
      });
    });
  });

  describe('#06 => booleans.false', () => {
    describe('#06.01 => booleans.false main function', () => {
      it('#06.01.01 should be defined', () => {
        expect(booleans.false).toBeDefined();
        expect(typeof booleans.false).toBe('function');
      });

      it('#06.01.02 should return false', () => {
        const result = booleans.false(false);
        expect(result).toBe(false);
      });

      it('#06.01.03 should work with any input (cast to false type)', () => {
        const result = booleans.false(true as any);
        expect(result).toBe(true); // Input is preserved but typed as false
      });
    });

    describe('#06.02 => booleans.false.CONST', () => {
      it('#06.02.01 should be the literal false value', () => {
        expect(booleans.false.CONST).toBe(false);
      });

      it('#06.02.02 should be exactly false, not any falsy value', () => {
        expect(booleans.false.CONST).toBe(false);
        expect(booleans.false.CONST).not.toBe(0);
        expect(booleans.false.CONST).not.toBe('');
        expect(booleans.false.CONST).not.toBe(null);
        expect(booleans.false.CONST).not.toBe(undefined);
      });
    });

    describe('#06.03 => booleans.false.is', () => {
      it('#06.03.01 should return true only for false value', () => {
        expect(booleans.false.is(false)).toBe(true);
        expect(booleans.false.is(true)).toBe(false);
      });

      it('#06.03.02 should return false for falsy non-false values', () => {
        expect(booleans.false.is(0)).toBe(false);
        expect(booleans.false.is('')).toBe(false);
        expect(booleans.false.is(null)).toBe(false);
        expect(booleans.false.is(undefined)).toBe(false);
        expect(booleans.false.is(NaN)).toBe(false);
      });

      it('#06.03.03 should return false for truthy values', () => {
        expect(booleans.false.is(1)).toBe(false);
        expect(booleans.false.is('false')).toBe(false);
        expect(booleans.false.is({})).toBe(false);
        expect(booleans.false.is([])).toBe(false);
        expect(booleans.false.is('non-empty string')).toBe(false);
      });

      it('#06.03.04 should work as strict type guard for false', () => {
        const value: boolean = false;
        if (booleans.false.is(value)) {
          // TypeScript should infer value as literal false
          expect(value).toBe(false);
        }
      });

      it('#06.03.05 should handle Boolean objects', () => {
        expect(booleans.false.is(new Boolean(false))).toBe(false);
        expect(booleans.false.is(Boolean(false))).toBe(true);
      });
    });

    describe('#06.04 => booleans.false other methods', () => {
      it('#06.04.01 should have forceCast method', () => {
        expect(booleans.false.forceCast).toBeDefined();
        expect(typeof booleans.false.forceCast).toBe('function');
      });

      it('#06.04.02 should have dynamic method', () => {
        expect(booleans.false.dynamic).toBeDefined();
        expect(typeof booleans.false.dynamic).toBe('function');
      });

      it('#06.04.03 should have CONST property', () => {
        expect(booleans.false.CONST).toBeDefined();
      });

      it('#06.04.04 forceCast should work with any value', () => {
        const result = booleans.false.forceCast('not false');
        expect(result).toBe('not false'); // Value preserved but typed as false
      });

      it('#06.04.05 dynamic should preserve false values', () => {
        const result = booleans.false.dynamic(false);
        expect(result).toBe(false);
      });
    });
  });

  describe('#07 => booleans integration tests', () => {
    it('#07.01 should work with mixed boolean operations', () => {
      const trueValue = booleans.true(true);
      const falseValue = booleans.false(false);

      expect(booleans.is(trueValue)).toBe(true);
      expect(booleans.is(falseValue)).toBe(true);
      expect(booleans.true.is(trueValue)).toBe(true);
      expect(booleans.false.is(falseValue)).toBe(true);
      expect(booleans.true.is(falseValue)).toBe(false);
      expect(booleans.false.is(trueValue)).toBe(false);
    });

    it('#07.02 should handle type conversions correctly', () => {
      const convertedTrue = booleans.type(1);
      const convertedFalse = booleans.type(0);

      expect(convertedTrue).toBe(true);
      expect(convertedFalse).toBe(false);
      expect(booleans.is(convertedTrue)).toBe(true);
      expect(booleans.is(convertedFalse)).toBe(true);
    });

    it('#07.03 should maintain consistency across all boolean utilities', () => {
      const testValues = [
        true,
        false,
        1,
        0,
        'true',
        '',
        null,
        undefined,
        {},
        [],
      ];

      testValues.forEach(value => {
        const isBool = booleans.is(value);
        const isTrue = booleans.true.is(value);
        const isFalse = booleans.false.is(value);

        if (isBool) {
          // If it's a boolean, it should be either true or false, but not both
          expect(isTrue || isFalse).toBe(true);
          expect(isTrue && isFalse).toBe(false);
        } else {
          // If it's not a boolean, it can't be specifically true or false
          expect(isTrue).toBe(false);
          expect(isFalse).toBe(false);
        }
      });
    });

    it('#07.04 should work with complex type checking scenarios', () => {
      const mixedArray = [true, false, 1, 0, 'boolean', null];
      const booleans_only = mixedArray.filter(booleans.is);
      const trues_only = mixedArray.filter(booleans.true.is);
      const falses_only = mixedArray.filter(booleans.false.is);

      expect(booleans_only).toEqual([true, false]);
      expect(trues_only).toEqual([true]);
      expect(falses_only).toEqual([false]);
    });

    it('#07.05 should handle edge cases consistently', () => {
      // Test with Boolean constructor results
      const primitiveTrue = Boolean(1);
      const primitiveFalse = Boolean(0);
      const objectTrue = new Boolean(true);
      const objectFalse = new Boolean(false);

      // Primitives should work
      expect(booleans.is(primitiveTrue)).toBe(true);
      expect(booleans.is(primitiveFalse)).toBe(true);
      expect(booleans.true.is(primitiveTrue)).toBe(true);
      expect(booleans.false.is(primitiveFalse)).toBe(true);

      // Objects should not be recognized as boolean primitives
      expect(booleans.is(objectTrue)).toBe(false);
      expect(booleans.is(objectFalse)).toBe(false);
      expect(booleans.true.is(objectTrue)).toBe(false);
      expect(booleans.false.is(objectFalse)).toBe(false);
    });
  });
});
