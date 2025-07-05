import type { UpperLetters } from 'types';
import { describe, expect, expectTypeOf, it } from 'vitest';
import { strings } from './strings';

describe('1. Strings Main Functions', () => {
  describe('1.1 strings.is', () => {
    it('1.1.1 should return true for string literals', () => {
      expect(strings.is('hello')).toBe(true);
      expect(strings.is('')).toBe(true);
      expect(strings.is('123')).toBe(true);
    });

    it('1.1.2 should return true for String objects', () => {
      expect(strings.is.instance(new String('hello'))).toBe(true);
      expect(strings.is.instance(new String(''))).toBe(true);
    });

    it('1.1.3 should return false for non-string types', () => {
      expect(strings.is(123)).toBe(false);
      expect(strings.is(null)).toBe(false);
      expect(strings.is(undefined)).toBe(false);
      expect(strings.is(true)).toBe(false);
      expect(strings.is({})).toBe(false);
      expect(strings.is([])).toBe(false);
    });

    it('1.1.4 should act as type guard', () => {
      const value: unknown = 'hello';
      if (strings.is(value)) {
        expectTypeOf(value).toEqualTypeOf<string>();
      }
    });
  });

  describe('1.2 strings.type', () => {
    it('1.2.1 should reference String constructor', () => {
      expect(strings.type).toBe(String);
    });

    it('1.2.2 should work with instanceof', () => {
      expect(new String('hello') instanceof strings.type).toBe(true);
    });
  });

  describe('1.3 strings.getLength', () => {
    it('1.3.1 should return correct length for regular strings', () => {
      expect(strings.getLength('hello')).toBe(5);
      expect(strings.getLength('')).toBe(0);
      expect(strings.getLength('a')).toBe(1);
    });

    it('1.3.2 should return correct length for strings with special characters', () => {
      expect(strings.getLength('héllo')).toBe(5);
      expect(strings.getLength('hello\nworld')).toBe(11);
      expect(strings.getLength('hello\tworld')).toBe(11);
    });

    it('1.3.3 should preserve type-level length', () => {
      expectTypeOf(strings.getLength('hello')).toEqualTypeOf<number>();
      expectTypeOf(strings.getLength('hi')).toEqualTypeOf<number>();
    });
  });

  describe('1.4 strings.startsWith', () => {
    it('1.4.1 should return true when string starts with prefix', () => {
      expect(strings.startsWith('hello world', 'hello')).toBe(true);
      expect(strings.startsWith('hello world', 'h')).toBe(true);
      expect(strings.startsWith('hello world', '')).toBe(true);
    });

    it('1.4.2 should return false when string does not start with prefix', () => {
      expect(strings.startsWith('hello world', 'world')).toBe(false);
      expect(strings.startsWith('hello world', 'Hello')).toBe(false);
      expect(strings.startsWith('hello world', 'hello world extra')).toBe(
        false,
      );
    });

    it('1.4.3 should return false for non-string values', () => {
      expect(strings.startsWith(123, 'hello')).toBe(false);
      expect(strings.startsWith(null, 'hello')).toBe(false);
      expect(strings.startsWith(undefined, 'hello')).toBe(false);
    });

    it('1.4.4 should act as type guard', () => {
      const value: unknown = 'hello world';
      if (strings.startsWith(value, 'hello')) {
        expectTypeOf(value).toEqualTypeOf<`hello${string}`>();
      }
    });
  });

  describe('1.5 strings.endsWith', () => {
    it('1.5.1 should return true when string ends with suffix', () => {
      expect(strings.endsWith('hello world', 'world')).toBe(true);
      expect(strings.endsWith('hello world', 'd')).toBe(true);
      expect(strings.endsWith('hello world', '')).toBe(true);
    });

    it('1.5.2 should return false when string does not end with suffix', () => {
      expect(strings.endsWith('hello world', 'hello')).toBe(false);
      expect(strings.endsWith('hello world', 'World')).toBe(false);
      expect(strings.endsWith('hello world', 'extra hello world')).toBe(
        false,
      );
    });

    it('1.5.3 should return false for non-string values', () => {
      expect(strings.endsWith(123, 'world')).toBe(false);
      expect(strings.endsWith(null, 'world')).toBe(false);
      expect(strings.endsWith(undefined, 'world')).toBe(false);
    });

    it('1.5.4 should act as type guard', () => {
      const value: unknown = 'hello world';
      if (strings.endsWith(value, 'world')) {
        expectTypeOf(value).toEqualTypeOf<`${string}world`>();
      }
    });
  });

  describe('1.6 strings.include/contains', () => {
    it('1.6.1 should return true when string includes segment', () => {
      expect(strings.include('hello world', 'llo')).toBe(true);
      expect(strings.contains('hello world', 'o w')).toBe(true);
      expect(strings.include('hello world', '')).toBe(true);
    });

    it('1.6.2 should return false when string does not include segment', () => {
      expect(strings.include('hello world', 'xyz')).toBe(false);
      expect(strings.contains('hello world', 'Hello')).toBe(false);
      expect(strings.include('hello world', 'hello world extra')).toBe(
        false,
      );
    });

    it('1.6.3 should return false for non-string values', () => {
      expect(strings.include(123, 'hello')).toBe(false);
      expect(strings.contains(null, 'hello')).toBe(false);
      expect(strings.contains(undefined, 'hello')).toBe(false);
    });

    it('1.6.4 should act as type guard', () => {
      const value: unknown = 'hello world';
      if (strings.include(value, 'llo')) {
        expectTypeOf(value).toEqualTypeOf<`${string}llo${string}`>();
      }
    });
  });

  describe('1.7 strings.toLowerCase', () => {
    it('1.7.1 should convert string to lowercase', () => {
      expect(strings.toLowerCase('HELLO')).toBe('hello');
      expect(strings.toLowerCase('Hello World')).toBe('hello world');
      expect(strings.toLowerCase('hELLo')).toBe('hello');
    });

    it('1.7.2 should preserve already lowercase strings', () => {
      expect(strings.toLowerCase('hello')).toBe('hello');
      expect(strings.toLowerCase('hello world')).toBe('hello world');
    });

    it('1.7.3 should handle empty strings', () => {
      expect(strings.toLowerCase('')).toBe('');
    });

    it('1.7.4 should preserve type-level lowercase', () => {
      expectTypeOf(strings.toLowerCase('HELLO')).toEqualTypeOf<'hello'>();
      expectTypeOf(strings.toLowerCase('World')).toEqualTypeOf<'world'>();
    });
  });

  describe('1.8 strings.toUpperCase', () => {
    it('1.8.1 should convert string to uppercase', () => {
      expect(strings.toUpperCase('hello')).toBe('HELLO');
      expect(strings.toUpperCase('Hello World')).toBe('HELLO WORLD');
      expect(strings.toUpperCase('hELLo')).toBe('HELLO');
    });

    it('1.8.2 should preserve already uppercase strings', () => {
      expect(strings.toUpperCase('HELLO')).toBe('HELLO');
      expect(strings.toUpperCase('HELLO WORLD')).toBe('HELLO WORLD');
    });

    it('1.8.3 should handle empty strings', () => {
      expect(strings.toUpperCase('')).toBe('');
    });

    it('1.8.4 should preserve type-level uppercase', () => {
      expectTypeOf(strings.toUpperCase('hello')).toEqualTypeOf<'HELLO'>();
      expectTypeOf(strings.toUpperCase('world')).toEqualTypeOf<'WORLD'>();
    });
  });

  describe('1.9 strings.add', () => {
    it('1.9.1 should add before and after strings', () => {
      expect(strings.add('hello', 'prefix-', '-suffix')).toBe(
        'prefix-hello-suffix',
      );
      expect(strings.add('world', '<<', '>>')).toBe('<<world>>');
    });

    it('1.9.2 should handle empty before and after', () => {
      expect(strings.add('hello', '', '')).toBe('hello');
      expect(strings.add('hello')).toBe('hello');
    });

    it('1.9.3 should add only before string', () => {
      expect(strings.add('hello', 'prefix-')).toBe('prefix-hello');
    });

    it('1.9.4 should add only after string', () => {
      expect(strings.add('hello', '', '-suffix')).toBe('hello-suffix');
    });

    it('1.9.5 should preserve type-level concatenation', () => {
      expectTypeOf(
        strings.add('hello', 'pre', 'suf'),
      ).toEqualTypeOf<'prehellosuf'>();
    });
  });

  describe('1.10 strings.join', () => {
    it('1.10.1 should join strings with custom separator', () => {
      expect(strings.join(', ', 'hello', 'world', 'test')).toBe(
        'hello, world, test',
      );
      expect(strings.join(' | ', 'a', 'b', 'c')).toBe('a | b | c');
    });

    it('1.10.2 should join strings with default separator', () => {
      expect(strings.join(' ', 'hello', 'world')).toBe('hello world');
    });

    it('1.10.3 should handle empty arrays', () => {
      expect(strings.join(',')).toBe('');
    });

    it('1.10.4 should handle single element', () => {
      expect(strings.join(', ', 'hello')).toBe('hello');
    });

    it('1.10.5 should handle empty strings in array', () => {
      expect(strings.join(', ', 'hello', '', 'world')).toBe(
        'hello, , world',
      );
    });

    it('1.10.6 should preserve type-level join', () => {
      expectTypeOf(
        strings.join(', ', 'hello', 'world'),
      ).toEqualTypeOf<'hello, world'>();
    });
  });

  describe('1.11 strings.splitBy', () => {
    it('1.11.1 should split string by custom separator', () => {
      expect(strings.splitBy('hello,world,test', ',')).toEqual([
        'hello',
        'world',
        'test',
      ]);
      expect(strings.splitBy('a|b|c', '|')).toEqual(['a', 'b', 'c']);
    });

    it('1.11.2 should split string by default separator', () => {
      expect(strings.splitBy('hello.world')).toEqual(['hello', 'world']);
      expect(strings.splitBy('a.b.c')).toEqual(['a', 'b', 'c']);
    });

    it('1.11.3 should handle no separator found', () => {
      expect(strings.splitBy('hello', ',')).toEqual(['hello']);
    });

    it('1.11.4 should handle empty string', () => {
      expect(strings.splitBy('', ',')).toEqual(['']);
    });

    it('1.11.5 should handle consecutive separators', () => {
      expect(strings.splitBy('hello,,world', ',')).toEqual([
        'hello',
        '',
        'world',
      ]);
    });

    it('1.11.6 should preserve type-level split', () => {
      expectTypeOf(strings.splitBy('hello.world', '.')).toEqualTypeOf<
        ['hello', 'world']
      >();
    });
  });
});

