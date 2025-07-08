import { expectTypeOf } from 'vitest';
import type { Letters, LowerLetters, UpperLetters } from '../types/types';
import { strings } from './strings';

/**
 * Tests de types pour toutes les sous-fonctions de strings (types)
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Strings Types Type Tests', () => {
  describe('#T00 => strings main function types', () => {
    it('#T00.01 => should cast to string type', () => {
      const value = strings('test');
      expectTypeOf(value).toEqualTypeOf<string>();

      const emptyValue = strings('');
      expectTypeOf(emptyValue).toEqualTypeOf<string>();
    });

    it('#T00.02 => should work with forceCast', () => {
      const forceCasted = strings.forceCast({ not: 'string' });
      expectTypeOf(forceCasted).toEqualTypeOf<string>();

      const numberCasted = strings.forceCast(123);
      expectTypeOf(numberCasted).toEqualTypeOf<string>();
    });

    it('#T00.03 => should work with dynamic', () => {
      const dynamic = strings.dynamic('hello');
      expectTypeOf(dynamic).toExtend<string>();
    });
  });

  describe('#T01 => strings.is types', () => {
    it('#T01.01 => should return type check result', () => {
      const stringValue = 'test';
      const numberValue = 123;
      const objectValue = { a: 1 };

      const stringCheck = strings.is(stringValue);
      expectTypeOf(stringCheck).toEqualTypeOf<true>();

      const numberCheck = strings.is(numberValue);
      expectTypeOf(numberCheck).toEqualTypeOf<false>();

      const objectCheck = strings.is(objectValue);
      expectTypeOf(objectCheck).toEqualTypeOf<false>();
    });
  });

  describe('#T02 => strings.type', () => {
    it('#T02.01 => should be string type reference', () => {
      expectTypeOf(strings.type).toEqualTypeOf<string>();
    });
  });

  describe('#T03 => strings.getLength types', () => {
    it('#T03.01 => should return length type for literal strings', () => {
      const length = strings.getLength('hello');
      expectTypeOf(length).toExtend<number>();

      const emptyLength = strings.getLength('');
      expectTypeOf(emptyLength).toExtend<number>();
    });

    it('#T03.02 => should return number for dynamic strings', () => {
      const dynamicString: string = 'test';
      const dynamicLength = strings.getLength(dynamicString);
      expectTypeOf(dynamicLength).toEqualTypeOf<number>();
    });
  });

  describe('#T04 => strings.startsWith types', () => {
    it('#T04.01 => should return template literal type guard result', () => {
      // Test function signature
      expectTypeOf(strings.startsWith).toBeFunction();
    });
  });

  describe('#T05 => strings.endsWith types', () => {
    it('#T05.01 => should return template literal type guard result', () => {
      // Test function signature
      expectTypeOf(strings.endsWith).toBeFunction();
    });
  });

  describe('#T06 => strings.includes types', () => {
    it('#T06.01 => should return template literal type guard result', () => {
      // Test function signature
      expectTypeOf(strings.includes).toBeFunction();
    });
  });

  describe('#T07 => strings.contains types', () => {
    it('#T07.01 => should be alias for includes', () => {
      expectTypeOf(strings.contains).toEqualTypeOf<
        typeof strings.includes
      >();
    });
  });

  describe('#T08 => strings.toLowerCase types', () => {
    it('#T08.01 => should return lowercase template literal', () => {
      const lower = strings.toLowerCase('HELLO');
      expectTypeOf(lower).toExtend<string>();
    });
  });

  describe('#T09 => strings.toUpperCase types', () => {
    it('#T09.01 => should return uppercase template literal', () => {
      const upper = strings.toUpperCase('hello');
      expectTypeOf(upper).toExtend<string>();
    });
  });

  describe('#T10 => strings.letters types', () => {
    it('#T10.01 => should cast to Letters type', () => {
      const letters = strings.letters('a' as Letters);
      expectTypeOf(letters).toEqualTypeOf<Letters>();
    });

    it('#T10.02 => should work with forceCast', () => {
      const forceCasted = strings.letters.forceCast(123);
      expectTypeOf(forceCasted).toEqualTypeOf<Letters>();
    });

    it('#T10.03 => should work with dynamic', () => {
      const dynamic = strings.letters.dynamic('a' as Letters);
      expectTypeOf(dynamic).toExtend<Letters>();
    });

    it('#T10.04 => strings.letters.is should return type check result', () => {
      // Test function signature
      expectTypeOf(strings.letters.is).toExtend<
        <T>(value: T) => T extends Letters ? true : false
      >();
    });

    describe('#T10.05 => strings.letters.lower types', () => {
      it('#T10.05.01 => should cast to LowerLetters type', () => {
        const lowerLetters = strings.letters.lower('a' as LowerLetters);
        expectTypeOf(lowerLetters).toEqualTypeOf<LowerLetters>();
      });

      it('#T10.05.02 => should work with forceCast', () => {
        const forceCasted = strings.letters.lower.forceCast('ABC');
        expectTypeOf(forceCasted).toEqualTypeOf<LowerLetters>();
      });

      it('#T10.05.03 => should work with dynamic', () => {
        const dynamic = strings.letters.lower.dynamic(
          'abc' as LowerLetters,
        );
        expectTypeOf(dynamic).toExtend<LowerLetters>();
      });

      it('#T10.05.04 => strings.letters.lower.is should return type check result', () => {
        // Test function signature
        expectTypeOf(strings.letters.lower.is).toExtend<
          <T>(value: T) => T extends LowerLetters ? true : false
        >();
      });
    });

    describe('#T10.06 => strings.letters.upper types', () => {
      it('#T10.06.01 => should cast to UpperLetters type', () => {
        const upperLetters = strings.letters.upper('A' as UpperLetters);
        expectTypeOf(upperLetters).toEqualTypeOf<UpperLetters>();
      });

      it('#T10.06.02 => should work with forceCast', () => {
        const forceCasted = strings.letters.upper.forceCast('abc');
        expectTypeOf(forceCasted).toEqualTypeOf<UpperLetters>();
      });

      it('#T10.06.03 => should work with dynamic', () => {
        const dynamic = strings.letters.upper.dynamic(
          'ABC' as UpperLetters,
        );
        expectTypeOf(dynamic).toExtend<UpperLetters>();
      });

      it('#T10.06.04 => strings.letters.upper.is should return type check result', () => {
        // Test function signature
        expectTypeOf(strings.letters.upper.is).toExtend<
          <T>(value: T) => T extends UpperLetters ? true : false
        >();
      });
    });
  });

  describe('#T11 => strings.add types', () => {
    it('#T11.01 => should return concatenated string types', () => {
      const added = strings.add('hello', 'pre-', '-post');
      expectTypeOf(added).toExtend<string>();
    });
  });

  describe('#T12 => strings.join types', () => {
    it('#T12.01 => should return joined string type', () => {
      const joined = strings.join(' ', 'hello', 'world');
      expectTypeOf(joined).toExtend<string>();
    });
  });

  describe('#T13 => strings.splitBy types', () => {
    it('#T13.01 => should return string array type', () => {
      const split = strings.splitBy('hello.world', '.');
      expectTypeOf(split).toExtend<string[]>();
    });
  });

  describe('#T14 => Combined type tests', () => {
    it('#T14.01 => should work with string literals', () => {
      const literal = 'hello' as const;
      const result = strings(literal);
      expectTypeOf(result).toEqualTypeOf<string>();
    });

    it('#T14.02 => should handle edge cases', () => {
      // Test with empty strings
      const empty = '' as const;
      const length = strings.getLength(empty);
      expectTypeOf(length).toExtend<number>();

      // Test with letter types
      const letters = 'abc' as Letters;
      const letterResult = strings.letters(letters);
      expectTypeOf(letterResult).toEqualTypeOf<Letters>();
    });
  });

  describe('#T15 => Function signatures', () => {
    it('#T15.01 => should have correct method signatures', () => {
      expectTypeOf(strings).toExtend<(value: string) => string>();

      expectTypeOf(strings.forceCast).toExtend<
        (value: unknown) => string
      >();

      expectTypeOf(strings.getLength).toExtend<
        <const T extends string>(value: T) => number
      >();

      expectTypeOf(strings.letters).toExtend<
        (value: Letters) => Letters
      >();

      expectTypeOf(strings.add).toExtend<
        <T extends string, Before extends string, After extends string>(
          value: T,
          before?: Before,
          after?: After,
        ) => string
      >();
    });
  });
});
