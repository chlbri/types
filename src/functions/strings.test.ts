import type { UpperLetters } from 'types';
import { describe, expect, expectTypeOf, it } from 'vitest';
import { strings } from './strings';

describe('#01 => Strings Main Functions', () => {
  describe('#01.01 => strings.is', () => {
    it('#01.01.01 => should return true for string literals', () => {
      expect(strings.is('hello')).toBe(true);
      expect(strings.is('')).toBe(true);
      expect(strings.is('123')).toBe(true);
    });

    it('#01.01.02 => should return true for String objects', () => {
      expect(strings.is.instance(new String('hello'))).toBe(true);
      expect(strings.is.instance(new String(''))).toBe(true);
    });

    it('#01.01.03 => should return false for non-string types', () => {
      expect(strings.is(123)).toBe(false);
      expect(strings.is(null)).toBe(false);
      expect(strings.is(undefined)).toBe(false);
      expect(strings.is(true)).toBe(false);
      expect(strings.is({})).toBe(false);
      expect(strings.is([])).toBe(false);
    });

    it('#01.01.04 => should act as type guard', () => {
      const value: unknown = 'hello';
      if (strings.is(value)) {
        expectTypeOf(value).toEqualTypeOf<string>();
      }
    });
  });

  describe('#01.02 => strings.type', () => {
    it('#01.02.01 => should reference String constructor', () => {
      expect(strings.type).toBe(String);
    });

    it('#01.02.02 => should work with instanceof', () => {
      expect(new String('hello') instanceof strings.type).toBe(true);
    });
  });

  describe('#01.03 => strings.getLength', () => {
    it('#01.03.01 => should return correct length for regular strings', () => {
      expect(strings.getLength('hello')).toBe(5);
      expect(strings.getLength('')).toBe(0);
      expect(strings.getLength('a')).toBe(1);
    });

    it('#01.03.02 => should return correct length for strings with special characters', () => {
      expect(strings.getLength('héllo')).toBe(5);
      expect(strings.getLength('hello\nworld')).toBe(11);
      expect(strings.getLength('hello\tworld')).toBe(11);
    });

    it('#01.03.03 => should preserve type-level length', () => {
      expectTypeOf(strings.getLength('hello')).toEqualTypeOf<number>();
      expectTypeOf(strings.getLength('hi')).toEqualTypeOf<number>();
    });
  });

  describe('#01.04 => strings.startsWith', () => {
    it('#01.04.01 => should return true when string starts with prefix', () => {
      expect(strings.startsWith('hello world', 'hello')).toBe(true);
      expect(strings.startsWith('hello world', 'h')).toBe(true);
      expect(strings.startsWith('hello world', '')).toBe(true);
    });

    it('#01.04.02 => should return false when string does not start with prefix', () => {
      expect(strings.startsWith('hello world', 'world')).toBe(false);
      expect(strings.startsWith('hello world', 'Hello')).toBe(false);
      expect(strings.startsWith('hello world', 'hello world extra')).toBe(
        false,
      );
    });

    it('#01.04.03 => should return false for non-string values', () => {
      expect(strings.startsWith(123, 'hello')).toBe(false);
      expect(strings.startsWith(null, 'hello')).toBe(false);
      expect(strings.startsWith(undefined, 'hello')).toBe(false);
    });

    it('#01.04.04 => should act as type guard', () => {
      const value: unknown = 'hello world';
      if (strings.startsWith(value, 'hello')) {
        expectTypeOf(value).toEqualTypeOf<`hello${string}`>();
      }
    });
  });

  describe('#01.05 => strings.endsWith', () => {
    it('#01.05.01 => should return true when string ends with suffix', () => {
      expect(strings.endsWith('hello world', 'world')).toBe(true);
      expect(strings.endsWith('hello world', 'd')).toBe(true);
      expect(strings.endsWith('hello world', '')).toBe(true);
    });

    it('#01.05.02 => should return false when string does not end with suffix', () => {
      expect(strings.endsWith('hello world', 'hello')).toBe(false);
      expect(strings.endsWith('hello world', 'World')).toBe(false);
      expect(strings.endsWith('hello world', 'extra hello world')).toBe(
        false,
      );
    });

    it('#01.05.03 => should return false for non-string values', () => {
      expect(strings.endsWith(123, 'world')).toBe(false);
      expect(strings.endsWith(null, 'world')).toBe(false);
      expect(strings.endsWith(undefined, 'world')).toBe(false);
    });

    it('#01.05.04 => should act as type guard', () => {
      const value: unknown = 'hello world';
      if (strings.endsWith(value, 'world')) {
        expectTypeOf(value).toEqualTypeOf<`${string}world`>();
      }
    });
  });

  describe('#01.06 => strings.include/contains', () => {
    it('#01.06.01 => should return true when string includes segment', () => {
      expect(strings.includes('hello world', 'llo')).toBe(true);
      expect(strings.contains('hello world', 'o w')).toBe(true);
      expect(strings.includes('hello world', '')).toBe(true);
    });

    it('#01.06.02 => should return false when string does not include segment', () => {
      expect(strings.includes('hello world', 'xyz')).toBe(false);
      expect(strings.contains('hello world', 'Hello')).toBe(false);
      expect(strings.includes('hello world', 'hello world extra')).toBe(
        false,
      );
    });

    it('#01.06.03 => should return false for non-string values', () => {
      expect(strings.includes(123, 'hello')).toBe(false);
      expect(strings.contains(null, 'hello')).toBe(false);
      expect(strings.contains(undefined, 'hello')).toBe(false);
    });

    it('#01.06.04 => should act as type guard', () => {
      const value: unknown = 'hello world';
      if (strings.includes(value, 'llo')) {
        expectTypeOf(value).toEqualTypeOf<`${string}llo${string}`>();
      }
    });
  });

  describe('#01.07 => strings.toLowerCase', () => {
    it('#01.07.01 => should convert string to lowercase', () => {
      expect(strings.toLowerCase('HELLO')).toBe('hello');
      expect(strings.toLowerCase('Hello World')).toBe('hello world');
      expect(strings.toLowerCase('hELLo')).toBe('hello');
    });

    it('#01.07.02 => should preserve already lowercase strings', () => {
      expect(strings.toLowerCase('hello')).toBe('hello');
      expect(strings.toLowerCase('hello world')).toBe('hello world');
    });

    it('#01.07.03 => should handle empty strings', () => {
      expect(strings.toLowerCase('')).toBe('');
    });

    it('#01.07.04 => should preserve type-level lowercase', () => {
      expectTypeOf(strings.toLowerCase('HELLO')).toEqualTypeOf<'hello'>();
      expectTypeOf(strings.toLowerCase('World')).toEqualTypeOf<'world'>();
    });
  });

  describe('#01.08 => strings.toUpperCase', () => {
    it('#01.08.01 => should convert string to uppercase', () => {
      expect(strings.toUpperCase('hello')).toBe('HELLO');
      expect(strings.toUpperCase('Hello World')).toBe('HELLO WORLD');
      expect(strings.toUpperCase('hELLo')).toBe('HELLO');
    });

    it('#01.08.02 => should preserve already uppercase strings', () => {
      expect(strings.toUpperCase('HELLO')).toBe('HELLO');
      expect(strings.toUpperCase('HELLO WORLD')).toBe('HELLO WORLD');
    });

    it('#01.08.03 => should handle empty strings', () => {
      expect(strings.toUpperCase('')).toBe('');
    });

    it('#01.08.04 => should preserve type-level uppercase', () => {
      expectTypeOf(strings.toUpperCase('hello')).toEqualTypeOf<'HELLO'>();
      expectTypeOf(strings.toUpperCase('world')).toEqualTypeOf<'WORLD'>();
    });
  });

  describe('#01.09 => strings.add', () => {
    it('#01.09.01 => should add before and after strings', () => {
      expect(strings.add('hello', 'prefix-', '-suffix')).toBe(
        'prefix-hello-suffix',
      );
      expect(strings.add('world', '<<', '>>')).toBe('<<world>>');
    });

    it('#01.09.02 => should handle empty before and after', () => {
      expect(strings.add('hello', '', '')).toBe('hello');
      expect(strings.add('hello')).toBe('hello');
    });

    it('#01.09.03 => should add only before string', () => {
      expect(strings.add('hello', 'prefix-')).toBe('prefix-hello');
    });

    it('#01.09.04 => should add only after string', () => {
      expect(strings.add('hello', '', '-suffix')).toBe('hello-suffix');
    });

    it('#01.09.05 => should preserve type-level concatenation', () => {
      expectTypeOf(
        strings.add('hello', 'pre', 'suf'),
      ).toEqualTypeOf<'prehellosuf'>();
    });
  });

  describe('#01.10 => strings.join', () => {
    it('#01.10.01 => should join strings with custom separator', () => {
      expect(strings.join(', ', 'hello', 'world', 'test')).toBe(
        'hello, world, test',
      );
      expect(strings.join(' | ', 'a', 'b', 'c')).toBe('a | b | c');
    });

    it('#01.10.02 => should join strings with default separator', () => {
      expect(strings.join(' ', 'hello', 'world')).toBe('hello world');
    });

    it('#01.10.03 => should handle empty arrays', () => {
      expect(strings.join(',')).toBe('');
    });

    it('#01.10.04 => should handle single element', () => {
      expect(strings.join(', ', 'hello')).toBe('hello');
    });

    it('#01.10.05 => should handle empty strings in array', () => {
      expect(strings.join(', ', 'hello', '', 'world')).toBe(
        'hello, , world',
      );
    });

    it('#01.10.06 => should preserve type-level join', () => {
      expectTypeOf(
        strings.join(', ', 'hello', 'world'),
      ).toEqualTypeOf<'hello, world'>();
    });
  });

  describe('#01.11 => strings.splitBy', () => {
    it('#01.11.01 => should split string by custom separator', () => {
      expect(strings.splitBy('hello,world,test', ',')).toEqual([
        'hello',
        'world',
        'test',
      ]);
      expect(strings.splitBy('a|b|c', '|')).toEqual(['a', 'b', 'c']);
    });

    it('#01.11.02 => should split string by default separator', () => {
      expect(strings.splitBy('hello.world')).toEqual(['hello', 'world']);
      expect(strings.splitBy('a.b.c')).toEqual(['a', 'b', 'c']);
    });

    it('#01.11.03 => should handle no separator found', () => {
      expect(strings.splitBy('hello', ',')).toEqual(['hello']);
    });

    it('#01.11.04 => should handle empty string', () => {
      expect(strings.splitBy('', ',')).toEqual(['']);
    });

    it('#01.11.05 => should handle consecutive separators', () => {
      expect(strings.splitBy('hello,,world', ',')).toEqual([
        'hello',
        '',
        'world',
      ]);
    });

    it('#01.11.06 => should preserve type-level split', () => {
      expectTypeOf(strings.splitBy('hello.world', '.')).toEqualTypeOf<
        ['hello', 'world']
      >();
    });
  });
});