describe('2. Strings Letters Functions', () => {
  describe('2.1 strings.letters.is', () => {
    it('2.1.1 should return true for valid English letters', () => {
      expect(strings.letters.is('hello')).toBe(true);
      expect(strings.letters.is('world')).toBe(true);
      expect(strings.letters.is('a')).toBe(true);
      expect(strings.letters.is('z')).toBe(true);
    });

    it('2.1.2 should return true for mixed case letters', () => {
      expect(strings.letters.is('Hello')).toBe(true);
      expect(strings.letters.is('WORLD')).toBe(true);
      expect(strings.letters.is('HeLLo')).toBe(true);
    });

    it('2.1.3 should return false for strings with numbers', () => {
      expect(strings.letters.is('hello123')).toBe(false);
      expect(strings.letters.is('test1')).toBe(false);
      expect(strings.letters.is('123hello')).toBe(false);
    });

    it('2.1.4 should return false for strings with special characters', () => {
      expect(strings.letters.is('hello!')).toBe(false);
      expect(strings.letters.is('hello world')).toBe(false);
      expect(strings.letters.is('hello-world')).toBe(false);
      expect(strings.letters.is('hello_world')).toBe(false);
    });

    it('2.1.5 should return false for non-string types', () => {
      expect(strings.letters.is(123)).toBe(false);
      expect(strings.letters.is(null)).toBe(false);
      expect(strings.letters.is(undefined)).toBe(false);
      expect(strings.letters.is(true)).toBe(false);
    });

    it('2.1.6 should return false for empty string', () => {
      expect(strings.letters.is('')).toBe(false);
    });

    it('2.1.7 should return false for non-English letters', () => {
      expect(strings.letters.is('héllo')).toBe(false);
      expect(strings.letters.is('naïve')).toBe(false);
      expect(strings.letters.is('résumé')).toBe(false);
    });

    it('2.1.8 should act as type guard', () => {
      const value: unknown = 'hello';
      if (strings.letters.is(value)) {
        expectTypeOf(value).toBeString();
      }
    });
  });

  describe('2.2 strings.letters.lower.is', () => {
    it('2.2.1 should return true for valid lowercase English letters', () => {
      expect(strings.letters.lower.is('hello')).toBe(true);
      expect(strings.letters.lower.is('world')).toBe(true);
      expect(strings.letters.lower.is('a')).toBe(true);
      expect(strings.letters.lower.is('z')).toBe(true);
    });

    it('2.2.2 should return false for mixed case letters', () => {
      expect(strings.letters.lower.is('Hello')).toBe(false);
      expect(strings.letters.lower.is('WORLD')).toBe(false);
      expect(strings.letters.lower.is('HeLLo')).toBe(false);
    });

    it('2.2.3 should return false for uppercase letters', () => {
      expect(strings.letters.lower.is('HELLO')).toBe(false);
      expect(strings.letters.lower.is('A')).toBe(false);
      expect(strings.letters.lower.is('Z')).toBe(false);
    });

    it('2.2.4 should return false for strings with numbers', () => {
      expect(strings.letters.lower.is('hello123')).toBe(false);
      expect(strings.letters.lower.is('test1')).toBe(false);
    });

    it('2.2.5 should return false for strings with special characters', () => {
      expect(strings.letters.lower.is('hello!')).toBe(false);
      expect(strings.letters.lower.is('hello world')).toBe(false);
      expect(strings.letters.lower.is('hello-world')).toBe(false);
    });

    it('2.2.6 should return false for non-string types', () => {
      expect(strings.letters.lower.is(123)).toBe(false);
      expect(strings.letters.lower.is(null)).toBe(false);
      expect(strings.letters.lower.is(undefined)).toBe(false);
    });

    it('2.2.7 should return false for empty string', () => {
      expect(strings.letters.lower.is('')).toBe(false);
    });

    it('2.2.8 should act as type guard', () => {
      const value: unknown = 'hello';
      if (strings.letters.lower.is(value)) {
        expectTypeOf(value).toBeString();
      }
    });
  });

  describe('2.3 strings.letters.upper.is', () => {
    it('2.3.1 should return true for valid uppercase English letters', () => {
      expect(strings.letters.upper.is('HELLO')).toBe(true);
      expect(strings.letters.upper.is('WORLD')).toBe(true);
      expect(strings.letters.upper.is('A')).toBe(true);
      expect(strings.letters.upper.is('Z')).toBe(true);
    });

    it('2.3.2 should return false for mixed case letters', () => {
      expect(strings.letters.upper.is('Hello')).toBe(false);
      expect(strings.letters.upper.is('WOrLD')).toBe(false);
      expect(strings.letters.upper.is('HeLLo')).toBe(false);
    });

    it('2.3.3 should return false for lowercase letters', () => {
      expect(strings.letters.upper.is('hello')).toBe(false);
      expect(strings.letters.upper.is('a')).toBe(false);
      expect(strings.letters.upper.is('z')).toBe(false);
    });

    it('2.3.4 should return false for strings with numbers', () => {
      expect(strings.letters.upper.is('HELLO123')).toBe(false);
      expect(strings.letters.upper.is('TEST1')).toBe(false);
    });

    it('2.3.5 should return false for strings with special characters', () => {
      expect(strings.letters.upper.is('HELLO!')).toBe(false);
      expect(strings.letters.upper.is('HELLO WORLD')).toBe(false);
      expect(strings.letters.upper.is('HELLO-WORLD')).toBe(false);
    });

    it('2.3.6 should return false for non-string types', () => {
      expect(strings.letters.upper.is(123)).toBe(false);
      expect(strings.letters.upper.is(null)).toBe(false);
      expect(strings.letters.upper.is(undefined)).toBe(false);
    });

    it('2.3.7 should return false for empty string', () => {
      expect(strings.letters.upper.is('')).toBe(false);
    });

    it('2.3.8 should act as type guard', () => {
      const value: unknown = 'HELLO';
      if (strings.letters.upper.is(value)) {
        expectTypeOf(value).toBeString();
        expectTypeOf(value).toEqualTypeOf<UpperLetters>(); // Specific uppercase letters
      }
    });
  });
});

