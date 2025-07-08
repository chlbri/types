import { expectTypeOf } from 'vitest';
import type { Digit } from '../types/types';
import { numbers } from './numbers';

/**
 * Tests de types pour toutes les sous-fonctions de numbers
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Numbers Type Tests', () => {
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
      expectTypeOf(dynamic).toExtend<42>();

      const negativeDynamic = numbers.dynamic(-100);
      expectTypeOf(negativeDynamic).toExtend<-100>();
    });
  });

  describe('#T01 => numbers.is types', () => {
    it('#T01.01 => should be type guard for numbers', () => {
      const value: unknown = 123;

      if (numbers.is(value)) {
        expectTypeOf(value).toEqualTypeOf<number>();
      }

      expectTypeOf(numbers.is).toExtend<(arg: unknown) => arg is number>();
    });

    it('#T01.02 => should work with various input types', () => {
      const stringValue: unknown = 'test';
      const numberValue: unknown = 123;
      const objectValue: unknown = { a: 1 };

      expectTypeOf(numbers.is(stringValue)).toEqualTypeOf<boolean>();
      expectTypeOf(numbers.is(numberValue)).toEqualTypeOf<boolean>();
      expectTypeOf(numbers.is(objectValue)).toEqualTypeOf<boolean>();
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

    it('#T02.02 => should work with string inputs', () => {
      const stringInput = numbers.getString('123');
      expectTypeOf(stringInput).toEqualTypeOf<`${'123'}`>();

      const stringLiteral = numbers.getString('hello' as const);
      expectTypeOf(stringLiteral).toEqualTypeOf<`${'hello'}`>();
    });

    it('#T02.03 => should work with dynamic numbers', () => {
      const dynamicNumber: number = 123;
      const dynamicString = numbers.getString(dynamicNumber);
      expectTypeOf(dynamicString).toEqualTypeOf<`${number}`>();
    });
  });

  describe('#T03 => numbers.digit types', () => {
    it('#T03.01 => should cast to Digit type', () => {
      const digit = numbers.digit(5 as Digit);
      expectTypeOf(digit).toEqualTypeOf<Digit>();

      const forceCasted = numbers.digit.forceCast('not a digit');
      expectTypeOf(forceCasted).toEqualTypeOf<Digit>();

      const dynamic = numbers.digit.dynamic(3 as Digit);
      expectTypeOf(dynamic).toEqualTypeOf<Digit>();
    });

    it('#T03.02 => numbers.digit.is should be type guard', () => {
      const value: unknown = 5;

      if (numbers.digit.is(value)) {
        expectTypeOf(value).toEqualTypeOf<Digit>();
      }

      expectTypeOf(numbers.digit.is).toExtend<
        (value: unknown) => value is Digit
      >();
    });
  });

  describe('#T04 => numbers.type', () => {
    it('#T04.01 => should be Number constructor', () => {
      expectTypeOf(numbers.type).toEqualTypeOf<NumberConstructor>();
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

      const forceCasted = numbers.bigint.forceCast('not a bigint');
      expectTypeOf(forceCasted).toEqualTypeOf<bigint>();

      const dynamic = numbers.bigint.dynamic(456n);
      expectTypeOf(dynamic).toExtend<456n>();
    });

    it('#T06.02 => numbers.bigint.is should be type guard', () => {
      const value: unknown = 123n;

      if (numbers.bigint.is(value)) {
        expectTypeOf(value).toEqualTypeOf<bigint>();
      }

      expectTypeOf(numbers.bigint.is).toExtend<
        (value: unknown) => boolean
      >();
    });
  });

  describe('#T07 => Type guard combinations', () => {
    it('#T07.01 => should work with combined number type guards', () => {
      const value: unknown = 5;

      if (numbers.is(value)) {
        expectTypeOf(value).toEqualTypeOf<number>();

        if (numbers.digit.is(value)) {
          expectTypeOf(value).toEqualTypeOf<Digit>();
        }
      }
    });

    it('#T07.02 => should handle number literal narrowing', () => {
      const maybeNumber: unknown = Math.random();

      if (numbers.is(maybeNumber) && numbers.digit.is(maybeNumber)) {
        expectTypeOf(maybeNumber).toEqualTypeOf<Digit>();
      }
    });
  });

  describe('#T08 => Function signatures', () => {
    it('#T08.01 => should have correct main function signature', () => {
      expectTypeOf(numbers).toExtend<(arg: number) => number>();
    });

    it('#T08.02 => should have correct method signatures', () => {
      expectTypeOf(numbers.forceCast).toExtend<(arg: unknown) => number>();
      expectTypeOf(numbers.dynamic).toExtend<(arg: number) => number>();
      expectTypeOf(numbers.is).toExtend<(arg: unknown) => arg is number>();
    });

    it('#T08.03 => should have correct getString signature', () => {
      expectTypeOf(numbers.getString).toExtend<
        <T extends number | string>(arg: T) => `${T}`
      >();
    });

    it('#T08.04 => should have correct digit method signatures', () => {
      expectTypeOf(numbers.digit).toExtend<(arg: Digit) => Digit>();
      expectTypeOf(numbers.digit.forceCast).toExtend<
        (arg: unknown) => Digit
      >();
      expectTypeOf(numbers.digit.dynamic).toExtend<
        (arg: Digit) => Digit
      >();
      expectTypeOf(numbers.digit.is).toExtend<
        (value: unknown) => value is Digit
      >();
    });

    it('#T08.05 => should have correct bigint method signatures', () => {
      expectTypeOf(numbers.bigint).toExtend<(arg: bigint) => bigint>();
      expectTypeOf(numbers.bigint.forceCast).toExtend<
        (arg: unknown) => bigint
      >();
      expectTypeOf(numbers.bigint.dynamic).toExtend<
        (arg: bigint) => bigint
      >();
      expectTypeOf(numbers.bigint.is).toExtend<
        (value: unknown) => boolean
      >();
    });
  });

  describe('#T09 => Complex number scenarios', () => {
    it('#T09.01 => should handle number union types', () => {
      type NumberUnion = 1 | 2 | 3 | 4 | 5;

      const numUnion: NumberUnion = 3;
      const castedUnion = numbers(numUnion);
      expectTypeOf(castedUnion).toEqualTypeOf<number>();
    });

    it('#T09.02 => should work with conditional number types', () => {
      type ConditionalNumber<T> = T extends string ? 0 : 1;

      const stringCondition: ConditionalNumber<string> = 0;
      const numberCondition: ConditionalNumber<number> = 1;

      expectTypeOf(stringCondition).toEqualTypeOf<0>();
      expectTypeOf(numberCondition).toEqualTypeOf<1>();
    });

    it('#T09.03 => should handle special number values', () => {
      const infinity = numbers(Infinity);
      expectTypeOf(infinity).toEqualTypeOf<number>();

      const negInfinity = numbers(-Infinity);
      expectTypeOf(negInfinity).toEqualTypeOf<number>();

      const nan = numbers(NaN);
      expectTypeOf(nan).toEqualTypeOf<number>();
    });

    it('#T09.04 => should work with number arrays and tuples', () => {
      const numberArray: number[] = [1, 2, 3];
      const numberTuple: [1, 2, 3] = [1, 2, 3];

      for (const num of numberArray) {
        if (numbers.is(num)) {
          expectTypeOf(num).toEqualTypeOf<number>();
        }
      }

      for (const num of numberTuple) {
        if (numbers.digit.is(num)) {
          expectTypeOf(num).toExtend<Digit>();
        }
      }
    });

    it('#T09.05 => should handle number transformations', () => {
      interface NumberContainer {
        value: number;
        digit?: Digit;
      }

      const container: NumberContainer = { value: 42, digit: 5 };

      if (numbers.digit.is(container.value)) {
        expectTypeOf(container.value).toEqualTypeOf<Digit>();
      }

      if (
        container.digit !== undefined &&
        numbers.digit.is(container.digit)
      ) {
        expectTypeOf(container.digit).toEqualTypeOf<Digit>();
      }
    });

    it('#T09.06 => should work with bigint conversions', () => {
      const regularNumber = 123;
      const bigintNumber = BigInt(regularNumber);

      expectTypeOf(bigintNumber).toEqualTypeOf<bigint>();

      if (numbers.bigint.is(bigintNumber)) {
        expectTypeOf(bigintNumber).toEqualTypeOf<bigint>();
      }
    });
  });
});
