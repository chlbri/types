import { expectTypeOf } from 'vitest';
import type { Letters, LowerLetters, UpperLetters } from '../types/types';
import { strings } from './strings';

/**
 * Tests de types pour toutes les sous-fonctions de strings
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Strings Type Tests', () => {
  describe('#T00 => strings main function types', () => {
    it('#T00.01 => should cast to string type', () => {
      const value = strings('test');
      expectTypeOf(value).toEqualTypeOf<string>();
    });

    it('#T00.02 => should work with forceCast', () => {
      const forceCasted = strings.forceCast({ not: 'string' });
      expectTypeOf(forceCasted).toEqualTypeOf<string>();
    });

    it('#T00.03 => should work with dynamic for string types', () => {
      const dynamic = strings.dynamic('hello' as string);
      expectTypeOf(dynamic).toEqualTypeOf<string>();
    });
  });

  describe('#T01 => strings.is types', () => {
    it('#T01.01 => should be type guard for strings', () => {
      const value: unknown = 'test';

      if (strings.is(value)) {
        expectTypeOf(value).toEqualTypeOf<string>();
      }

      expectTypeOf(strings.is).toExtend<
        (value: unknown) => value is string
      >();
    });

    it('#T01.02 => strings.is.instance should be type guard for String objects', () => {
      expectTypeOf(strings.is.instance).toExtend<
        (value: unknown) => boolean
      >();
    });
  });

  describe('#T02 => strings.type', () => {
    it('#T02.01 => should be String constructor', () => {
      expectTypeOf(strings.type).toEqualTypeOf<StringConstructor>();
    });
  });

  describe('#T03 => strings.getLength types', () => {
    it('#T03.01 => should return number for string length', () => {
      const length = strings.getLength('hello');
      expectTypeOf(length).toEqualTypeOf<number>();

      const dynamicString: string = 'test';
      const dynamicLength = strings.getLength(dynamicString);
      expectTypeOf(dynamicLength).toEqualTypeOf<number>();
    });
  });

  describe('#T04 => strings.startsWith types', () => {
    it('#T04.01 => should be type guard with template literal types', () => {
      const value: unknown = 'hello world';

      if (strings.startsWith(value, 'hello')) {
        expectTypeOf(value).toEqualTypeOf<`hello${string}`>();
      }

      expectTypeOf(strings.startsWith).toExtend<
        <U extends string>(
          value: unknown,
          prefix: U,
        ) => value is `${U}${string}`
      >();
    });
  });

  describe('#T05 => strings.endsWith types', () => {
    it('#T05.01 => should be type guard with template literal types', () => {
      const value: unknown = 'hello world';

      if (strings.endsWith(value, 'world')) {
        expectTypeOf(value).toEqualTypeOf<`${string}world`>();
      }

      expectTypeOf(strings.endsWith).toExtend<
        <U extends string>(
          value: unknown,
          suffix: U,
        ) => value is `${string}${U}`
      >();
    });
  });

  describe('#T06 => strings.includes/contains types', () => {
    it('#T06.01 => should be type guard with template literal types', () => {
      const value: unknown = 'hello world test';

      if (strings.includes(value, 'world')) {
        expectTypeOf(value).toEqualTypeOf<`${string}world${string}`>();
      }

      expectTypeOf(strings.includes).toExtend<
        <U extends string[]>(
          value: unknown,
          ...segment: U
        ) => value is `${string}${U[number]}${string}`
      >();

      expectTypeOf(strings.contains).toExtend<
        <U extends string[]>(
          value: unknown,
          ...segment: U
        ) => value is `${string}${U[number]}${string}`
      >();
    });
  });

  describe('#T07 => strings.toLowerCase types', () => {
    it('#T07.01 => should return string for lowercase operation', () => {
      const lower = strings.toLowerCase('HELLO');
      expectTypeOf(lower).toExtend<string>();

      const dynamicString: string = 'TEST';
      const dynamicLower = strings.toLowerCase(dynamicString);
      expectTypeOf(dynamicLower).toExtend<string>();
    });
  });

  describe('#T08 => strings.toUpperCase types', () => {
    it('#T08.01 => should return string for uppercase operation', () => {
      const upper = strings.toUpperCase('hello');
      expectTypeOf(upper).toExtend<string>();

      const dynamicString: string = 'test';
      const dynamicUpper = strings.toUpperCase(dynamicString);
      expectTypeOf(dynamicUpper).toExtend<string>();
    });
  });

  describe('#T09 => strings.letters types', () => {
    it('#T09.01 => should cast to Letters type', () => {
      const letters = strings.letters('abc' as Letters);
      expectTypeOf(letters).toEqualTypeOf<Letters>();

      const forceCasted = strings.letters.forceCast(123);
      expectTypeOf(forceCasted).toEqualTypeOf<Letters>();

      const dynamic = strings.letters.dynamic('test' as Letters);
      expectTypeOf(dynamic).toEqualTypeOf<Letters>();
    });

    it('#T09.02 => strings.letters.is should be type guard', () => {
      const value: unknown = 'abc';

      if (strings.letters.is(value)) {
        expectTypeOf(value).toEqualTypeOf<Letters>();
      }

      expectTypeOf(strings.letters.is).toExtend<
        (value: unknown) => value is Letters
      >();
    });

    describe('#T09.03 => strings.letters.lower types', () => {
      it('#T09.03.01 => should cast to LowerLetters type', () => {
        const lowerLetters = strings.letters.lower('a' as LowerLetters);
        expectTypeOf(lowerLetters).toEqualTypeOf<LowerLetters>();

        const forceCasted = strings.letters.lower.forceCast('ABC');
        expectTypeOf(forceCasted).toEqualTypeOf<LowerLetters>();

        const dynamic = strings.letters.lower.dynamic('a' as LowerLetters);
        expectTypeOf(dynamic).toEqualTypeOf<LowerLetters>();
      });

      it('#T09.03.02 => strings.letters.lower.is should be type guard', () => {
        const value: unknown = 'abc';

        if (strings.letters.lower.is(value)) {
          expectTypeOf(value).toEqualTypeOf<LowerLetters>();
        }

        expectTypeOf(strings.letters.lower.is).toExtend<
          (value: unknown) => value is LowerLetters
        >();
      });
    });

    describe('#T09.04 => strings.letters.upper types', () => {
      it('#T09.04.01 => should cast to UpperLetters type', () => {
        const upperLetters = strings.letters.upper('A' as UpperLetters);
        expectTypeOf(upperLetters).toEqualTypeOf<UpperLetters>();

        const forceCasted = strings.letters.upper.forceCast('abc');
        expectTypeOf(forceCasted).toEqualTypeOf<UpperLetters>();

        const dynamic = strings.letters.upper.dynamic('A' as UpperLetters);
        expectTypeOf(dynamic).toEqualTypeOf<UpperLetters>();
      });

      it('#T09.04.02 => strings.letters.upper.is should be type guard', () => {
        const value: unknown = 'ABC';

        if (strings.letters.upper.is(value)) {
          expectTypeOf(value).toEqualTypeOf<UpperLetters>();
        }

        expectTypeOf(strings.letters.upper.is).toExtend<
          (value: unknown) => value is UpperLetters
        >();
      });
    });
  });

  describe('#T10 => strings.add types', () => {
    it('#T10.01 => should return string for add operations', () => {
      const added = strings.add('hello', 'prefix-', '-suffix');
      expectTypeOf(added).toExtend<string>();

      const dynamicString: string = 'test';
      const dynamicAdded = strings.add(dynamicString, 'prefix', 'suffix');
      expectTypeOf(dynamicAdded).toExtend<string>();
    });
  });

  describe('#T11 => strings.join types', () => {
    it('#T11.01 => should return string for join operations', () => {
      const joined = strings.join(' ', 'hello', 'world');
      expectTypeOf(joined).toExtend<string>();

      const withDash = strings.join('-', 'a', 'b', 'c');
      expectTypeOf(withDash).toExtend<string>();
    });
  });

  describe('#T12 => strings.splitBy types', () => {
    it('#T12.01 => should return string array for split operations', () => {
      const split = strings.splitBy('hello.world.test', '.');
      expectTypeOf(split).toExtend<string[]>();

      const dynamicString: string = 'test.string';
      const dynamicSplit = strings.splitBy(dynamicString, '.');
      expectTypeOf(dynamicSplit).toExtend<string[]>();
    });
  });

  describe('#T13 => Type guard combinations', () => {
    it('#T13.01 => should work with combined type guards', () => {
      const value: unknown = 'test string';

      if (strings.is(value) && strings.startsWith(value, 'test')) {
        expectTypeOf(value).toEqualTypeOf<`test${string}`>();
      }

      if (strings.is(value) && strings.endsWith(value, 'string')) {
        expectTypeOf(value).toEqualTypeOf<`${string}string`>();
      }
    });

    it('#T13.02 => should work with letter type guards', () => {
      const value: unknown = 'abc';

      if (strings.is(value) && strings.letters.is(value)) {
        expectTypeOf(value).toEqualTypeOf<Letters>();
      }

      if (strings.letters.lower.is(value)) {
        expectTypeOf(value).toEqualTypeOf<LowerLetters>();
      }

      if (strings.letters.upper.is(value)) {
        expectTypeOf(value).toEqualTypeOf<UpperLetters>();
      }
    });
  });

  describe('#T14 => Function signatures', () => {
    it('#T14.01 => should have correct method signatures', () => {
      expectTypeOf(strings.getLength).toExtend<
        <const T extends string>(value: T) => number
      >();

      expectTypeOf(strings.toLowerCase).toExtend<
        <T extends string>(value: T) => string
      >();

      expectTypeOf(strings.toUpperCase).toExtend<
        <T extends string>(value: T) => string
      >();

      expectTypeOf(strings.add).toExtend<
        <T extends string, Before extends string, After extends string>(
          value: T,
          before?: Before,
          after?: After,
        ) => string
      >();

      expectTypeOf(strings.join).toExtend<
        <T extends readonly string[], S extends string>(
          sep?: S,
          ...args: T
        ) => string
      >();

      expectTypeOf(strings.splitBy).toExtend<
        <const S extends string, By extends string>(
          value: S,
          by?: By,
        ) => string[]
      >();
    });
  });
});