describe('3. Edge Cases and Error Handling', () => {
  describe('3.1 Special Characters and Unicode', () => {
    it('3.1.1 should handle Unicode characters correctly', () => {
      expect(strings.getLength('🚀')).toBe(2); // Emoji takes 2 characters
      expect(strings.getLength('café')).toBe(4);
    });

    it('3.1.2 should handle newlines and tabs', () => {
      expect(strings.include('hello\nworld', '\n')).toBe(true);
      expect(strings.include('hello\tworld', '\t')).toBe(true);
    });

    it('3.1.3 should handle escape sequences', () => {
      expect(strings.include('hello\\world', '\\')).toBe(true);
      expect(strings.include('hello"world', '"')).toBe(true);
    });
  });

  describe('3.2 Empty and Whitespace Handling', () => {
    it('3.2.1 should handle empty strings consistently', () => {
      expect(strings.is('')).toBe(true);
      expect(strings.getLength('')).toBe(0);
      expect(strings.startsWith('', '')).toBe(true);
      expect(strings.endsWith('', '')).toBe(true);
      expect(strings.include('', '')).toBe(true);
    });

    it('3.2.2 should handle whitespace strings', () => {
      expect(strings.is(' ')).toBe(true);
      expect(strings.getLength('   ')).toBe(3);
      expect(strings.letters.is('   ')).toBe(false);
    });
  });

  describe('3.3 Type Boundaries', () => {
    it('3.3.1 should handle String object instances', () => {
      const strObj = new String('hello');
      expect(strings.is.instance(strObj)).toBe(true);
      expect(strings.getLength(strObj.toString())).toBe(5);
    });

    it('3.3.2 should handle null and undefined safely', () => {
      expect(strings.is(null)).toBe(false);
      expect(strings.is(undefined)).toBe(false);
      expect(strings.startsWith(null, 'test')).toBe(false);
      expect(strings.endsWith(undefined, 'test')).toBe(false);
      expect(strings.include(null, 'test')).toBe(false);
    });
  });

  describe('3.4 Performance and Large Strings', () => {
    it('3.4.1 should handle large strings efficiently', () => {
      const largeString = 'a'.repeat(10000);
      expect(strings.getLength(largeString)).toBe(10000);
      expect(strings.startsWith(largeString, 'a')).toBe(true);
      expect(strings.endsWith(largeString, 'a')).toBe(true);
    });

    it('3.4.2 should handle complex join operations', () => {
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