describe('#02 => Strings Letters Functions', () => {
  describe('#02.01 => strings.letters.is', () => {
    it('#02.01.01 => should return true for valid English letters', () => {
      expect(strings.letters.is('hello')).toBe(true);
      expect(strings.letters.is('world')).toBe(true);
      expect(strings.letters.is('a')).toBe(true);
      expect(strings.letters.is('z')).toBe(true);
    });

    it('#02.01.02 => should return true for mixed case letters', () => {
      expect(strings.letters.is('Hello')).toBe(true);
      expect(strings.letters.is('WORLD')).toBe(true);
      expect(strings.letters.is('HeLLo')).toBe(true);
    });

    it('#02.01.03 => should return false for strings with numbers', () => {
      expect(strings.letters.is('hello123')).toBe(false);
      expect(strings.letters.is('test1')).toBe(false);
      expect(strings.letters.is('123hello')).toBe(false);
    });

    it('#02.01.04 => should return false for strings with special characters', () => {
      expect(strings.letters.is('hello!')).toBe(false);
      expect(strings.letters.is('hello world')).toBe(false);
      expect(strings.letters.is('hello-world')).toBe(false);
      expect(strings.letters.is('hello_world')).toBe(false);
    });

    it('#02.01.05 => should return false for non-string types', () => {
      expect(strings.letters.is(123)).toBe(false);
      expect(strings.letters.is(null)).toBe(false);
      expect(strings.letters.is(undefined)).toBe(false);
      expect(strings.letters.is(true)).toBe(false);
    });

    it('#02.01.06 => should return false for empty string', () => {
      expect(strings.letters.is('')).toBe(false);
    });

    it('#02.01.07 => should return false for non-English letters', () => {
      expect(strings.letters.is('héllo')).toBe(false);
      expect(strings.letters.is('naïve')).toBe(false);
      expect(strings.letters.is('résumé')).toBe(false);
    });

    it('#02.01.08 => should act as type guard', () => {
      const value: unknown = 'hello';
      if (strings.letters.is(value)) {
        expectTypeOf(value).toBeString();
      }
    });
  });

  describe('#02.02 => strings.letters.lower.is', () => {
    it('#02.02.01 => should return true for valid lowercase English letters', () => {
      expect(strings.letters.lower.is('hello')).toBe(true);
      expect(strings.letters.lower.is('world')).toBe(true);
      expect(strings.letters.lower.is('a')).toBe(true);
      expect(strings.letters.lower.is('z')).toBe(true);
    });

    it('#02.02.02 => should return false for mixed case letters', () => {
      expect(strings.letters.lower.is('Hello')).toBe(false);
      expect(strings.letters.lower.is('WORLD')).toBe(false);
      expect(strings.letters.lower.is('HeLLo')).toBe(false);
    });

    it('#02.02.03 => should return false for uppercase letters', () => {
      expect(strings.letters.lower.is('HELLO')).toBe(false);
      expect(strings.letters.lower.is('A')).toBe(false);
      expect(strings.letters.lower.is('Z')).toBe(false);
    });

    it('#02.02.04 => should return false for strings with numbers', () => {
      expect(strings.letters.lower.is('hello123')).toBe(false);
      expect(strings.letters.lower.is('test1')).toBe(false);
    });

    it('#02.02.05 => should return false for strings with special characters', () => {
      expect(strings.letters.lower.is('hello!')).toBe(false);
      expect(strings.letters.lower.is('hello world')).toBe(false);
      expect(strings.letters.lower.is('hello-world')).toBe(false);
    });

    it('#02.02.06 => should return false for non-string types', () => {
      expect(strings.letters.lower.is(123)).toBe(false);
      expect(strings.letters.lower.is(null)).toBe(false);
      expect(strings.letters.lower.is(undefined)).toBe(false);
    });

    it('#02.02.07 => should return false for empty string', () => {
      expect(strings.letters.lower.is('')).toBe(false);
    });

    it('#02.02.08 => should act as type guard', () => {
      const value: unknown = 'hello';
      if (strings.letters.lower.is(value)) {
        expectTypeOf(value).toBeString();
      }
    });
  });

  describe('#02.03 => strings.letters.upper.is', () => {
    it('#02.03.01 => should return true for valid uppercase English letters', () => {
      expect(strings.letters.upper.is('HELLO')).toBe(true);
      expect(strings.letters.upper.is('WORLD')).toBe(true);
      expect(strings.letters.upper.is('A')).toBe(true);
      expect(strings.letters.upper.is('Z')).toBe(true);
    });

    it('#02.03.02 => should return false for mixed case letters', () => {
      expect(strings.letters.upper.is('Hello')).toBe(false);
      expect(strings.letters.upper.is('WOrLD')).toBe(false);
      expect(strings.letters.upper.is('HeLLo')).toBe(false);
    });

    it('#02.03.03 => should return false for lowercase letters', () => {
      expect(strings.letters.upper.is('hello')).toBe(false);
      expect(strings.letters.upper.is('a')).toBe(false);
      expect(strings.letters.upper.is('z')).toBe(false);
    });

    it('#02.03.04 => should return false for strings with numbers', () => {
      expect(strings.letters.upper.is('HELLO123')).toBe(false);
      expect(strings.letters.upper.is('TEST1')).toBe(false);
    });

    it('#02.03.05 => should return false for strings with special characters', () => {
      expect(strings.letters.upper.is('HELLO!')).toBe(false);
      expect(strings.letters.upper.is('HELLO WORLD')).toBe(false);
      expect(strings.letters.upper.is('HELLO-WORLD')).toBe(false);
    });

    it('#02.03.06 => should return false for non-string types', () => {
      expect(strings.letters.upper.is(123)).toBe(false);
      expect(strings.letters.upper.is(null)).toBe(false);
      expect(strings.letters.upper.is(undefined)).toBe(false);
    });

    it('#02.03.07 => should return false for empty string', () => {
      expect(strings.letters.upper.is('')).toBe(false);
    });

    it('#02.03.08 => should act as type guard', () => {
      const value: unknown = 'HELLO';
      if (strings.letters.upper.is(value)) {
        expectTypeOf(value).toBeString();
        expectTypeOf(value).toEqualTypeOf<UpperLetters>(); // Specific uppercase letters
      }
    });
  });
});

