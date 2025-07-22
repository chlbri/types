import { expectTypeOf } from 'vitest';
import type { Digit } from '../types/types';
import { numbers } from './numbers';

/**
 * Tests de types pour toutes les sous-fonctions de numbers (types)
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Numbers Types Type Tests', () => {
  describe('#T00 => numbers main function types', () => {
    it('#T00.01 => should cast to number type', () => {
      const value = numbers(123);
      expectTypeOf(value).toEqualTypeOf<number>();

      const floatValue = numbers(123.45);
      expectTypeOf(floatValue).toEqualTypeOf<number>();

      const zeroValue = numbers(0);
      expectTypeOf(zeroValue).toEqualTypeOf<number>();
    });

    it('#T00.02 => should work with forceCast', () => {
      const forceCasted = numbers.forceCast('not a number');
      expectTypeOf(forceCasted).toEqualTypeOf<number>();

      const objectCasted = numbers.forceCast({ value: 123 });
      expectTypeOf(objectCasted).toEqualTypeOf<number>();
    });

    it('#T00.03 => should work with dynamic', () => {
      const dynamic = numbers.dynamic(42);
      expectTypeOf(dynamic).toExtend<number>();

      const negativeDynamic = numbers.dynamic(-100);
      expectTypeOf(negativeDynamic).toExtend<number>();
    });
  });

  describe('#T01 => numbers.is types', () => {
    it('#T01.01 => should return type check result', () => {
      const stringValue = 'test';
      const numberValue = 123;
      const objectValue = { a: 1 };

      const stringCheck = numbers.is(stringValue);
      expectTypeOf(stringCheck).toEqualTypeOf<false>();

      const numberCheck = numbers.is(numberValue);
      expectTypeOf(numberCheck).toEqualTypeOf<true>();

      const objectCheck = numbers.is(objectValue);
      expectTypeOf(objectCheck).toEqualTypeOf<false>();
    });
  });

  describe('#T02 => numbers.getString types', () => {
    it('#T02.01 => should return template literal for number literals', () => {
      const stringified = numbers.getString(123);
      expectTypeOf(stringified).toEqualTypeOf<`${123}`>();

      const zeroString = numbers.getString(0);
      expectTypeOf(zeroString).toEqualTypeOf<`${0}`>();

      const negativeString = numbers.getString(-42);
      expectTypeOf(negativeString).toEqualTypeOf<`${-42}`>();
    });

    it('#T02.02 => should work with const number values', () => {
      const constNumber = 456 as const;
      const stringified = numbers.getString(constNumber);
      expectTypeOf(stringified).toEqualTypeOf<`${456}`>();
    });
  });

  describe('#T03 => numbers.digit types', () => {
    it('#T03.01 => should cast to Digit type', () => {
      const digit = numbers.digit(5);
      expectTypeOf(digit).toEqualTypeOf<Digit>();
    });

    it('#T03.02 => should work with forceCast', () => {
      const forceCasted = numbers.digit.forceCast('not a digit');
      expectTypeOf(forceCasted).toEqualTypeOf<Digit>();

      const numberCasted = numbers.digit.forceCast(123);
      expectTypeOf(numberCasted).toEqualTypeOf<Digit>();
    });

    it('#T03.03 => should work with dynamic', () => {
      const dynamic = numbers.digit.dynamic(7);
      expectTypeOf(dynamic).toExtend<Digit>();
    });

    it('#T03.04 => numbers.digit.is should return type check result', () => {
      // Test function signature
      expectTypeOf(numbers.digit.is).toExtend<
        <T>(value: T) => T extends Digit ? true : false
      >();
    });
  });

  describe('#T04 => numbers.type', () => {
    it('#T04.01 => should be number type reference', () => {
      expectTypeOf(numbers.type).toEqualTypeOf<number>();
    });
  });

  describe('#T05 => numbers constants types', () => {
    it('#T05.01 => should have correct constant types', () => {
      expectTypeOf(numbers.ZERO).toEqualTypeOf<0>();
      expectTypeOf(numbers.ONE).toEqualTypeOf<1>();
      expectTypeOf(numbers.MINUS_1).toEqualTypeOf<-1>();
    });
  });

  describe('#T06 => numbers.bigint types', () => {
    it('#T06.01 => should cast to bigint type', () => {
      const bigintValue = numbers.bigint(123n);
      expectTypeOf(bigintValue).toEqualTypeOf<bigint>();
    });

    it('#T06.02 => should work with forceCast', () => {
      const forceCasted = numbers.bigint.forceCast('not a bigint');
      expectTypeOf(forceCasted).toEqualTypeOf<bigint>();

      const numberCasted = numbers.bigint.forceCast(123);
      expectTypeOf(numberCasted).toEqualTypeOf<bigint>();
    });

    it('#T06.03 => should work with dynamic', () => {
      const dynamic = numbers.bigint.dynamic(456n);
      expectTypeOf(dynamic).toExtend<bigint>();
    });

    it('#T06.04 => numbers.bigint.is should return type check result', () => {
      // Test function signature
      expectTypeOf(numbers.bigint.is).toExtend<
        <T>(value: T) => T extends bigint ? true : false
      >();
    });
  });

  describe('#T07 => Combined type tests', () => {
    it('#T07.01 => should work with numeric operations', () => {
      const computed = 5 + 3;
      const result = numbers(computed);
      expectTypeOf(result).toEqualTypeOf<number>();
    });

    it('#T07.02 => should handle edge cases', () => {
      // Test with specific numeric literals
      const zero = 0 as const;
      const one = 1 as const;
      const minusOne = -1 as const;

      expectTypeOf(numbers.getString(zero)).toEqualTypeOf<`${0}`>();
      expectTypeOf(numbers.getString(one)).toEqualTypeOf<`${1}`>();
      expectTypeOf(numbers.getString(minusOne)).toEqualTypeOf<`${-1}`>();
    });

    it('#T07.03 => should work with digit range validation', () => {
      // Test digit range (0-9)
      const validDigit = 5 as Digit;
      const digitResult = numbers.digit(validDigit);
      expectTypeOf(digitResult).toEqualTypeOf<Digit>();
    });
  });

  describe('#T08 => Function signatures', () => {
    it('#T08.01 => should have correct method signatures', () => {
      expectTypeOf(numbers).toExtend<(value: number) => number>();

      expectTypeOf(numbers.forceCast).toExtend<
        (value: unknown) => number
      >();

      expectTypeOf(numbers.digit).toExtend<(value: Digit) => Digit>();

      expectTypeOf(numbers.bigint).toExtend<(value: bigint) => bigint>();
    });
  });
});

expectTypeOf(numbers.getString).toExtend<
  <const T extends number>(value: T) => `${T}`
>();
