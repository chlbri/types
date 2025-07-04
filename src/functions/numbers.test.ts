import { DIGITS as array } from '../constants/numbers';
import { numbers } from './numbers';

describe('numbers', () => {
  describe('#00 main', () => {
    describe('#01 => Acceptation', () => {
      it('#01.01 should be defined', () => {
        expect(numbers).toBeDefined();
      });

      it('#01.02 should be a function', () => {
        expect(typeof numbers).toBe('function');
      });

      it('#01.03 should have sub functions', () => {
        expect(Object.keys(numbers).length).toBeGreaterThan(0);
      });
    });

    describe('#02 => Usage of func "numbers("', () => {
      describe('#02.01 working with numbers', () => {
        it('#02.01.01 should return 1 when passed 1', () => {
          expect(numbers(1)).toBe(1);
        });

        it('#02.01.02 should return 0 when passed 0', () => {
          expect(numbers(0)).toBe(0);
        });

        it('#02.01.03 should return -1 when passed -1', () => {
          expect(numbers(-1)).toBe(-1);
        });

        it('#02.01.04 should return 1.5 when passed 1.5', () => {
          expect(numbers(1.5)).toBe(1.5);
        });

        it('#02.01.05 should return Infinity when passed Infinity', () => {
          expect(numbers(Infinity)).toBe(Infinity);
        });

        it('#02.01.06 should return NaN when passed NaN', () => {
          expect(numbers(NaN)).toBe(NaN);
        });
      });

      describe('#02.02 working with edge cases', () => {
        it('#02.02.01 should handle very large numbers', () => {
          const largeNumber = Number.MAX_SAFE_INTEGER;
          expect(numbers(largeNumber)).toBe(largeNumber);
        });

        it('#02.02.02 should handle very small numbers', () => {
          const smallNumber = Number.MIN_SAFE_INTEGER;
          expect(numbers(smallNumber)).toBe(smallNumber);
        });

        it('#02.02.03 should handle decimal precision', () => {
          expect(numbers(0.1 + 0.2)).toBe(0.1 + 0.2);
        });
      });

      describe('#02.03 type safety testing', () => {
        it('#02.03.01 should return value when passed a string (with TS error)', () => {
          //@ts-expect-error for testing purposes
          expect(numbers('1')).toBe('1');
        });

        it('#02.03.02 should return value when passed an object (with TS error)', () => {
          //@ts-expect-error for testing purposes
          expect(numbers({})).toEqual({});
        });

        it('#02.03.03 should return value when passed an array (with TS error)', () => {
          //@ts-expect-error for testing purposes
          expect(numbers([])).toEqual([]);
        });

        it('#02.03.04 should return value when passed null (with TS error)', () => {
          //@ts-expect-error for testing purposes
          expect(numbers(null)).toBe(null);
        });

        it('#02.03.05 should return value when passed undefined (with TS error)', () => {
          //@ts-expect-error for testing purposes
          expect(numbers(undefined)).toBeUndefined();
        });
      });
    });
  });

  describe('#01 numbers.forceCast', () => {
    it('#01.01 should force cast any value to number type', () => {
      const value = 'not a number';
      const result = numbers.forceCast(value);
      expect(result).toBe(value);
      // TypeScript should treat result as number type
    });

    it('#01.02 should work with actual numbers', () => {
      const value = 42;
      const result = numbers.forceCast(value);
      expect(result).toBe(value);
    });

    it('#01.03 should work with null', () => {
      const value = null;
      const result = numbers.forceCast(value);
      expect(result).toBe(value);
    });

    it('#01.04 should work with objects', () => {
      const value = { a: 1, b: 2 };
      const result = numbers.forceCast(value);
      expect(result).toBe(value);
    });

    it('#01.05 should work with arrays', () => {
      const value = [1, 2, 3];
      const result = numbers.forceCast(value);
      expect(result).toBe(value);
    });

    it('#01.06 should work with undefined', () => {
      const value = undefined;
      const result = numbers.forceCast(value);
      expect(result).toBe(value);
    });
  });

  describe('#02 numbers.dynamic', () => {
    it('#02.01 should return number as-is for numbers', () => {
      const num = 42;
      const result = numbers.dynamic(num);
      expect(result).toBe(num);
      expect(result).toBe(42);
    });

    it('#02.02 should preserve specific number values', () => {
      const num = 3.14159;
      const result = numbers.dynamic(num);
      expect(result).toBe(num);
      expect(result).toBe(3.14159);
    });

    it('#02.03 should work with integer numbers', () => {
      const num = 100;
      const result = numbers.dynamic(num);
      expect(result).toBe(num);
      expect(result).toBe(100);
    });

    it('#02.04 should work with negative numbers', () => {
      const num = -25;
      const result = numbers.dynamic(num);
      expect(result).toBe(num);
      expect(result).toBe(-25);
    });

    it('#02.05 should work with zero', () => {
      const num = 0;
      const result = numbers.dynamic(num);
      expect(result).toBe(num);
      expect(result).toBe(0);
    });

    it('#02.06 should work with special number values', () => {
      expect(numbers.dynamic(Infinity)).toBe(Infinity);
      expect(numbers.dynamic(-Infinity)).toBe(-Infinity);
      expect(numbers.dynamic(NaN)).toBe(NaN);
    });
  });

  describe('#03 numbers.is', () => {
    it('#03.01 should return true for integers', () => {
      expect(numbers.is(42)).toBe(true);
      expect(numbers.is(0)).toBe(true);
      expect(numbers.is(-17)).toBe(true);
    });

    it('#03.02 should return true for floats', () => {
      expect(numbers.is(3.14)).toBe(true);
      expect(numbers.is(0.5)).toBe(true);
      expect(numbers.is(-2.7)).toBe(true);
    });

    it('#03.03 should return true for special number values', () => {
      expect(numbers.is(Infinity)).toBe(true);
      expect(numbers.is(-Infinity)).toBe(true);
      expect(numbers.is(NaN)).toBe(true);
    });

    it('#03.04 should return false for non-numbers', () => {
      expect(numbers.is('42')).toBe(false);
      expect(numbers.is(null)).toBe(false);
      expect(numbers.is(undefined)).toBe(false);
      expect(numbers.is({})).toBe(false);
      expect(numbers.is([])).toBe(false);
      expect(numbers.is(true)).toBe(false);
    });

    it('#03.05 should return false for numeric strings', () => {
      expect(numbers.is('0')).toBe(false);
      expect(numbers.is('3.14')).toBe(false);
      expect(numbers.is('-5')).toBe(false);
    });

    it('#03.06 should handle edge cases', () => {
      expect(numbers.is(Number.MAX_VALUE)).toBe(true);
      expect(numbers.is(Number.MIN_VALUE)).toBe(true);
      expect(numbers.is(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(numbers.is(Number.MIN_SAFE_INTEGER)).toBe(true);
    });
  });

  describe('#04 numbers.digit', () => {
    describe('#04.01 main digit function', () => {
      it('#04.01.01 should return digit when passed digit', () => {
        expect(numbers.digit(0)).toBe(0);
        expect(numbers.digit(5)).toBe(5);
        expect(numbers.digit(9)).toBe(9);
      });

      it('#04.01.02 should return value when passed non-digit (with TS error)', () => {
        //@ts-expect-error for testing purposes
        expect(numbers.digit(42)).toBe(42);
      });

      it('#04.01.03 should return value when passed string (with TS error)', () => {
        //@ts-expect-error for testing purposes
        expect(numbers.digit('5')).toBe('5');
      });
    });

    describe('#04.02 numbers.digit.forceCast', () => {
      it('#04.02.01 should force cast any value to digit type', () => {
        const value = 'not a digit';
        const result = numbers.digit.forceCast(value);
        expect(result).toBe(value);
        // TypeScript should treat result as digit type
      });

      it('#04.02.02 should work with actual digits', () => {
        const value = 7;
        const result = numbers.digit.forceCast(value);
        expect(result).toBe(value);
      });

      it('#04.02.03 should work with non-digit numbers', () => {
        const value = 42;
        const result = numbers.digit.forceCast(value);
        expect(result).toBe(value);
      });

      it('#04.02.04 should work with null', () => {
        const value = null;
        const result = numbers.digit.forceCast(value);
        expect(result).toBe(value);
      });

      it('#04.02.05 should work with strings', () => {
        const value = '8';
        const result = numbers.digit.forceCast(value);
        expect(result).toBe(value);
      });
    });

    describe('#04.03 numbers.digit.dynamic', () => {
      it('#04.03.01 should return digit as-is for digits', () => {
        const digit = 3;
        const result = numbers.digit.dynamic(digit);
        expect(result).toBe(digit);
        expect(result).toBe(3);
      });

      it('#04.03.02 should preserve specific digit values', () => {
        expect(numbers.digit.dynamic(0)).toBe(0);
        expect(numbers.digit.dynamic(1)).toBe(1);
        expect(numbers.digit.dynamic(9)).toBe(9);
      });

      it('#04.03.03 should work with all digits', () => {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
        for (const digit of digits) {
          const result = numbers.digit.dynamic(digit);
          expect(result).toBe(digit);
        }
      });
    });

    describe('#04.04 numbers.digit.is', () => {
      it('#04.04.01 should return true for single digits (0-9)', () => {
        expect(numbers.digit.is(0)).toBe(true);
        expect(numbers.digit.is(1)).toBe(true);
        expect(numbers.digit.is(2)).toBe(true);
        expect(numbers.digit.is(3)).toBe(true);
        expect(numbers.digit.is(4)).toBe(true);
        expect(numbers.digit.is(5)).toBe(true);
        expect(numbers.digit.is(6)).toBe(true);
        expect(numbers.digit.is(7)).toBe(true);
        expect(numbers.digit.is(8)).toBe(true);
        expect(numbers.digit.is(9)).toBe(true);
      });

      it('#04.04.02 should return false for non-digit numbers', () => {
        expect(numbers.digit.is(10)).toBe(false);
        expect(numbers.digit.is(-1)).toBe(false);
        expect(numbers.digit.is(42)).toBe(false);
        expect(numbers.digit.is(3.14)).toBe(false);
      });

      it('#04.04.03 should return false for special number values', () => {
        expect(numbers.digit.is(Infinity)).toBe(false);
        expect(numbers.digit.is(-Infinity)).toBe(false);
        expect(numbers.digit.is(NaN)).toBe(false);
      });

      it('#04.04.04 should return false for non-numbers', () => {
        expect(numbers.digit.is('0')).toBe(false);
        expect(numbers.digit.is('5')).toBe(false);
        expect(numbers.digit.is(null)).toBe(false);
        expect(numbers.digit.is(undefined)).toBe(false);
        expect(numbers.digit.is({})).toBe(false);
        expect(numbers.digit.is([])).toBe(false);
        expect(numbers.digit.is(true)).toBe(false);
      });

      it('#04.04.05 should return false for numeric strings', () => {
        expect(numbers.digit.is('0')).toBe(false);
        expect(numbers.digit.is('9')).toBe(false);
        expect(numbers.digit.is('a')).toBe(false);
      });

      it('#04.04.06 should work with buildBooleanTests expectations', () => {
        // Test all digits are valid
        for (const digit of array) {
          expect(numbers.digit.is(digit)).toBe(true);
        }

        // Test some non-digits are invalid
        const nonDigits = ['a', 10, -1, 3.14, null, undefined, {}, []];
        for (const nonDigit of nonDigits) {
          expect(numbers.digit.is(nonDigit)).toBe(false);
        }
      });
    });
  });
});