describe('#03 => Edge Cases and Error Handling', () => {
  describe('#03.01 => Special Characters and Unicode', () => {
    it('#03.01.01 => should handle Unicode characters correctly', () => {
      expect(strings.getLength('🚀')).toBe(2); // Emoji takes 2 characters
      expect(strings.getLength('café')).toBe(4);
    });

    it('#03.01.02 => should handle newlines and tabs', () => {
      expect(strings.includes('hello\nworld', '\n')).toBe(true);
      expect(strings.includes('hello\tworld', '\t')).toBe(true);
    });

    it('#03.01.03 => should handle escape sequences', () => {
      expect(strings.includes('hello\\world', '\\')).toBe(true);
      expect(strings.includes('hello"world', '"')).toBe(true);
    });
  });

  describe('#03.02 => Empty and Whitespace Handling', () => {
    it('#03.02.01 => should handle empty strings consistently', () => {
      expect(strings.is('')).toBe(true);
      expect(strings.getLength('')).toBe(0);
      expect(strings.startsWith('', '')).toBe(true);
      expect(strings.endsWith('', '')).toBe(true);
      expect(strings.includes('', '')).toBe(true);
    });

    it('#03.02.02 => should handle whitespace strings', () => {
      expect(strings.is(' ')).toBe(true);
      expect(strings.getLength('   ')).toBe(3);
      expect(strings.letters.is('   ')).toBe(false);
    });
  });

  describe('#03.03 => Type Boundaries', () => {
    it('#03.03.01 => should handle String object instances', () => {
      const strObj = new String('hello');
      expect(strings.is.instance(strObj)).toBe(true);
      expect(strings.getLength(strObj.toString())).toBe(5);
    });

    it('#03.03.02 => should handle null and undefined safely', () => {
      expect(strings.is(null)).toBe(false);
      expect(strings.is(undefined)).toBe(false);
      expect(strings.startsWith(null, 'test')).toBe(false);
      expect(strings.endsWith(undefined, 'test')).toBe(false);
      expect(strings.includes(null, 'test')).toBe(false);
    });
  });

  describe('#03.04 => Performance and Large Strings', () => {
    it('#03.04.01 => should handle large strings efficiently', () => {
      const largeString = 'a'.repeat(10000);
      expect(strings.getLength(largeString)).toBe(10000);
      expect(strings.startsWith(largeString, 'a')).toBe(true);
      expect(strings.endsWith(largeString, 'a')).toBe(true);
    });

    it('#03.04.02 => should handle complex join operations', () => {
      const manyStrings = Array.from(
        { length: 100 },
        (_, i) => `item${i}`,
      );
      const result = strings.join(', ', ...manyStrings);
      expect(result).toContain('item0, item1');
      expect(result).toContain('item98, item99');
    });
  });
});
