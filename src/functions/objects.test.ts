import { objects } from './objects';

describe('objects', () => {
  // Test 1: Basic object type checking
  describe('#01 objects.is', () => {
    it('#01.01 should return true for plain objects', () => {
      expect(objects.is({})).toBe(true);
      expect(objects.is({ a: 1 })).toBe(true);
      expect(objects.is({ nested: { value: 'test' } })).toBe(true);
    });

    it('#01.02 should return false for non-plain objects', () => {
      expect(objects.is(null)).toBe(false);
      expect(objects.is(undefined)).toBe(false);
      expect(objects.is([])).toBe(false);
      expect(objects.is(new Date())).toBe(false);
      expect(objects.is(/regex/)).toBe(false);
      expect(objects.is(new Map())).toBe(false);
      expect(objects.is(new Set())).toBe(false);
    });
    it('#34.02 should handle deeply nested objects', () => {
      const deepObj: any = {};
      let current = deepObj;

      for (let i = 0; i < 100; i++) {
        current[`level${i}`] = {};
        current = current[`level${i}`];
      }
      current.value = 'deep';

      const result = objects.primitive.clone(deepObj);
      expect(result).toEqual(deepObj);
      expect(result).not.toBe(deepObj);
    });

    // Test 2: Object keys operations
    describe('#02 objects.keys', () => {
      it('#02.01 should return keys of object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(objects.keys(obj)).toEqual(['a', 'b', 'c']);
      });

      it('#02.02 should return empty array for empty object', () => {
        expect(objects.keys({})).toEqual([]);
      });

      it('#02.03 should work with nested objects', () => {
        const obj = { nested: { value: 'test' }, simple: 'value' };
        expect(objects.keys(obj)).toEqual(['nested', 'simple']);
      });
    });

    // Test 3: Object keysof (alias for keys)
    describe('#03 objects.keysof', () => {
      it('#03.01 should return keys of object (same as keys)', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(objects.keysof(obj)).toEqual(['a', 'b', 'c']);
      });

      it('#03.02 should return empty array for empty object', () => {
        expect(objects.keysof({})).toEqual([]);
      });
    });

    // Test 4: Object values operations
    describe('#04 objects.values', () => {
      it('#04.01 should return values of object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(objects.values(obj)).toEqual([1, 2, 3]);
      });

      it('#04.02 should return empty array for empty object', () => {
        expect(objects.values({})).toEqual([]);
      });

      it('#04.03 should work with mixed value types', () => {
        const obj = {
          string: 'test',
          number: 42,
          boolean: true,
          null: null,
        };
        expect(objects.values(obj)).toEqual(['test', 42, true, null]);
      });
    });

    // Test 5: Object entries operations
    describe('#05 objects.entries', () => {
      it('#05.01 should return entries of object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(objects.entries(obj)).toEqual([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ]);
      });

      it('#05.02 should return empty array for empty object', () => {
        expect(objects.entries({})).toEqual([]);
      });

      it('#05.03 should work with mixed value types', () => {
        const obj = { string: 'test', number: 42 };
        expect(objects.entries(obj)).toEqual([
          ['string', 'test'],
          ['number', 42],
        ]);
      });
    });

    // Test 6: Object byKey operations
    describe('#06 objects.byKey', () => {
      it('#06.01 should return value by key', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(objects.byKey(obj, 'a')).toBe(1);
        expect(objects.byKey(obj, 'b')).toBe(2);
        expect(objects.byKey(obj, 'c')).toBe(3);
      });

      it('#06.02 should return undefined for non-existent key', () => {
        const obj = { a: 1, b: 2 };
        expect(objects.byKey(obj, 'c' as any)).toBeUndefined();
      });

      it('#06.03 should work with nested objects', () => {
        const obj = { nested: { value: 'test' }, simple: 'value' };
        expect(objects.byKey(obj, 'nested')).toEqual({ value: 'test' });
        expect(objects.byKey(obj, 'simple')).toBe('value');
      });
    });

    // Test 7: Object hasKeys operations
    describe('#07 objects.hasKeys', () => {
      it('#07.01 should return true when all keys exist', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(objects.hasKeys(obj, 'a', 'b')).toBe(true);
        expect(objects.hasKeys(obj, 'a', 'b', 'c')).toBe(true);
      });

      it('#07.02 should return false when some keys do not exist', () => {
        const obj = { a: 1, b: 2 };
        expect(objects.hasKeys(obj, 'a', 'c')).toBe(false);
        expect(objects.hasKeys(obj, 'd')).toBe(false);
      });

      it('#07.03 should return true for single existing key', () => {
        const obj = { a: 1 };
        expect(objects.hasKeys(obj, 'a')).toBe(true);
      });

      it('#07.04 should handle empty object', () => {
        expect(objects.hasKeys({}, 'a')).toBe(false);
      });
    });

    // Test 8: Object hasAllKeys operations
    describe('#08 objects.hasAllKeys', () => {
      it('#08.01 should return true when all object keys are provided', () => {
        const obj = { a: 1, b: 2 };
        expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(true);
      });

      it('#08.02 should return false when not all object keys are provided', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(false);
      });

      it('#08.03 should return true for empty object with no keys', () => {
        expect(objects.hasAllKeys({} as any)).toBe(true);
      });

      it('#08.04 should return false when extra keys are provided', () => {
        const obj = { a: 1 };
        expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(false);
      });
    });

    // Test 9: Object omit operations
    describe('#09 objects.omit', () => {
      it('#09.01 should omit specified keys', () => {
        const obj = { a: 1, b: 2, c: 3, d: 4 };
        const result = objects.omit(obj, 'b', 'd');
        expect(result).toEqual({ a: 1, c: 3 });
      });

      it('#09.02 should return same object when no keys to omit', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.omit(obj);
        expect(result).toEqual(obj);
      });

      it('#09.03 should handle non-existent keys', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.omit(obj, 'c' as any);
        expect(result).toEqual({ a: 1, b: 2 });
      });

      it('#09.04 should work with nested objects', () => {
        const obj = { nested: { value: 'test' }, simple: 'value' };
        const result = objects.omit(obj, 'simple');
        expect(result).toEqual({ nested: { value: 'test' } });
      });
    });

    // Test 10: Object omit.strict operations
    describe('#10 objects.omit.strict', () => {
      it('#10.01 should omit specified keys strictly', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = objects.omit.strict(obj, 'b');
        expect(result).toEqual({ a: 1, c: 3 });
      });

      it('#10.02 should not modify original object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const original = { ...obj };
        objects.omit.strict(obj, 'b');
        expect(obj).toEqual(original);
      });

      it('#10.03 should handle multiple keys', () => {
        const obj = { a: 1, b: 2, c: 3, d: 4 };
        const result = objects.omit.strict(obj, 'a', 'c');
        expect(result).toEqual({ b: 2, d: 4 });
      });
    });

    // Test 11: Object omit.by operations
    describe('#11 objects.omit.by', () => {
      it('#11.01 should omit by values', () => {
        const obj = { a: 1, b: 2, c: 1, d: 3 };
        const result = objects.omit.by(obj, 1);
        expect(result).toEqual({ b: 2, d: 3 });
      });

      it('#11.02 should handle multiple values', () => {
        const obj = { a: 1, b: 2, c: 3, d: 2 };
        const result = objects.omit.by(obj, 1, 2);
        expect(result).toEqual({ c: 3 });
      });

      it('#11.03 should handle non-existent values', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.omit.by(obj, 3);
        expect(result).toEqual({ a: 1, b: 2 });
      });
    });

    // Test 12: Object omit.deep operations
    describe('#12 objects.omit.deep', () => {
      it('#12.01 should omit keys deeply', () => {
        const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
        const result = objects.omit.deep(obj, 'b');
        expect(result).toEqual({ a: 1, nested: { c: 3 }, d: 4 });
      });

      it('#12.02 should handle multiple deep keys', () => {
        const obj = { a: 1, nested: { b: 2, c: 3, deep: { b: 4 } } };
        const result = objects.omit.deep(obj, 'b');
        expect(result).toEqual({ a: 1, nested: { c: 3, deep: {} } });
      });

      it('#12.03 should work with top-level keys', () => {
        const obj = { a: 1, b: 2, nested: { c: 3 } };
        const result = objects.omit.deep(obj, 'a');
        expect(result).toEqual({ b: 2, nested: { c: 3 } });
      });
    });

    // Test 12bis: Object omit.is operations
    describe('#12bis objects.omit.is', () => {
      it('#12bis.01 should return true when keys are omitted', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = objects.omit.is(obj, 'b', 'd');
        expect(result).toBe(false); // contains key 'b'
      });

      it('#12bis.02 should return true when object does not contain keys', () => {
        const obj = { a: 1, c: 3 };
        const result = objects.omit.is(obj, 'b', 'd');
        expect(result).toBe(true); // does not contain keys 'b' or 'd'
      });

      it('#12bis.03 should return true for empty object', () => {
        const obj = {};
        const result = objects.omit.is(obj, 'a', 'b');
        expect(result).toBe(true);
      });

      it('#12bis.04 should handle non-existent keys', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.omit.is(obj, 'x', 'y');
        expect(result).toBe(true);
      });
    });

    // Test 12ter: Object omit.by.is operations
    describe('#12ter objects.omit.by.is', () => {
      it('#12ter.01 should return false when values are present', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = objects.omit.by.is(obj, 2);
        expect(result).toBe(false); // contains value 2
      });

      it('#12ter.02 should return true when values are not present', () => {
        const obj = { a: 1, c: 3 };
        const result = objects.omit.by.is(obj, 2, 4);
        expect(result).toBe(true); // does not contain values 2 or 4
      });

      it('#12ter.03 should handle multiple values', () => {
        const obj = { a: 'hello', b: 'world', c: 'test' };
        const result = objects.omit.by.is(obj, 'world', 'foo');
        expect(result).toBe(false); // contains value 'world'
      });

      it('#12ter.04 should return true for empty object', () => {
        const obj = {};
        const result = objects.omit.by.is(obj, 1, 2);
        expect(result).toBe(true);
      });
    });

    // Test 12quater: Object omit.deep.is operations
    describe('#12quater objects.omit.deep.is', () => {
      it('#12quater.01 should return false when deep keys are present', () => {
        const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
        const result = objects.omit.deep.is(obj, 'b');
        expect(result).toBe(false); // contains deep key 'b'
      });

      it('#12quater.02 should return true when deep keys are not present', () => {
        const obj = { a: 1, nested: { c: 3 }, d: 4 };
        const result = objects.omit.deep.is(obj, 'b');
        expect(result).toBe(true); // does not contain deep key 'b'
      });

      it('#12quater.03 should handle top-level keys', () => {
        const obj = { a: 1, nested: { c: 3 } };
        const result = objects.omit.deep.is(obj, 'a');
        expect(result).toBe(false); // contains top-level key 'a'
      });

      it('#12quater.04 should handle complex nested structures', () => {
        const obj = {
          level1: {
            level2: {
              level3: {
                value: 'test',
                target: 'found',
              },
            },
          },
        };
        const result = objects.omit.deep.is(obj, 'target');
        expect(result).toBe(false); // contains deep key 'target'
      });

      it('#12quater.05 should return true for empty object', () => {
        const obj = {};
        const result = objects.omit.deep.is(obj, 'a');
        expect(result).toBe(true);
      });
    });

    // Test 12quinquies: Object omit.deep.by operations
    describe('#12quinquies objects.omit.deep.by', () => {
      it('#12quinquies.01 should omit by values deeply', () => {
        const obj = { a: 1, nested: { b: 2, c: 2 }, d: 3 };
        const result = objects.omit.deep.by(obj, 2);
        expect(result).toEqual({ a: 1, nested: {}, d: 3 });
      });

      it('#12quinquies.02 should handle multiple values', () => {
        const obj = {
          a: 'hello',
          nested: { b: 'world', c: 'test' },
          d: 'hello',
        };
        const result = objects.omit.deep.by(obj, 'hello', 'world');
        expect(result).toEqual({ nested: { c: 'test' } });
      });

      it('#12quinquies.03 should work with nested objects', () => {
        const obj = {
          level1: {
            level2: {
              value: 'omit',
              keep: 'keep',
            },
            also: 'omit',
          },
          top: 'omit',
        };
        const result = objects.omit.deep.by(obj, 'omit');
        expect(result).toEqual({
          level1: {
            level2: {
              keep: 'keep',
            },
          },
        });
      });

      it('#12quinquies.04 should handle empty object', () => {
        const obj = {};
        const result = objects.omit.deep.by(obj, 'any');
        expect(result).toEqual({});
      });

      it('#12quinquies.05 should handle non-existent values', () => {
        const obj = { a: 1, nested: { b: 2 } };
        const result = objects.omit.deep.by(obj, 'nonexistent');
        expect(result).toEqual({ a: 1, nested: { b: 2 } });
      });
    });

    // Test 12sexies: Object omit.deep.by.is operations
    describe('#12sexies objects.omit.deep.by.is', () => {
      it('#12sexies.01 should return false when deep values are present', () => {
        const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
        const result = objects.omit.deep.by.is(obj, 2);
        expect(result).toBe(false); // contains deep value 2
      });

      it('#12sexies.02 should return true when deep values are not present', () => {
        const obj = { a: 1, nested: { c: 3 }, d: 4 };
        const result = objects.omit.deep.by.is(obj, 2);
        expect(result).toBe(true); // does not contain deep value 2
      });

      it('#12sexies.03 should handle multiple values', () => {
        const obj = {
          a: 'hello',
          nested: { b: 'world', c: 'test' },
        };
        const result = objects.omit.deep.by.is(obj, 'world', 'foo');
        expect(result).toBe(false); // contains deep value 'world'
      });

      it('#12sexies.04 should handle complex nested structures', () => {
        const obj = {
          level1: {
            level2: {
              level3: {
                value: 'target',
                other: 'keep',
              },
            },
          },
        };
        const result = objects.omit.deep.by.is(obj, 'target');
        expect(result).toBe(false); // contains deep value 'target'
      });

      it('#12sexies.05 should return true for empty object', () => {
        const obj = {};
        const result = objects.omit.deep.by.is(obj, 'any');
        expect(result).toBe(true);
      });
    });

    // Test 13: Object pick operations
    describe('#13 objects.pick', () => {
      it('#13.01 should pick specified keys', () => {
        const obj = { a: 1, b: 2, c: 3, d: 4 };
        const result = objects.pick(obj, 'a', 'c');
        expect(result).toEqual({ a: 1, c: 3 });
      });

      it('#13.02 should return empty object when no keys specified', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.pick(obj);
        expect(result).toEqual({});
      });

      it('#13.03 should handle non-existent keys', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.pick(obj, 'a', 'c' as any);
        expect(result).toEqual({ a: 1 });
      });

      it('#13.04 should work with nested objects', () => {
        const obj = {
          nested: { value: 'test' },
          simple: 'value',
          other: 'data',
        };
        const result = objects.pick(obj, 'nested', 'simple');
        expect(result).toEqual({
          nested: { value: 'test' },
          simple: 'value',
        });
      });
    });

    // Test 14: Object pick.by operations
    describe('#14 objects.pick.by', () => {
      it('#14.01 should pick by values', () => {
        const obj = { a: 1, b: 2, c: 1, d: 3 };
        const result = objects.pick.by(obj, 1);
        expect(result).toEqual({ a: 1, c: 1 });
      });

      it('#14.02 should handle multiple values', () => {
        const obj = { a: 1, b: 2, c: 3, d: 2 };
        const result = objects.pick.by(obj, 1, 2);
        expect(result).toEqual({ a: 1, b: 2, d: 2 });
      });

      it('#14.03 should return empty object for non-existent values', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.pick.by(obj, 3);
        expect(result).toEqual({});
      });
    });

    // Test 15: Object pick.deep operations
    describe('#15 objects.pick.deep', () => {
      it('#15.01 should pick keys deeply', () => {
        const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
        const result = objects.pick.deep(obj, 'b');
        expect(result).toEqual({ nested: { b: 2 } });
      });

      it('#15.02 should handle multiple deep keys', () => {
        const obj = { a: 1, nested: { b: 2, c: 3, deep: { b: 4, d: 5 } } };
        const result = objects.pick.deep(obj, 'b', 'd');
        expect(result).toEqual({ nested: { b: 2, deep: { b: 4, d: 5 } } });
      });

      it('#15.03 should work with top-level keys', () => {
        const obj = { a: 1, b: 2, nested: { c: 3 } };
        const result = objects.pick.deep(obj, 'a');
        expect(result).toEqual({ a: 1 });
      });
    });

    // Test 15bis: Object pick.deep.by operations
    describe('#15bis objects.pick.deep.by', () => {
      it('#15bis.01 should pick by values deeply', () => {
        const obj = { a: 1, nested: { b: 2, c: 3 }, d: 2 };
        const result = objects.pick.deep.by(obj, 2);
        expect(result).toEqual({ nested: { b: 2 }, d: 2 });
      });

      it('#15bis.02 should handle multiple values', () => {
        const obj = {
          a: 'hello',
          nested: { b: 'world', c: 'test' },
          d: 'hello',
        };
        const result = objects.pick.deep.by(obj, 'hello', 'world');
        expect(result).toEqual({
          a: 'hello',
          nested: { b: 'world' },
          d: 'hello',
        });
      });

      it('#15bis.03 should work with nested objects', () => {
        const obj = {
          level1: {
            level2: {
              value: 'pick',
              ignore: 'ignore',
            },
            also: 'pick',
          },
          top: 'pick',
        };
        const result = objects.pick.deep.by(obj, 'pick');
        expect(result).toEqual({
          level1: {
            level2: {
              value: 'pick',
            },
            also: 'pick',
          },
          top: 'pick',
        });
      });

      it('#15bis.04 should handle empty object', () => {
        const obj = {};
        const result = objects.pick.deep.by(obj, 'any');
        expect(result).toEqual({});
      });

      it('#15bis.05 should handle non-existent values', () => {
        const obj = { a: 1, nested: { b: 2 } };
        const result = objects.pick.deep.by(obj, 'nonexistent');
        expect(result).toEqual({});
      });

      it('#15bis.06 should handle complex mixed structures', () => {
        const obj = {
          simple: 'target',
          array: [1, 2, 3],
          nested: {
            value: 'target',
            other: 'different',
            deep: {
              final: 'target',
              number: 42,
            },
          },
        };
        const result = objects.pick.deep.by(obj, 'target');
        expect(result).toEqual({
          simple: 'target',
          nested: {
            value: 'target',
            deep: {
              final: 'target',
            },
          },
        });
      });

      it('#15bis.07 should handle null and undefined values', () => {
        const obj = {
          a: null,
          nested: { b: undefined, c: 'keep' },
          d: null,
        };
        const result = objects.pick.deep.by(obj, null);
        expect(result).toEqual({ a: null, d: null });
      });

      it('#15bis.08 should handle boolean values', () => {
        const obj = {
          flag1: true,
          flag2: false,
          nested: { flag3: true, other: 'ignore' },
        };
        const result = objects.pick.deep.by(obj, true);
        expect(result).toEqual({ flag1: true, nested: { flag3: true } });
      });

      it('#15bis.09 should handle numeric values', () => {
        const obj = {
          zero: 0,
          positive: 42,
          nested: { negative: -1, zero: 0 },
        };
        const result = objects.pick.deep.by(obj, 0);
        expect(result).toEqual({ zero: 0, nested: { zero: 0 } });
      });

      it('#15bis.10 should handle string values with special characters', () => {
        const obj = {
          normal: 'hello world',
          special: '!@#$%',
          nested: { unicode: '🚀', special: '!@#$%' },
        };
        const result = objects.pick.deep.by(obj, '!@#$%');
        expect(result).toEqual({
          special: '!@#$%',
          nested: { special: '!@#$%' },
        });
      });
    });

    // Test 16: Object reverse operations
    describe('#16 objects.reverse', () => {
      it('#16.01 should reverse key-value pairs', () => {
        const obj = { a: 'x', b: 'y', c: 'z' };
        const result = objects.reverse(obj);
        expect(result).toEqual({ x: 'a', y: 'b', z: 'c' });
      });

      it('#16.02 should handle numeric values', () => {
        const obj = { first: '1', second: '2' };
        const result = objects.reverse(obj);
        expect(result).toEqual({ '1': 'first', '2': 'second' });
      });

      it('#16.03 should handle empty object', () => {
        const result = objects.reverse({});
        expect(result).toEqual({});
      });
    });

    // Test 17: Object readonly operations
    describe('#17 objects.readonly', () => {
      it('#17.01 should make object readonly', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.readonly(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
      });

      it('#17.02 should return same reference', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.readonly(obj);
        expect(result).toBe(obj);
      });
    });

    // Test 18: Object freeze operations
    describe('#18 objects.freeze', () => {
      it('#18.01 should freeze object', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.freeze(obj);
        expect(result).toEqual(obj);
        expect(result).toBe(obj);
        expect(Object.isFrozen(result)).toBe(true);
      });

      it('#18.02 should work with nested objects', () => {
        const obj = { nested: { value: 'test' } };
        const result = objects.freeze(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
      });

      describe('#18.03 objects.freeze.forceCast', () => {
        it('#18.03.01 should force cast and freeze object', () => {
          const obj = { a: 1, b: 2 };
          const result = objects.freeze.forceCast(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
          expect(result).toBe(obj);
        });

        it('#18.03.02 should work with any input type', () => {
          const obj = { complex: { nested: 'value' } };
          const result = objects.freeze.forceCast(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
        });
      });

      describe('#18.04 objects.freeze.dynamic', () => {
        it('#18.04.01 should dynamically freeze typed object', () => {
          const obj = { specific: 'value', number: 42 };
          const result = objects.freeze.dynamic(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
          expect(result).toBe(obj);
        });

        it('#18.04.02 should preserve specific object type', () => {
          const obj = { name: 'test', id: 123 };
          const result = objects.freeze.dynamic(obj);
          expect(result.name).toBe('test');
          expect(result.id).toBe(123);
          expect(Object.isFrozen(result)).toBe(true);
        });
      });

      describe('#18.05 objects.freeze.is', () => {
        it('#18.05.01 should return true for frozen objects', () => {
          const obj = { a: 1, b: 2 };
          expect(objects.freeze.is(obj)).toBe(false);

          Object.freeze(obj);
          expect(objects.freeze.is(obj)).toBe(true);
        });

        it('#18.05.02 should return false for non-frozen objects', () => {
          const obj = { a: 1, b: 2 };
          expect(objects.freeze.is(obj)).toBe(false);

          const frozen = objects.freeze(obj);
          expect(objects.freeze.is(frozen)).toBe(true);
        });

        it('#18.05.03 should work with nested objects', () => {
          const obj = { nested: { value: 'test' } };
          expect(objects.freeze.is(obj)).toBe(false);

          const frozen = objects.freeze(obj);
          expect(objects.freeze.is(frozen)).toBe(true);
        });
      });

      describe('#18.06 objects.freeze.const', () => {
        it('#18.06.01 should freeze const object', () => {
          const obj = { a: 1, b: 2 } as const;
          const result = objects.freeze.const(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
          expect(result).toBe(obj);
        });

        it('#18.06.02 should work with const nested objects', () => {
          const obj = { nested: { value: 'test' } } as const;
          const result = objects.freeze.const(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
        });
      });

      describe('#18.07 objects.freeze.not', () => {
        it('#18.07.01 should return object without readonly type', () => {
          const obj = { a: 1, b: 2 };
          const result = objects.freeze.not(obj);
          expect(result).toEqual(obj);
          expect(result).toBe(obj);
        });

        it('#18.07.02 should work with any object type', () => {
          const obj = { complex: { nested: 'value' } };
          const result = objects.freeze.not(obj);
          expect(result).toEqual(obj);
        });
      });

      describe('#18.08 objects.freeze.deep', () => {
        it('#18.08.01 should deep freeze object', () => {
          const obj = { a: 1, nested: { b: 2 } };
          const result = objects.freeze.deep(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
          expect(result).toBe(obj);
        });

        it('#18.08.02 should freeze nested structures', () => {
          const obj = {
            level1: {
              level2: {
                value: 'deep',
              },
            },
          };
          const result = objects.freeze.deep(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
        });

        describe('#18.08.03 objects.freeze.deep.const', () => {
          it('#18.08.03.01 should deep freeze const object', () => {
            const obj = { a: 1, nested: { b: 2 } } as const;
            const result = objects.freeze.deep.const(obj);
            expect(result).toEqual(obj);
            expect(Object.isFrozen(result)).toBe(true);
            expect(result).toBe(obj);
          });

          it('#18.08.03.02 should work with deeply nested const objects', () => {
            const obj = {
              level1: {
                level2: {
                  value: 'deep',
                },
              },
            } as const;
            const result = objects.freeze.deep.const(obj);
            expect(result).toEqual(obj);
            expect(Object.isFrozen(result)).toBe(true);
          });
        });

        describe('#18.08.04 objects.freeze.deep.not', () => {
          it('#18.08.04.01 should return object without deep readonly type', () => {
            const obj = { a: 1, nested: { b: 2 } };
            const result = objects.freeze.deep.not(obj);
            expect(result).toEqual(obj);
            expect(result).toBe(obj);
          });

          it('#18.08.04.02 should preserve object structure', () => {
            const obj = {
              level1: {
                level2: {
                  value: 'deep',
                },
              },
            };
            const result = objects.freeze.deep.not(obj);
            expect(result).toEqual(obj);
          });
        });
      });
    });

    // Test 18bis: Object readonly operations (comprehensive)
    describe('#18bis objects.readonly', () => {
      it('#18bis.01 should make object readonly', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.readonly(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
        expect(result).toBe(obj);
      });

      it('#18bis.02 should return same reference', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.readonly(obj);
        expect(result).toBe(obj);
      });

      describe('#18bis.03 objects.readonly.forceCast', () => {
        it('#18bis.03.01 should force cast and make readonly', () => {
          const obj = { a: 1, b: 2 };
          const result = objects.readonly.forceCast(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
          expect(result).toBe(obj);
        });

        it('#18bis.03.02 should work with any input type', () => {
          const obj = { complex: { nested: 'value' } };
          const result = objects.readonly.forceCast(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
        });
      });

      describe('#18bis.04 objects.readonly.dynamic', () => {
        it('#18bis.04.01 should dynamically make typed object readonly', () => {
          const obj = { specific: 'value', number: 42 };
          const result = objects.readonly.dynamic(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
          expect(result).toBe(obj);
        });

        it('#18bis.04.02 should preserve specific object type', () => {
          const obj = { name: 'test', id: 123 };
          const result = objects.readonly.dynamic(obj);
          expect(result.name).toBe('test');
          expect(result.id).toBe(123);
          expect(Object.isFrozen(result)).toBe(true);
        });
      });

      describe('#18bis.05 objects.readonly.is', () => {
        it('#18bis.05.01 should return true for frozen objects', () => {
          const obj = { a: 1, b: 2 };
          expect(objects.readonly.is(obj)).toBe(false);

          Object.freeze(obj);
          expect(objects.readonly.is(obj)).toBe(true);
        });

        it('#18bis.05.02 should return false for non-frozen objects', () => {
          const obj = { a: 1, b: 2 };
          expect(objects.readonly.is(obj)).toBe(false);

          const readonly = objects.readonly(obj);
          expect(objects.readonly.is(readonly)).toBe(true);
        });

        it('#18bis.05.03 should work with nested objects', () => {
          const obj = { nested: { value: 'test' } };
          expect(objects.readonly.is(obj)).toBe(false);

          const readonly = objects.readonly(obj);
          expect(objects.readonly.is(readonly)).toBe(true);
        });
      });

      describe('#18bis.06 objects.readonly.const', () => {
        it('#18bis.06.01 should make const object readonly', () => {
          const obj = { a: 1, b: 2 } as const;
          const result = objects.readonly.const(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
          expect(result).toBe(obj);
        });

        it('#18bis.06.02 should work with const nested objects', () => {
          const obj = { nested: { value: 'test' } } as const;
          const result = objects.readonly.const(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
        });
      });

      describe('#18bis.07 objects.readonly.not', () => {
        it('#18bis.07.01 should return object without readonly type', () => {
          const obj = { a: 1, b: 2 };
          const result = objects.readonly.not(obj);
          expect(result).toEqual(obj);
          expect(result).toBe(obj);
        });

        it('#18bis.07.02 should work with any object type', () => {
          const obj = { complex: { nested: 'value' } };
          const result = objects.readonly.not(obj);
          expect(result).toEqual(obj);
        });
      });

      describe('#18bis.08 objects.readonly.deep', () => {
        it('#18bis.08.01 should deep make object readonly', () => {
          const obj = { a: 1, nested: { b: 2 } };
          const result = objects.readonly.deep(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
          expect(result).toBe(obj);
        });

        it('#18bis.08.02 should make nested structures readonly', () => {
          const obj = {
            level1: {
              level2: {
                value: 'deep',
              },
            },
          };
          const result = objects.readonly.deep(obj);
          expect(result).toEqual(obj);
          expect(Object.isFrozen(result)).toBe(true);
        });

        describe('#18bis.08.03 objects.readonly.deep.const', () => {
          it('#18bis.08.03.01 should deep make const object readonly', () => {
            const obj = { a: 1, nested: { b: 2 } } as const;
            const result = objects.readonly.deep.const(obj);
            expect(result).toEqual(obj);
            expect(Object.isFrozen(result)).toBe(true);
            expect(result).toBe(obj);
          });

          it('#18bis.08.03.02 should work with deeply nested const objects', () => {
            const obj = {
              level1: {
                level2: {
                  value: 'deep',
                },
              },
            } as const;
            const result = objects.readonly.deep.const(obj);
            expect(result).toEqual(obj);
            expect(Object.isFrozen(result)).toBe(true);
          });
        });

        describe('#18bis.08.04 objects.readonly.deep.not', () => {
          it('#18bis.08.04.01 should return object without deep readonly type', () => {
            const obj = { a: 1, nested: { b: 2 } };
            const result = objects.readonly.deep.not(obj);
            expect(result).toEqual(obj);
            expect(result).toBe(obj);
          });

          it('#18bis.08.04.02 should preserve object structure', () => {
            const obj = {
              level1: {
                level2: {
                  value: 'deep',
                },
              },
            };
            const result = objects.readonly.deep.not(obj);
            expect(result).toEqual(obj);
          });
        });
      });
    });

    // Test 19: Object require operations
    describe('#19 objects.require', () => {
      it('#19.01 should add required properties', () => {
        const obj = { a: 1, b: undefined };
        const result = objects.require(obj, { b: 2 });
        expect(result).toEqual({ a: 1, b: 2 });
      });

      it('#19.02 should not override existing defined properties', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.require(obj, { b: 3 });
        expect(result).toEqual({ a: 1, b: 3 });
      });

      it('#19.03 should handle null values', () => {
        const obj = { a: 1, b: null };
        const result = objects.require(obj, { b: 2 });
        expect(result).toEqual({ a: 1, b: 2 });
      });

      it('#19.04 should add new properties', () => {
        const obj = { a: 1 };
        const result = objects.require(obj, { b: 2 });
        expect(result).toEqual({ a: 1, b: 2 });
      });
    });

    // Test 20: Object require.clone operations
    describe('#20 objects.require.clone', () => {
      it('#20.01 should clone and require', () => {
        const obj = { a: 1, b: undefined };
        const result = objects.require.clone(obj, { b: 2 });
        expect(result).toEqual({ a: 1, b: 2 });
        expect(result).not.toBe(obj);
      });

      it('#20.02 should not modify original object', () => {
        const obj = { a: 1, b: undefined };
        const original = { ...obj };
        objects.require.clone(obj, { b: 2 });
        expect(obj).toEqual(original);
      });
    });

    // Test 21: Object require.strict operations
    describe('#21 objects.require.strict', () => {
      type O = { a: number; b?: number };
      it('#21.01 should require properties strictly', () => {
        const obj: O = { a: 1, b: undefined };
        const result = objects.require.strict(obj, { b: 2 });
        expect(result).toEqual({ a: 1, b: 2 });
      });

      it('#21.02 should modify original object', () => {
        const obj: O = { a: 1, b: undefined };
        objects.require.strict(obj, { b: 2 });
        expect(obj).toEqual({ a: 1, b: 2 });
      });

      it('#21.03 should modify original object', () => {
        const obj: O = { a: 1, b: undefined };
        objects.require.const(obj, { b: 2 });
        expect(obj).toEqual({ a: 1, b: 2 });
      });
    });

    // Test 22: Object require.is operations
    describe('#22 objects.require.is', () => {
      it('#22.01 should return true for fully required object', () => {
        const obj = { a: 1, b: 2, c: 'test' };
        expect(objects.require.is(obj)).toBe(true);
      });

      it('#22.02 should return false for object with undefined values', () => {
        const obj = { a: 1, b: undefined };
        expect(objects.require.is(obj)).toBe(false);
      });

      it('#22.03 should return false for object with null values', () => {
        const obj = { a: 1, b: null };
        expect(objects.require.is(obj)).toBe(false);
      });

      it('#22.04 should return true for empty object', () => {
        expect(objects.require.is({})).toBe(true);
      });
    });

    // Test 23: Object require.is.deep operations
    describe('#23 objects.require.is.deep', () => {
      it('#23.01 should return true for deeply required object', () => {
        const obj = { a: 1, nested: { b: 2, c: 'test' } };
        expect(objects.require.is.deep(obj)).toBe(true);
      });

      it('#23.02 should return false for object with undefined values deep', () => {
        const obj = { a: 1, nested: { b: undefined } };
        expect(objects.require.is.deep(obj)).toBe(false);
      });

      it('#23.03 should return false for object with null values deep', () => {
        const obj = { a: 1, nested: { b: null } };
        expect(objects.require.is.deep(obj)).toBe(false);
      });

      it('#23.04 should handle arrays', () => {
        const obj = { items: [1, 2, 3] };
        expect(objects.require.is.deep(obj)).toBe(true);

        const objWithUndefined = { items: [1, undefined, 3] };
        expect(objects.require.is.deep(objWithUndefined)).toBe(false);
      });

      it('#23.05 should handle nested arrays and objects', () => {
        const obj = {
          items: [
            { name: 'item1', value: 1 },
            { name: 'item2', value: 2 },
          ],
        };
        expect(objects.require.is.deep(obj)).toBe(true);

        const objWithUndefined = {
          items: [
            { name: 'item1', value: undefined },
            { name: 'item2', value: 2 },
          ],
        };
        expect(objects.require.is.deep(objWithUndefined)).toBe(false);
      });

      it('#23.06 should handle empty arrays', () => {
        const obj = { emptyArray: [] };
        expect(objects.require.is.deep(obj)).toBe(true);
      });

      it('#23.07 should handle mixed arrays with primitives', () => {
        const obj = { mixed: ['string', 42, true, null] };
        expect(objects.require.is.deep(obj)).toBe(false);

        const objWithUndefined = { mixed: ['string', 42, undefined] };
        expect(objects.require.is.deep(objWithUndefined)).toBe(false);
      });

      it('#23.08 should handle deeply nested structures', () => {
        const obj = {
          level1: {
            level2: {
              level3: {
                value: 'deep',
                number: 42,
              },
            },
          },
        };
        expect(objects.require.is.deep(obj)).toBe(true);

        const objWithUndefined = {
          level1: {
            level2: {
              level3: {
                value: 'deep',
                number: undefined,
              },
            },
          },
        };
        expect(objects.require.is.deep(objWithUndefined)).toBe(false);
      });

      it('#23.09 should handle arrays containing nested objects', () => {
        const obj = {
          items: [{ nested: { value: 'test' } }, { simple: 'value' }],
        };
        expect(objects.require.is.deep(obj)).toBe(true);

        const objWithUndefined = {
          items: [{ nested: { value: undefined } }, { simple: 'value' }],
        };
        expect(objects.require.is.deep(objWithUndefined)).toBe(false);
      });

      it('#23.10 should handle complex mixed structures', () => {
        const obj = {
          simple: 'value',
          array: [1, 2, { nested: 'deep' }],
          nested: {
            array: ['a', 'b'],
            deep: {
              value: 42,
              another: ['x', { final: 'level' }],
            },
          },
        };
        expect(objects.require.is.deep(obj)).toBe(true);

        const objWithNull = {
          simple: 'value',
          array: [1, 2, { nested: null }],
          nested: {
            array: ['a', 'b'],
            deep: {
              value: 42,
              another: ['x', { final: 'level' }],
            },
          },
        };
        expect(objects.require.is.deep(objWithNull)).toBe(false);
      });

      it('#23.11 should return true for empty object', () => {
        expect(objects.require.is.deep({})).toBe(true);
      });

      it('#23.12 should handle objects with zero values', () => {
        const obj = { zero: 0, empty: '', boolean: false };
        expect(objects.require.is.deep(obj)).toBe(true);
      });
    });

    // Test 24: Object primitive.is operations
    describe('#24 objects.primitive.is', () => {
      it('#24.01 should return true for empty object', () => {
        expect(objects.primitive.is({})).toBe(true);
      });

      it('#24.02 should return true for object with only primitive values', () => {
        const obj = {
          string: 'hello',
          number: 42,
          boolean: true,
          null: null,
          undefined: undefined,
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#24.03 should return true for object with arrays of primitives', () => {
        const obj = {
          strings: ['hello', 'world'],
          numbers: [1, 2, 3],
          booleans: [true, false],
          mixed: ['hello', 42, true, null, undefined],
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#24.04 should return true for nested object with primitives', () => {
        const obj = {
          name: 'test',
          nested: {
            value: 42,
            flag: true,
          },
          deeply: {
            nested: {
              value: 'deep',
            },
          },
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#24.05 should return true for object with arrays containing nested primitive objects', () => {
        const obj = {
          items: [
            { name: 'item1', value: 1 },
            { name: 'item2', value: 2 },
          ],
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#24.06 should return false for object with function', () => {
        const obj = {
          fn: () => {},
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.07 should return false for object with Date', () => {
        const obj = {
          date: new Date(),
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.08 should return false for object with RegExp', () => {
        const obj = {
          regex: /test/,
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.09 should return false for object with Map', () => {
        const obj = {
          map: new Map(),
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.10 should return false for object with Set', () => {
        const obj = {
          set: new Set(),
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.11 should return false for object with class instance', () => {
        class TestClass {
          constructor(public value: string) {}
        }
        const obj = {
          instance: new TestClass('test'),
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.12 should return false for object with Symbol', () => {
        const obj = {
          symbol: Symbol('test'),
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.13 should return false for nested object with non-primitive', () => {
        const obj = {
          name: 'test',
          nested: {
            value: 42,
            fn: () => {},
          },
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.14 should return false for array containing non-primitive objects', () => {
        const obj = {
          items: [
            { name: 'item1', value: 1 },
            { name: 'item2', date: new Date() },
          ],
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.15 should return false for array containing non-primitive values', () => {
        const obj = {
          items: ['string', 42, () => {}],
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.16 should handle deeply nested structures', () => {
        const child = {
          value: 'deep',
          number: 42,
        };
        expect(objects.primitive.is(child)).toBe(true);

        const obj = {
          level1: {
            level2: {
              level3: {
                level4: {
                  value: 'very deep',
                  array: [1, 2, 3],
                },
              },
            },
          },
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#24.17 should handle empty arrays', () => {
        const obj = {
          emptyArray: [],
          value: 'test',
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#24.18 should handle mixed arrays with nested objects', () => {
        const obj = {
          mixed: [
            'string',
            42,
            { nested: 'value' },
            [1, 2, 3],
            { deep: { nested: 'value' } },
          ],
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#24.19 should return false for arrays with functions', () => {
        const obj = {
          mixed: ['string', 42, () => {}],
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.20 should return false for arrays with complex objects', () => {
        const obj = {
          mixed: ['string', 42, { nested: new Date() }],
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#24.21 should return false for non-plain objects', () => {
        expect(objects.primitive.is([])).toBe(false);
        expect(objects.primitive.is(new Date())).toBe(false);
        expect(objects.primitive.is(null)).toBe(false);
        expect(objects.primitive.is(undefined)).toBe(false);
        expect(objects.primitive.is('string')).toBe(false);
        expect(objects.primitive.is(42)).toBe(false);
        expect(objects.primitive.is(true)).toBe(false);
        expect(objects.primitive.is(() => {})).toBe(false);
      });

      it('#24.23 should handle objects with prototype properties', () => {
        const obj = Object.create({ inherited: 'value' });
        obj.own = 'property';
        // Should only check own properties, not inherited ones
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#24.24 should handle objects with numeric keys', () => {
        const obj = {
          1: 'one',
          2: 'two',
          normal: 'value',
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#24.25 should handle objects with mixed nested structures', () => {
        const obj = {
          simple: 'value',
          array: [1, 2, { nested: 'deep' }],
          nested: {
            array: ['a', 'b'],
            deep: {
              value: 42,
              another: ['x', { final: 'level' }],
            },
          },
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });
    });

    // Test 25: Object primitive clone operations
    describe('#25 objects.primitive.clone', () => {
      it('#25.01 should clone primitive object', () => {
        const obj = { a: 1, b: 'test', c: true };
        const result = objects.primitive.clone(obj);
        expect(result).toEqual(obj);
        expect(result).not.toBe(obj);
      });

      it('#25.02 should clone nested primitive object', () => {
        const obj = {
          nested: { value: 'test', number: 42 },
          array: [1, 2, 3],
        };
        const result = objects.primitive.clone(obj);
        expect(result).toEqual(obj);
        expect(result).not.toBe(obj);
        expect(result.nested).not.toBe(obj.nested);
        expect(result.array).not.toBe(obj.array);
      });

      it('#25.03 should clone empty object', () => {
        const obj = {};
        const result = objects.primitive.clone(obj);
        expect(result).toEqual(obj);
        expect(result).not.toBe(obj);
      });

      it('#25.04 should clone object with null values', () => {
        const obj = { a: 1, b: null, c: undefined };
        const result = objects.primitive.clone(obj);
        expect(result).toEqual(obj);
        expect(result).not.toBe(obj);
      });

      it('#25.05 should clone object with arrays', () => {
        const obj = {
          simple: 'value',
          array: [1, 2, { nested: 'deep' }],
        };
        const result = objects.primitive.clone(obj);
        expect(result).toEqual(obj);
        expect(result).not.toBe(obj);
        expect(result.array).not.toBe(obj.array);
        expect(result.array[2]).not.toBe(obj.array[2]);
      });

      it('#25.06 should clone deeply nested object', () => {
        const obj = {
          level1: {
            level2: {
              level3: {
                value: 'deep',
                number: 42,
              },
            },
          },
        };
        const result = objects.primitive.clone(obj);
        expect(result).toEqual(obj);
        expect(result).not.toBe(obj);
        expect(result.level1).not.toBe(obj.level1);
        expect(result.level1.level2).not.toBe(obj.level1.level2);
        expect(result.level1.level2.level3).not.toBe(
          obj.level1.level2.level3,
        );
      });

      it('#25.07 should handle objects with zero and false values', () => {
        const obj = { zero: 0, empty: '', boolean: false };
        const result = objects.primitive.clone(obj);
        expect(result).toEqual(obj);
        expect(result).not.toBe(obj);
      });

      it('#25.08 should clone object with numeric keys', () => {
        const obj = {
          1: 'one',
          2: 'two',
          normal: 'value',
        };
        const result = objects.primitive.clone(obj);
        expect(result).toEqual(obj);
        expect(result).not.toBe(obj);
      });
    });
  });

  it('#02.03 should work with nested objects', () => {
    const obj = { nested: { value: 'test' }, simple: 'value' };
    expect(objects.keys(obj)).toEqual(['nested', 'simple']);
  });
});

// Test 3: Object keysof (alias for keys)
describe('#03 objects.keysof', () => {
  it('#03.01 should return keys of object (same as keys)', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(objects.keysof(obj)).toEqual(['a', 'b', 'c']);
  });

  it('#03.02 should return empty array for empty object', () => {
    expect(objects.keysof({})).toEqual([]);
  });
});

// Test 4: Object values operations
describe('#04 objects.values', () => {
  it('#04.01 should return values of object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(objects.values(obj)).toEqual([1, 2, 3]);
  });

  it('#04.02 should return empty array for empty object', () => {
    expect(objects.values({})).toEqual([]);
  });

  it('#04.03 should work with mixed value types', () => {
    const obj = {
      string: 'test',
      number: 42,
      boolean: true,
      null: null,
    };
    expect(objects.values(obj)).toEqual(['test', 42, true, null]);
  });
});

// Test 5: Object entries operations
describe('#05 objects.entries', () => {
  it('#05.01 should return entries of object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(objects.entries(obj)).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('#05.02 should return empty array for empty object', () => {
    expect(objects.entries({})).toEqual([]);
  });

  it('#05.03 should work with mixed value types', () => {
    const obj = { string: 'test', number: 42 };
    expect(objects.entries(obj)).toEqual([
      ['string', 'test'],
      ['number', 42],
    ]);
  });
});

// Test 6: Object byKey operations
describe('#06 objects.byKey', () => {
  it('#06.01 should return value by key', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(objects.byKey(obj, 'a')).toBe(1);
    expect(objects.byKey(obj, 'b')).toBe(2);
    expect(objects.byKey(obj, 'c')).toBe(3);
  });

  it('#06.02 should return undefined for non-existent key', () => {
    const obj = { a: 1, b: 2 };
    expect(objects.byKey(obj, 'c' as any)).toBeUndefined();
  });

  it('#06.03 should work with nested objects', () => {
    const obj = { nested: { value: 'test' }, simple: 'value' };
    expect(objects.byKey(obj, 'nested')).toEqual({ value: 'test' });
    expect(objects.byKey(obj, 'simple')).toBe('value');
  });
});

// Test 7: Object hasKeys operations
describe('#07 objects.hasKeys', () => {
  it('#07.01 should return true when all keys exist', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(objects.hasKeys(obj, 'a', 'b')).toBe(true);
    expect(objects.hasKeys(obj, 'a', 'b', 'c')).toBe(true);
  });

  it('#07.02 should return false when some keys do not exist', () => {
    const obj = { a: 1, b: 2 };
    expect(objects.hasKeys(obj, 'a', 'c')).toBe(false);
    expect(objects.hasKeys(obj, 'd')).toBe(false);
  });

  it('#07.03 should return true for single existing key', () => {
    const obj = { a: 1 };
    expect(objects.hasKeys(obj, 'a')).toBe(true);
  });

  it('#07.04 should handle empty object', () => {
    expect(objects.hasKeys({}, 'a')).toBe(false);
  });
});

// Test 8: Object hasAllKeys operations
describe('#08 objects.hasAllKeys', () => {
  it('#08.01 should return true when all object keys are provided', () => {
    const obj = { a: 1, b: 2 };
    expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(true);
  });

  it('#08.02 should return false when not all object keys are provided', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(false);
  });

  it('#08.03 should return true for empty object with no keys', () => {
    expect(objects.hasAllKeys({} as any)).toBe(true);
  });

  it('#08.04 should return false when extra keys are provided', () => {
    const obj = { a: 1 };
    expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(false);
  });
});

// Test 9: Object omit operations
describe('#09 objects.omit', () => {
  it('#09.01 should omit specified keys', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = objects.omit(obj, 'b', 'd');
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('#09.02 should return same object when no keys to omit', () => {
    const obj = { a: 1, b: 2 };
    const result = objects.omit(obj);
    expect(result).toEqual(obj);
  });

  it('#09.03 should handle non-existent keys', () => {
    const obj = { a: 1, b: 2 };
    const result = objects.omit(obj, 'c' as any);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('#09.04 should work with nested objects', () => {
    const obj = { nested: { value: 'test' }, simple: 'value' };
    const result = objects.omit(obj, 'simple');
    expect(result).toEqual({ nested: { value: 'test' } });
  });
});

// Test 10: Object omit.strict operations
describe('#10 objects.omit.strict', () => {
  it('#10.01 should omit specified keys strictly', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = objects.omit.strict(obj, 'b');
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('#10.02 should not modify original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const original = { ...obj };
    objects.omit.strict(obj, 'b');
    expect(obj).toEqual(original);
  });

  it('#10.03 should handle multiple keys', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = objects.omit.strict(obj, 'a', 'c');
    expect(result).toEqual({ b: 2, d: 4 });
  });
});

// Test 11: Object omit.by operations
describe('#11 objects.omit.by', () => {
  it('#11.01 should omit by values', () => {
    const obj = { a: 1, b: 2, c: 1, d: 3 };
    const result = objects.omit.by(obj, 1);
    expect(result).toEqual({ b: 2, d: 3 });
  });

  it('#11.02 should handle multiple values', () => {
    const obj = { a: 1, b: 2, c: 3, d: 2 };
    const result = objects.omit.by(obj, 1, 2);
    expect(result).toEqual({ c: 3 });
  });

  it('#11.03 should handle non-existent values', () => {
    const obj = { a: 1, b: 2 };
    const result = objects.omit.by(obj, 3);
    expect(result).toEqual({ a: 1, b: 2 });
  });
});

// Test 12: Object omit.deep operations
describe('#12 objects.omit.deep', () => {
  it('#12.01 should omit keys deeply', () => {
    const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
    const result = objects.omit.deep(obj, 'b');
    expect(result).toEqual({ a: 1, nested: { c: 3 }, d: 4 });
  });

  it('#12.02 should handle multiple deep keys', () => {
    const obj = { a: 1, nested: { b: 2, c: 3, deep: { b: 4 } } };
    const result = objects.omit.deep(obj, 'b');
    expect(result).toEqual({ a: 1, nested: { c: 3, deep: {} } });
  });

  it('#12.03 should work with top-level keys', () => {
    const obj = { a: 1, b: 2, nested: { c: 3 } };
    const result = objects.omit.deep(obj, 'a');
    expect(result).toEqual({ b: 2, nested: { c: 3 } });
  });
});

// Test 12bis: Object omit.is operations
describe('#12bis objects.omit.is', () => {
  it('#12bis.01 should return true when keys are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = objects.omit.is(obj, 'b', 'd');
    expect(result).toBe(false); // contains key 'b'
  });

  it('#12bis.02 should return true when object does not contain keys', () => {
    const obj = { a: 1, c: 3 };
    const result = objects.omit.is(obj, 'b', 'd');
    expect(result).toBe(true); // does not contain keys 'b' or 'd'
  });

  it('#12bis.03 should return true for empty object', () => {
    const obj = {};
    const result = objects.omit.is(obj, 'a', 'b');
    expect(result).toBe(true);
  });

  it('#12bis.04 should handle non-existent keys', () => {
    const obj = { a: 1, b: 2 };
    const result = objects.omit.is(obj, 'x', 'y');
    expect(result).toBe(true);
  });
});

// Test 12ter: Object omit.by.is operations
describe('#12ter objects.omit.by.is', () => {
  it('#12ter.01 should return false when values are present', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = objects.omit.by.is(obj, 2);
    expect(result).toBe(false); // contains value 2
  });

  it('#12ter.02 should return true when values are not present', () => {
    const obj = { a: 1, c: 3 };
    const result = objects.omit.by.is(obj, 2, 4);
    expect(result).toBe(true); // does not contain values 2 or 4
  });

  it('#12ter.03 should handle multiple values', () => {
    const obj = { a: 'hello', b: 'world', c: 'test' };
    const result = objects.omit.by.is(obj, 'world', 'foo');
    expect(result).toBe(false); // contains value 'world'
  });

  it('#12ter.04 should return true for empty object', () => {
    const obj = {};
    const result = objects.omit.by.is(obj, 1, 2);
    expect(result).toBe(true);
  });
});

// Test 12quater: Object omit.deep.is operations
describe('#12quater objects.omit.deep.is', () => {
  it('#12quater.01 should return false when deep keys are present', () => {
    const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
    const result = objects.omit.deep.is(obj, 'b');
    expect(result).toBe(false); // contains deep key 'b'
  });

  it('#12quater.02 should return true when deep keys are not present', () => {
    const obj = { a: 1, nested: { c: 3 }, d: 4 };
    const result = objects.omit.deep.is(obj, 'b');
    expect(result).toBe(true); // does not contain deep key 'b'
  });

  it('#12quater.03 should handle top-level keys', () => {
    const obj = { a: 1, nested: { c: 3 } };
    const result = objects.omit.deep.is(obj, 'a');
    expect(result).toBe(false); // contains top-level key 'a'
  });

  it('#12quater.04 should handle complex nested structures', () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            value: 'test',
            target: 'found',
          },
        },
      },
    };
    const result = objects.omit.deep.is(obj, 'target');
    expect(result).toBe(false); // contains deep key 'target'
  });

  it('#12quater.05 should return true for empty object', () => {
    const obj = {};
    const result = objects.omit.deep.is(obj, 'a');
    expect(result).toBe(true);
  });
});

// Test 12quinquies: Object omit.deep.by operations
describe('#12quinquies objects.omit.deep.by', () => {
  it('#12quinquies.01 should omit by values deeply', () => {
    const obj = { a: 1, nested: { b: 2, c: 2 }, d: 3 };
    const result = objects.omit.deep.by(obj, 2);
    expect(result).toEqual({ a: 1, nested: {}, d: 3 });
  });

  it('#12quinquies.02 should handle multiple values', () => {
    const obj = {
      a: 'hello',
      nested: { b: 'world', c: 'test' },
      d: 'hello',
    };
    const result = objects.omit.deep.by(obj, 'hello', 'world');
    expect(result).toEqual({ nested: { c: 'test' } });
  });

  it('#12quinquies.03 should work with nested objects', () => {
    const obj = {
      level1: {
        level2: {
          value: 'omit',
          keep: 'keep',
        },
        also: 'omit',
      },
      top: 'omit',
    };
    const result = objects.omit.deep.by(obj, 'omit');
    expect(result).toEqual({
      level1: {
        level2: {
          keep: 'keep',
        },
      },
    });
  });

  it('#12quinquies.04 should handle empty object', () => {
    const obj = {};
    const result = objects.omit.deep.by(obj, 'any');
    expect(result).toEqual({});
  });

  it('#12quinquies.05 should handle non-existent values', () => {
    const obj = { a: 1, nested: { b: 2 } };
    const result = objects.omit.deep.by(obj, 'nonexistent');
    expect(result).toEqual({ a: 1, nested: { b: 2 } });
  });
});

// Test 12sexies: Object omit.deep.by.is operations
describe('#12sexies objects.omit.deep.by.is', () => {
  it('#12sexies.01 should return false when deep values are present', () => {
    const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
    const result = objects.omit.deep.by.is(obj, 2);
    expect(result).toBe(false); // contains deep value 2
  });

  it('#12sexies.02 should return true when deep values are not present', () => {
    const obj = { a: 1, nested: { c: 3 }, d: 4 };
    // const result = objects.omit.deep.by.is(obj, 2);
    expect(objects.readonly.is(obj)).toBe(false);

    const readonly = objects.readonly(obj);
    expect(objects.readonly.is(readonly)).toBe(true);
  });

  it('#18bis.05.03 should work with nested objects', () => {
    const obj = { nested: { value: 'test' } };
    expect(objects.readonly.is(obj)).toBe(false);

    const readonly = objects.readonly(obj);
    expect(objects.readonly.is(readonly)).toBe(true);
  });
});

describe('#18bis.06 objects.readonly.const', () => {
  it('#18bis.06.01 should make const object readonly', () => {
    const obj = { a: 1, b: 2 } as const;
    const result = objects.readonly.const(obj);
    expect(result).toEqual(obj);
    expect(Object.isFrozen(result)).toBe(true);
    expect(result).toBe(obj);
  });

  it('#18bis.06.02 should work with const nested objects', () => {
    const obj = { nested: { value: 'test' } } as const;
    const result = objects.readonly.const(obj);
    expect(result).toEqual(obj);
    expect(Object.isFrozen(result)).toBe(true);
  });
});

describe('#18bis.07 objects.readonly.not', () => {
  it('#18bis.07.01 should return object without readonly type', () => {
    const obj = { a: 1, b: 2 };
    const result = objects.readonly.not(obj);
    expect(result).toEqual(obj);
    expect(result).toBe(obj);
  });

  it('#18bis.07.02 should work with any object type', () => {
    const obj = { complex: { nested: 'value' } };
    const result = objects.readonly.not(obj);
    expect(result).toEqual(obj);
  });
});

describe('#18bis.08 objects.readonly.deep', () => {});

// Test 26: Object casting operations
describe('#26 objects.forceCast', () => {
  it('#26.01 should force cast any value to object type', () => {
    const value = 'not an object';
    const result = objects.forceCast(value);
    expect(result).toBe(value);
    // TypeScript should treat result as object type
  });

  it('#26.02 should work with numbers', () => {
    const value = 42;
    const result = objects.forceCast(value);
    expect(result).toBe(value);
  });

  it('#26.03 should work with null', () => {
    const value = null;
    const result = objects.forceCast(value);
    expect(result).toBe(value);
  });

  it('#26.04 should work with arrays', () => {
    const value = [1, 2, 3];
    const result = objects.forceCast(value);
    expect(result).toBe(value);
  });

  it('#26.05 should work with actual objects', () => {
    const value = { a: 1, b: 2 };
    const result = objects.forceCast(value);
    expect(result).toBe(value);
  });
});

// Test 27: Object dynamic casting operations
describe('#27 objects.dynamic', () => {
  it('#27.01 should return object as-is for plain objects', () => {
    const obj = { a: 1, b: 2 };
    const result = objects.dynamic(obj);
    expect(result).toBe(obj);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('#27.02 should preserve specific object types', () => {
    const obj = { name: 'test', value: 42 };
    const result = objects.dynamic(obj);
    expect(result).toBe(obj);
    expect(result.name).toBe('test');
    expect(result.value).toBe(42);
  });

  it('#27.03 should work with nested objects', () => {
    const obj = { nested: { deep: 'value' } };
    const result = objects.dynamic(obj);
    expect(result).toBe(obj);
    expect(result.nested.deep).toBe('value');
  });

  it('#27.04 should work with empty objects', () => {
    const obj = {};
    const result = objects.dynamic(obj);
    expect(result).toBe(obj);
  });
});

// Test 28: Objects.ru (Record<string, unknown>) operations
describe('#28 objects.ru', () => {
  it('#28.01 should cast value to Record<string, unknown>', () => {
    const obj = { a: 1, b: 'test', c: true };
    const result = objects.ru(obj);
    expect(result).toBe(obj);
    expect(result).toEqual({ a: 1, b: 'test', c: true });
  });

  it('#28.02 should work with any object', () => {
    const obj = { key: 'value', number: 42 };
    const result = objects.ru(obj);
    expect(result).toBe(obj);
  });

  describe('#28.03 objects.ru.forceCast', () => {
    it('#28.03.01 should force cast any value to Record<string, unknown>', () => {
      const value = 'not an object';
      const result = objects.ru.forceCast(value);
      expect(result).toBe(value);
    });

    it('#28.03.02 should work with numbers', () => {
      const value = 42;
      const result = objects.ru.forceCast(value);
      expect(result).toBe(value);
    });

    it('#28.03.03 should work with arrays', () => {
      const value = [1, 2, 3];
      const result = objects.ru.forceCast(value);
      expect(result).toBe(value);
    });

    it('#28.03.04 should work with null', () => {
      const value = null;
      const result = objects.ru.forceCast(value);
      expect(result).toBe(value);
    });
  });

  describe('#28.04 objects.ru.dynamic', () => {
    it('#28.04.01 should preserve object type', () => {
      const obj = { a: 1, b: 'test' };
      const result = objects.ru.dynamic(obj);
      expect(result).toBe(obj);
      expect(result).toEqual({ a: 1, b: 'test' });
    });

    it('#28.04.02 should work with complex objects', () => {
      const obj = { nested: { value: 'test' }, array: [1, 2, 3] };
      const result = objects.ru.dynamic(obj);
      expect(result).toBe(obj);
    });
  });
});

// Test 29: Objects.ra (Record<string, any>) operations
describe('#29 objects.ra', () => {
  it('#29.01 should cast value to Record<string, any>', () => {
    const obj = { a: 1, b: 'test', c: true };
    const result = objects.ra(obj);
    expect(result).toBe(obj);
    expect(result).toEqual({ a: 1, b: 'test', c: true });
  });

  it('#29.02 should work with any object', () => {
    const obj = { key: 'value', number: 42 };
    const result = objects.ra(obj);
    expect(result).toBe(obj);
  });

  describe('#29.03 objects.ra.forceCast', () => {
    it('#29.03.01 should force cast any value to Record<string, any>', () => {
      const value = 'not an object';
      const result = objects.ra.forceCast(value);
      expect(result).toBe(value);
    });

    it('#29.03.02 should work with numbers', () => {
      const value = 42;
      const result = objects.ra.forceCast(value);
      expect(result).toBe(value);
    });

    it('#29.03.03 should work with arrays', () => {
      const value = [1, 2, 3];
      const result = objects.ra.forceCast(value);
      expect(result).toBe(value);
    });

    it('#29.03.04 should work with functions', () => {
      const value = () => 'test';
      const result = objects.ra.forceCast(value);
      expect(result).toBe(value);
    });

    it('#29.03.05 should work with null', () => {
      const value = null;
      const result = objects.ra.forceCast(value);
      expect(result).toBe(value);
    });
  });

  describe('#29.04 objects.ra.dynamic', () => {
    it('#29.04.01 should preserve object type', () => {
      const obj = { a: 1, b: 'test' };
      const result = objects.ra.dynamic(obj);
      expect(result).toBe(obj);
      expect(result).toEqual({ a: 1, b: 'test' });
    });

    it('#29.04.02 should work with complex objects', () => {
      const obj = { nested: { value: 'test' }, array: [1, 2, 3] };
      const result = objects.ra.dynamic(obj);
      expect(result).toBe(obj);
    });

    it('#29.04.03 should work with objects containing any types', () => {
      const obj = {
        string: 'test',
        number: 42,
        func: () => 'hello',
        date: new Date(),
        regex: /test/,
      };
      const result = objects.ra.dynamic(obj);
      expect(result).toBe(obj);
    });
  });
});
