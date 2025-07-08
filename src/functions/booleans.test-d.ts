import { expectTypeOf } from 'vitest';
import { booleans } from './booleans';

/**
 * Tests de types pour toutes les sous-fonctions de booleans
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Booleans Type Tests', () => {
  describe('#T00 => booleans main function types', () => {
    it('#T00.01 => should cast to boolean type', () => {
      const value = booleans(true);
      expectTypeOf(value).toEqualTypeOf<boolean>();

      const falseValue = booleans(false);
      expectTypeOf(falseValue).toEqualTypeOf<boolean>();
    });

    it('#T00.02 => should work with forceCast', () => {
      const forceCasted = booleans.forceCast('not a boolean');
      expectTypeOf(forceCasted).toEqualTypeOf<boolean>();

      const numberCasted = booleans.forceCast(123);
      expectTypeOf(numberCasted).toEqualTypeOf<boolean>();
    });

    it('#T00.03 => should work with dynamic', () => {
      const dynamic = booleans.dynamic(true);
      expectTypeOf(dynamic).toExtend<boolean>();

      const falseDynamic = booleans.dynamic(false);
      expectTypeOf(falseDynamic).toExtend<boolean>();
    });
  });

  describe('#T01 => booleans.is types', () => {
    it('#T01.01 => should be type guard for booleans', () => {
      const value: unknown = true;

      if (booleans.is(value)) {
        expectTypeOf(value).toEqualTypeOf<boolean>();
      }

      expectTypeOf(booleans.is).toExtend<
        (data: unknown) => data is boolean
      >();
    });

    it('#T01.02 => should work with various input types', () => {
      const stringValue: unknown = 'test';
      const numberValue: unknown = 123;
      const booleanValue: unknown = true;

      expectTypeOf(booleans.is(stringValue)).toEqualTypeOf<boolean>();
      expectTypeOf(booleans.is(numberValue)).toEqualTypeOf<boolean>();
      expectTypeOf(booleans.is(booleanValue)).toEqualTypeOf<boolean>();
    });
  });

  describe('#T02 => booleans.type', () => {
    it('#T02.01 => should be Boolean constructor', () => {
      expectTypeOf(booleans.type).toEqualTypeOf<BooleanConstructor>();
    });
  });

  describe('#T03 => booleans.true types', () => {
    it('#T03.01 => should cast to true literal type', () => {
      const trueValue = booleans.true(true);
      expectTypeOf(trueValue).toEqualTypeOf<true>();

      const forceCasted = booleans.true.forceCast('anything');
      expectTypeOf(forceCasted).toEqualTypeOf<true>();

      const dynamic = booleans.true.dynamic(true);
      expectTypeOf(dynamic).toEqualTypeOf<true>();
    });

    it('#T03.02 => booleans.true.CONST should be literal true', () => {
      expectTypeOf(booleans.true.CONST).toEqualTypeOf<true>();
    });

    it('#T03.03 => booleans.true.is should be type guard for true', () => {
      expectTypeOf(booleans.true.is).toExtend<
        (value: unknown) => boolean
      >();
    });
  });

  describe('#T04 => booleans.false types', () => {
    it('#T04.01 => should cast to false literal type', () => {
      const falseValue = booleans.false(false);
      expectTypeOf(falseValue).toEqualTypeOf<false>();

      const forceCasted = booleans.false.forceCast('anything');
      expectTypeOf(forceCasted).toEqualTypeOf<false>();

      const dynamic = booleans.false.dynamic(false);
      expectTypeOf(dynamic).toEqualTypeOf<false>();
    });

    it('#T04.02 => booleans.false.CONST should be literal false', () => {
      expectTypeOf(booleans.false.CONST).toEqualTypeOf<false>();
    });

    it('#T04.03 => booleans.false.is should be type guard for false', () => {
      expectTypeOf(booleans.false.is).toExtend<
        (value: unknown) => boolean
      >();
    });
  });

  describe('#T05 => Type guard combinations', () => {
    it('#T05.01 => should work with combined boolean type guards', () => {
      const value: unknown = true;

      if (booleans.is(value)) {
        expectTypeOf(value).toEqualTypeOf<boolean>();

        if (booleans.true.is(value)) {
          expectTypeOf(value).toEqualTypeOf<true>();
        }

        if (booleans.false.is(value)) {
          expectTypeOf(value).toEqualTypeOf<false>();
        }
      }
    });

    it('#T05.02 => should handle boolean literal narrowing', () => {
      const maybeBoolean: unknown = Math.random() > 0.5;

      if (booleans.is(maybeBoolean) && booleans.true.is(maybeBoolean)) {
        expectTypeOf(maybeBoolean).toEqualTypeOf<true>();
      }

      if (booleans.is(maybeBoolean) && booleans.false.is(maybeBoolean)) {
        expectTypeOf(maybeBoolean).toEqualTypeOf<false>();
      }
    });
  });

  describe('#T06 => Function signatures', () => {
    it('#T06.01 => should have correct main function signature', () => {
      expectTypeOf(booleans).toExtend<(arg: boolean) => boolean>();
    });

    it('#T06.02 => should have correct method signatures', () => {
      expectTypeOf(booleans.forceCast).toExtend<
        (arg: unknown) => boolean
      >();
      expectTypeOf(booleans.dynamic).toExtend<(arg: boolean) => boolean>();
      expectTypeOf(booleans.is).toExtend<
        (data: unknown) => data is boolean
      >();
    });

    it('#T06.03 => should have correct true method signatures', () => {
      expectTypeOf(booleans.true).toExtend<(arg: true) => true>();
      expectTypeOf(booleans.true.forceCast).toExtend<
        (arg: unknown) => true
      >();
      expectTypeOf(booleans.true.dynamic).toExtend<(arg: true) => true>();
      expectTypeOf(booleans.true.is).toExtend<
        (value: unknown) => boolean
      >();
    });

    it('#T06.04 => should have correct false method signatures', () => {
      expectTypeOf(booleans.false).toExtend<(arg: false) => false>();
      expectTypeOf(booleans.false.forceCast).toExtend<
        (arg: unknown) => false
      >();
      expectTypeOf(booleans.false.dynamic).toExtend<
        (arg: false) => false
      >();
      expectTypeOf(booleans.false.is).toExtend<
        (value: unknown) => boolean
      >();
    });
  });

  describe('#T07 => Edge cases and complex scenarios', () => {
    it('#T07.01 => should handle boolean union types', () => {
      type BooleanUnion = true | false;

      const boolUnion: BooleanUnion = true;
      const castedUnion = booleans(boolUnion);
      expectTypeOf(castedUnion).toEqualTypeOf<boolean>();
    });

    it('#T07.02 => should work with conditional boolean types', () => {
      type ConditionalBoolean<T> = T extends string ? true : false;

      const stringCondition: ConditionalBoolean<string> = true;
      const numberCondition: ConditionalBoolean<number> = false;

      expectTypeOf(stringCondition).toEqualTypeOf<true>();
      expectTypeOf(numberCondition).toEqualTypeOf<false>();
    });

    it('#T07.03 => should handle boolean type guards in complex scenarios', () => {
      interface ComplexType {
        flag: boolean;
        status: true | false;
      }

      const complex: ComplexType = { flag: true, status: false };

      if (booleans.true.is(complex.flag)) {
        expectTypeOf(complex.flag).toEqualTypeOf<true>();
      }

      if (booleans.false.is(complex.status)) {
        expectTypeOf(complex.status).toEqualTypeOf<false>();
      }
    });

    it('#T07.04 => should work with readonly boolean arrays', () => {
      const readonlyBools: readonly boolean[] = [true, false, true];

      for (const bool of readonlyBools) {
        if (booleans.is(bool)) {
          expectTypeOf(bool).toEqualTypeOf<boolean>();
        }
      }
    });

    it('#T07.05 => should handle boolean transformations', () => {
      // Test transformation functions
      const trueToFalse = (value: true): false =>
        booleans.false.forceCast(value);
      const falseToTrue = (value: false): true =>
        booleans.true.forceCast(value);

      expectTypeOf(trueToFalse).toExtend<(value: true) => false>();
      expectTypeOf(falseToTrue).toExtend<(value: false) => true>();
    });
  });
});
