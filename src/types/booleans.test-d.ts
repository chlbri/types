import { expectTypeOf } from 'vitest';
import { booleans } from './booleans';

/**
 * Tests de types pour toutes les sous-fonctions de booleans (types)
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Booleans Types Type Tests', () => {
  describe('#T00 => booleans main function types', () => {
    it('#T00.01 => should cast to boolean type', () => {
      const value = booleans(true);
      expectTypeOf(value).toEqualTypeOf<true>();

      const falseValue = booleans(false);
      expectTypeOf(falseValue).toEqualTypeOf<false>();
    });

    it('#T00.02 => should work with forceCast', () => {
      const forceCasted = booleans.forceCast('not a boolean');
      expectTypeOf(forceCasted).toEqualTypeOf<boolean>();

      const numberCasted = booleans.forceCast(123);
      expectTypeOf(numberCasted).toEqualTypeOf<boolean>();

      const objectCasted = booleans.forceCast({ value: true });
      expectTypeOf(objectCasted).toEqualTypeOf<boolean>();
    });
  });

  describe('#T01 => booleans.is types', () => {
    it('#T01.01 => should return type check result', () => {
      const stringValue = 'test';
      const boolValue = true;
      const numberValue = 123;

      const stringCheck = booleans.is(stringValue);
      expectTypeOf(stringCheck).toEqualTypeOf<false>();

      const boolCheck = booleans.is(boolValue);
      expectTypeOf(boolCheck).toEqualTypeOf<true>();

      const numberCheck = booleans.is(numberValue);
      expectTypeOf(numberCheck).toEqualTypeOf<false>();
    });
  });

  describe('#T02 => booleans.type', () => {
    it('#T02.01 => should be boolean type reference', () => {
      expectTypeOf(booleans.type).toEqualTypeOf<boolean>();
    });
  });

  describe('#T03 => booleans.true types', () => {
    it('#T03.01 => should cast to true literal type', () => {
      const trueValue = booleans.true(true);
      expectTypeOf(trueValue).toEqualTypeOf<true>();
    });

    it('#T03.02 => should work with forceCast', () => {
      const forceCasted = booleans.true.forceCast('not true');
      expectTypeOf(forceCasted).toEqualTypeOf<true>();

      const numberCasted = booleans.true.forceCast(0);
      expectTypeOf(numberCasted).toEqualTypeOf<true>();
    });

    it('#T03.03 => should work with dynamic', () => {
      const dynamic = booleans.true.dynamic(true);
      expectTypeOf(dynamic).toEqualTypeOf<true>();
    });

    it('#T03.04 => booleans.true.is should return type check result', () => {
      // Test function signature instead of specific values
      expectTypeOf(booleans.true.is).toExtend<
        <T>(value: T) => T extends true ? true : false
      >();
    });
  });

  describe('#T04 => booleans.false types', () => {
    it('#T04.01 => should cast to false literal type', () => {
      const falseValue = booleans.false(false);
      expectTypeOf(falseValue).toEqualTypeOf<false>();
    });

    it('#T04.02 => should work with forceCast', () => {
      const forceCasted = booleans.false.forceCast('not false');
      expectTypeOf(forceCasted).toEqualTypeOf<false>();

      const numberCasted = booleans.false.forceCast(1);
      expectTypeOf(numberCasted).toEqualTypeOf<false>();
    });

    it('#T04.03 => should work with dynamic', () => {
      const dynamic = booleans.false.dynamic(false);
      expectTypeOf(dynamic).toEqualTypeOf<false>();
    });

    it('#T04.04 => booleans.false.is should return type check result', () => {
      // Test function signature instead of specific values
      expectTypeOf(booleans.false.is).toExtend<
        <T>(value: T) => T extends false ? true : false
      >();
    });
  });

  describe('#T05 => Combined type tests', () => {
    it('#T05.01 => should work with union types', () => {
      type BooleanUnion = true | false;

      const unionValue = booleans(true as BooleanUnion);
      expectTypeOf(unionValue).toExtend<BooleanUnion>();
    });

    it('#T05.02 => should handle edge cases', () => {
      // Test with literal boolean types
      const trueLiteral = true as const;
      const falseLiteral = false as const;

      expectTypeOf(booleans.true(trueLiteral)).toEqualTypeOf<true>();
      expectTypeOf(booleans.false(falseLiteral)).toEqualTypeOf<false>();
    });
  });

  describe('#T06 => Function signatures', () => {
    it('#T06.01 => should have correct method signatures', () => {
      expectTypeOf(booleans).toExtend<
        <T extends boolean>(value: T) => T
      >();

      expectTypeOf(booleans.forceCast).toExtend<
        <T extends boolean>(value: unknown) => T
      >();

      expectTypeOf(booleans.true).toExtend<(value: true) => true>();

      expectTypeOf(booleans.false).toExtend<(value: false) => false>();
    });
  });
});
