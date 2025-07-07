import { objects } from './objects';

describe('objects', () => {
  describe('#00 => main', () => {
    describe('#01 => Acceptation', () => {
      it('#01.01 => should be defined', () => {
        expect(objects).toBeDefined();
      });

      it('#01.02 => should be an object', () => {
        expect(typeof objects).toBe('function');
      });

      it('#01.03 => should have sub fucntions', () => {
        expect(Object.keys(objects).length).toBeGreaterThan(0);
      });
    });

    describe('#02 => Usage of func "objects("', () => {
      describe('#02.01 => working with empty objects', () => {
        let obj: any;

        beforeEach(() => {
          obj = objects({});
        });
        it('#02.01.01 => should return an empty object', () => {
          expect(obj).toEqual({});
        });

        it('#02.01.02 => should have no keys', () => {
          expect(Object.keys(obj).length).toBe(0);
        });
      });

      it('#02.02 => should work with simple objects', () => {
        const _obj = { a: 1, b: 'test' };
        const obj = objects(_obj);
        expect(obj).toEqual(_obj);
        expect(Object.keys(obj).length).toBe(2);
      });
    });
  });

  describe('#01 => objects.forceCast', () => {
    it('#01.01 => should force cast any value to object type', () => {
      const value = 'not an object';
      const result = objects.forceCast(value);
      expect(result).toBe(value);
      // TypeScript should treat result as object type
    });

    it('#01.02 => should work with numbers', () => {
      const value = 42;
      const result = objects.forceCast(value);
      expect(result).toBe(value);
    });

    it('#01.03 => should work with null', () => {
      const value = null;
      const result = objects.forceCast(value);
      expect(result).toBe(value);
    });

    it('#01.04 => should work with arrays', () => {
      const value = [1, 2, 3];
      const result = objects.forceCast(value);
      expect(result).toBe(value);
    });

    it('#01.05 => should work with actual objects', () => {
      const value = { a: 1, b: 2 };
      const result = objects.forceCast(value);
      expect(result).toBe(value);
    });
  });

  describe('#02 => objects.dynamic', () => {
    it('#02.01 => should return object as-is for plain objects', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.dynamic(obj);
      expect(result).toBe(obj);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('#02.02 => should preserve specific object types', () => {
      const obj = { name: 'test', value: 42 };
      const result = objects.dynamic(obj);
      expect(result).toBe(obj);
      expect(result.name).toBe('test');
      expect(result.value).toBe(42);
    });

    it('#02.03 => should work with nested objects', () => {
      const obj = { nested: { deep: 'value' } };
      const result = objects.dynamic(obj);
      expect(result).toBe(obj);
      expect(result.nested.deep).toBe('value');
    });

    it('#02.04 => should work with empty objects', () => {
      const obj = {};
      const result = objects.dynamic(obj);
      expect(result).toBe(obj);
    });
  });

  describe('#03 => objects.type', () => {
    it('#03.01 => should return Object constructor', () => {
      expect(objects.type).toBe(Object);
    });

    it('#03.02 => should be the same as global Object', () => {
      expect(objects.type).toEqual(Object);
    });

    it('#03.03 => should be able to create objects', () => {
      const obj = new objects.type();
      expect(obj).toEqual({});
      expect(typeof obj).toBe('object');
    });

    it('#03.04 => should work with Object methods', () => {
      const obj = { a: 1, b: 2 };
      expect(objects.type.keys(obj)).toEqual(['a', 'b']);
      expect(objects.type.values(obj)).toEqual([1, 2]);
    });
  });

  describe('#04 => objects.trueObject', () => {
    describe('#04.00 => main', () => {
      it('#04.00.01 => should cast value to TrueObject', () => {
        const obj = { a: 1, b: 'test' };
        const result = objects.trueObject(obj);
        expect(result).toBe(obj);
        expect(result).toEqual({ a: 1, b: 'test' });
      });

      it('#04.00.02 => should work with plain objects', () => {
        const obj = { key: 'value', number: 42 };
        const result = objects.trueObject(obj);
        expect(result).toBe(obj);
      });

      it('#04.00.03 => should work with empty objects', () => {
        const obj = {};
        const result = objects.trueObject(obj);
        expect(result).toBe(obj);
      });
    });

    describe('#04.01 => objects.trueObject.forceCast', () => {
      it('#04.01.01 => should force cast any value to TrueObject', () => {
        const value = 'not an object';
        const result = objects.trueObject.forceCast(value);
        expect(result).toBe(value);
      });

      it('#04.01.02 => should work with numbers', () => {
        const value = 42;
        const result = objects.trueObject.forceCast(value);
        expect(result).toBe(value);
      });

      it('#04.01.03 => should work with arrays', () => {
        const value = [1, 2, 3];
        const result = objects.trueObject.forceCast(value);
        expect(result).toBe(value);
      });

      it('#04.01.04 => should work with null', () => {
        const value = null;
        const result = objects.trueObject.forceCast(value);
        expect(result).toBe(value);
      });

      it('#04.01.05 => should work with functions', () => {
        const value = () => 'test';
        const result = objects.trueObject.forceCast(value);
        expect(result).toBe(value);
      });
    });

    describe('#04.02 => objects.trueObject.dynamic', () => {
      it('#04.02.01 => should preserve object type', () => {
        const obj = { a: 1, b: 'test' };
        const result = objects.trueObject.dynamic(obj);
        expect(result).toBe(obj);
        expect(result).toEqual({ a: 1, b: 'test' });
      });

      it('#04.02.02 => should work with complex objects', () => {
        const obj = { nested: { value: 'test' }, array: [1, 2, 3] };
        const result = objects.trueObject.dynamic(obj);
        expect(result).toBe(obj);
      });

      it('#04.02.03 => should work with empty objects', () => {
        const obj = {};
        const result = objects.trueObject.dynamic(obj);
        expect(result).toBe(obj);
      });
    });

    describe('#04.03 => objects.trueObject.is', () => {
      it('#04.03.01 => should return true for plain objects', () => {
        expect(objects.trueObject.is({})).toBe(true);
        expect(objects.trueObject.is({ a: 1, b: 2 })).toBe(true);
        expect(objects.trueObject.is({ nested: { value: 'test' } })).toBe(
          true,
        );
      });

      it('#04.03.02 => should return false for arrays', () => {
        expect(objects.trueObject.is([])).toBe(false);
        expect(objects.trueObject.is([1, 2, 3])).toBe(false);
      });

      it('#04.03.03 => should return false for functions', () => {
        expect(objects.trueObject.is(() => {})).toBe(false);
        expect(objects.trueObject.is(function () {})).toBe(false);
      });

      it('#04.03.04 => should return false for primitive values', () => {
        expect(objects.trueObject.is('string')).toBe(false);
        expect(objects.trueObject.is(42)).toBe(false);
        expect(objects.trueObject.is(true)).toBe(false);
        expect(objects.trueObject.is(null)).toBe(false);
        expect(objects.trueObject.is(undefined)).toBe(false);
      });

      it('#04.03.05 => should return false for Date objects', () => {
        expect(objects.trueObject.is(new Date())).toBe(false);
      });

      it('#04.03.06 => should return false for RegExp objects', () => {
        expect(objects.trueObject.is(/test/)).toBe(false);
      });

      it('#04.03.07 => should return false for class instances', () => {
        class TestClass {
          constructor(public value: string) {}
        }
        expect(objects.trueObject.is(new TestClass('test'))).toBe(false);
      });

      it('#04.03.08 => should return false for Map and Set', () => {
        expect(objects.trueObject.is(new Map())).toBe(false);
        expect(objects.trueObject.is(new Set())).toBe(false);
      });

      it('#04.03.09 => should return false for Error objects', () => {
        expect(objects.trueObject.is(new Error('test'))).toBe(false);
      });

      it('#04.03.10 => should return true for Object.create(null)', () => {
        expect(objects.trueObject.is(Object.create(null))).toBe(undefined);
      });

      it('#04.03.11 => should return true for objects with custom prototypes', () => {
        const proto = { customProp: 'value' };
        const obj = Object.create(proto);
        obj.ownProp = 'test';
        expect(objects.trueObject.is(obj)).toBe(true);
      });

      it('#04.03.12 => should return true for objects created with Object()', () => {
        expect(objects.trueObject.is(new Object())).toBe(true);
        expect(objects.trueObject.is(Object())).toBe(true);
      });

      it('#04.03.13 => should return true for object literals', () => {
        expect(objects.trueObject.is({ literal: 'object' })).toBe(true);
      });

      it('#04.03.14 => should handle objects with symbol properties', () => {
        const sym = Symbol('test');
        const obj = { [sym]: 'value', normal: 'prop' };
        expect(objects.trueObject.is(obj)).toBe(true);
      });
    });
  });

  describe('#05 => objects.keysOf', () => {
    it('#03.01 => should return keys of object (same as keys)', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.keysOf(obj)).toEqual(['a', 'b', 'c']);
    });

    it('#03.02 => should return empty array for empty object', () => {
      expect(objects.keysOf({})).toEqual([]);
    });

    it('#03.01 => should return keys of object (same as keys)', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.keysOf(obj)).toEqual(['a', 'b', 'c']);
    });

    it('#03.02 => should return empty array for empty object', () => {
      expect(objects.keysOf({})).toEqual([]);
    });
  });

  describe('#06 => objects.values', () => {
    it('#04.01 => should return values of object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.values(obj)).toEqual([1, 2, 3]);
    });

    it('#04.02 => should return empty array for empty object', () => {
      expect(objects.values({})).toEqual([]);
    });

    it('#04.03 => should work with mixed value types', () => {
      const obj = {
        string: 'test',
        number: 42,
        boolean: true,
        null: null,
      };
      expect(objects.values(obj)).toEqual(['test', 42, true, null]);
    });

    it('#04.01 => should return values of object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.values(obj)).toEqual([1, 2, 3]);
    });

    it('#04.02 => should return empty array for empty object', () => {
      expect(objects.values({})).toEqual([]);
    });

    it('#04.03 => should work with mixed value types', () => {
      const obj = {
        string: 'test',
        number: 42,
        boolean: true,
        null: null,
      };
      expect(objects.values(obj)).toEqual(['test', 42, true, null]);
    });
  });

  describe('#07 => objects.entries', () => {
    it('#07.01 => should return entries of object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.entries(obj)).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('#05.02 => should return empty array for empty object', () => {
      expect(objects.entries({})).toEqual([]);
    });

    it('#05.03 => should work with mixed value types', () => {
      const obj = { string: 'test', number: 42 };
      expect(objects.entries(obj)).toEqual([
        ['string', 'test'],
        ['number', 42],
      ]);
    });

    it('#05.01 => should return entries of object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.entries(obj)).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('#07.02 => should return empty array for empty object', () => {
      expect(objects.entries({})).toEqual([]);
    });

    it('#07.03 => should work with mixed value types', () => {
      const obj = { string: 'test', number: 42 };
      expect(objects.entries(obj)).toEqual([
        ['string', 'test'],
        ['number', 42],
      ]);
    });
  });

  describe('#08 => objects.byKey', () => {
    it('#08.01 => should return value by key', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.byKey(obj, 'a')).toBe(1);
      expect(objects.byKey(obj, 'b')).toBe(2);
      expect(objects.byKey(obj, 'c')).toBe(3);
    });

    it('#06.02 => should return undefined for non-existent key', () => {
      const obj = { a: 1, b: 2 };
      expect(objects.byKey(obj, 'c' as any)).toBeUndefined();
    });

    it('#06.03 => should work with nested objects', () => {
      const obj = { nested: { value: 'test' }, simple: 'value' };
      expect(objects.byKey(obj, 'nested')).toEqual({ value: 'test' });
      expect(objects.byKey(obj, 'simple')).toBe('value');
    });

    it('#06.01 => should return value by key', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.byKey(obj, 'a')).toBe(1);
      expect(objects.byKey(obj, 'b')).toBe(2);
      expect(objects.byKey(obj, 'c')).toBe(3);
    });

    it('#06.02 => should return undefined for non-existent key', () => {
      const obj = { a: 1, b: 2 };
      expect(objects.byKey(obj, 'c' as any)).toBeUndefined();
    });

    it('#06.03 => should work with nested objects', () => {
      const obj = { nested: { value: 'test' }, simple: 'value' };
      expect(objects.byKey(obj, 'nested')).toEqual({ value: 'test' });
      expect(objects.byKey(obj, 'simple')).toBe('value');
    });
  });

  describe('#09 => objects.hasKeys', () => {
    it('#07.01 => should return true when all keys exist', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.hasKeys(obj, 'a', 'b')).toBe(true);
      expect(objects.hasKeys(obj, 'a', 'b', 'c')).toBe(true);
    });

    it('#07.02 => should return false when some keys do not exist', () => {
      const obj = { a: 1, b: 2 };
      expect(objects.hasKeys(obj, 'a', 'c')).toBe(false);
      expect(objects.hasKeys(obj, 'd')).toBe(false);
    });

    it('#07.03 => should return true for single existing key', () => {
      const obj = { a: 1 };
      expect(objects.hasKeys(obj, 'a')).toBe(true);
    });

    it('#07.04 => should handle empty object', () => {
      expect(objects.hasKeys({}, 'a')).toBe(false);
    });

    describe('#07.05 => objects.hasKeys.strict', () => {
      it('#07.05.01 => should create strict type guard for object keys', () => {
        interface TestObject {
          a: number;
          b: string;
          c?: boolean;
        }

        const validator = objects.hasKeys.strict<TestObject>();

        // Should return true for objects that have exactly the specified keys
        expect(validator({ a: 1, b: 'test' }, 'a', 'b')).toBe(true);
        expect(
          validator({ a: 1, b: 'test', c: true }, 'a', 'b', 'c'),
        ).toBe(true);
      });

      it('#07.05.02 => should return false when object has extra keys', () => {
        interface TestObject {
          a: number;
          b: string;
        }

        const validator = objects.hasKeys.strict<TestObject>();

        // Should return true for objects with extra keys
        expect(
          validator({ a: 1, b: 'test', extra: 'value' }, 'a', 'b'),
        ).toBe(true);
      });

      it('#07.05.03 => should return false when object is missing required keys', () => {
        interface TestObject {
          a: number;
          b: string;
          c: boolean;
        }

        const validator = objects.hasKeys.strict<TestObject>();

        // Should return false when missing keys
        expect(validator({ a: 1 }, 'a', 'b', 'c')).toBe(false);
        expect(validator({ a: 1, b: 'test' }, 'a', 'b', 'c')).toBe(false);
      });

      it('#07.05.04 => should handle empty object validation', () => {
        type EmptyObject = object;

        const validator = objects.hasKeys.strict<EmptyObject>();

        // Empty object should pass validation with no keys
        expect(validator({})).toBe(true);
        // Object with keys should pass validation
        expect(validator({ a: 1 })).toBe(true);
      });

      it('#07.05.05 => should work with complex object types', () => {
        interface ComplexObject {
          id: number;
          name: string;
          metadata?: {
            tags: string[];
            created: Date;
          };
        }

        const validator = objects.hasKeys.strict<ComplexObject>();

        const validObj = {
          id: 1,
          name: 'test',
          metadata: {
            tags: ['tag1', 'tag2'],
            created: new Date(),
          },
        };

        expect(validator(validObj, 'id', 'name', 'metadata')).toBe(true);
        expect(validator({ id: 1, name: 'test' }, 'id', 'name')).toBe(
          true,
        );
      });

      it('#07.05.06 should validate objects with optional properties', () => {
        interface ObjectWithOptional {
          required: string;
          optional?: number;
        }

        const validator = objects.hasKeys.strict<ObjectWithOptional>();

        // Should work with just required properties
        expect(validator({ required: 'test' }, 'required')).toBe(true);
        // Should work with both required and optional
        expect(
          validator(
            { required: 'test', optional: 42 },
            'required',
            'optional',
          ),
        ).toBe(true);
        // Should pass with extra properties
        expect(
          validator({ required: 'test', extra: 'value' }, 'required'),
        ).toBe(true);
      });

      it('#07.05.07 should handle nested object validation', () => {
        interface NestedObject {
          outer: {
            inner: string;
          };
          simple: number;
        }

        const validator = objects.hasKeys.strict<NestedObject>();

        const nestedObj = {
          outer: { inner: 'value' },
          simple: 42,
        };

        expect(validator(nestedObj, 'outer', 'simple')).toBe(true);
        expect(validator({ outer: { inner: 'value' } }, 'outer')).toBe(
          true,
        );
      });

      it('#07.05.08 should validate arrays as object values', () => {
        interface ObjectWithArray {
          items: string[];
          count: number;
        }

        const validator = objects.hasKeys.strict<ObjectWithArray>();

        const objWithArray = {
          items: ['a', 'b', 'c'],
          count: 3,
        };

        expect(validator(objWithArray, 'items', 'count')).toBe(true);
        expect(validator({ items: [] }, 'items')).toBe(true);
      });
    });

    describe('#07.06 => objects.hasKeys.const', () => {
      it('#07.06.01 => should create const type guard for object keys', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const testObj = { a: 1, b: 'test', c: true } as const;
        type TestObject = typeof testObj;

        const validator = objects.hasKeys.const<TestObject>();

        // Should return true for objects that have exactly the specified keys
        expect(validator({ a: 1, b: 'test' }, 'a', 'b')).toBe(true);
        expect(
          validator({ a: 1, b: 'test', c: true }, 'a', 'b', 'c'),
        ).toBe(true);
      });

      it('#07.06.02 => should work with const assertions', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const constObj = { readonly: 'value', fixed: 42 } as const;
        type ConstObject = typeof constObj;

        const validator = objects.hasKeys.const<ConstObject>();

        expect(
          validator({ readonly: 'value', fixed: 42 }, 'readonly', 'fixed'),
        ).toBe(true);
        expect(validator({ readonly: 'value' }, 'readonly')).toBe(true);
      });

      it('#07.06.03 => should handle const objects with literal types', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const literalObj = {
          type: 'user' as const,
          status: 'active' as const,
          id: 123,
        };
        type LiteralObject = typeof literalObj;

        const validator = objects.hasKeys.const<LiteralObject>();

        expect(
          validator(
            { type: 'user', status: 'active', id: 123 },
            'type',
            'status',
            'id',
          ),
        ).toBe(true);
        expect(validator({ type: 'user', id: 123 }, 'type', 'id')).toBe(
          true,
        );
      });

      it('#07.06.04 => should validate const tuples as object properties', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const objWithTuple = {
          coordinates: [10, 20] as const,
          name: 'point',
        } as const;
        type ObjectWithTuple = typeof objWithTuple;

        const validator = objects.hasKeys.const<ObjectWithTuple>();

        expect(
          validator(
            { coordinates: [10, 20], name: 'point' },
            'coordinates',
            'name',
          ),
        ).toBe(true);
        expect(validator({ name: 'point' }, 'name')).toBe(true);
      });

      it('#07.06.05 => should work with const nested objects', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const nestedConstObj = {
          config: {
            enabled: true,
            mode: 'production' as const,
          },
          version: '1.0.0',
        } as const;
        type NestedConstObject = typeof nestedConstObj;

        const validator = objects.hasKeys.const<NestedConstObject>();

        expect(
          validator(
            {
              config: { enabled: true, mode: 'production' },
              version: '1.0.0',
            },
            'config',
            'version',
          ),
        ).toBe(true);
        expect(
          validator(
            { config: { enabled: true, mode: 'production' } },
            'config',
          ),
        ).toBe(true);
      });

      it('#07.06.06 => should handle const arrays with specific elements', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const objWithConstArray = {
          tags: ['typescript', 'javascript', 'node'] as const,
          priority: 1,
        } as const;
        type ObjectWithConstArray = typeof objWithConstArray;

        const validator = objects.hasKeys.const<ObjectWithConstArray>();

        expect(
          validator(
            { tags: ['typescript', 'javascript', 'node'], priority: 1 },
            'tags',
            'priority',
          ),
        ).toBe(true);
        expect(validator({ priority: 1 }, 'priority')).toBe(true);
      });

      it('#07.06.07 => should validate const objects with readonly properties', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const readonlyObj = Object.freeze({
          readonly: 'value',
          immutable: 42,
        });
        type ReadonlyObject = typeof readonlyObj;

        const validator = objects.hasKeys.const<ReadonlyObject>();

        expect(
          validator(
            { readonly: 'value', immutable: 42 },
            'readonly',
            'immutable',
          ),
        ).toBe(true);
        expect(validator({ readonly: 'value' }, 'readonly')).toBe(true);
      });

      it('#07.06.08 => should handle const objects with union types', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const unionObj = {
          status: 'active' as 'active' | 'inactive',
          count: 5,
          enabled: true,
        } as const;
        type UnionObject = typeof unionObj;

        const validator = objects.hasKeys.const<UnionObject>();

        expect(
          validator(
            { status: 'active', count: 5, enabled: true },
            'status',
            'count',
            'enabled',
          ),
        ).toBe(true);
        expect(
          validator({ status: 'active', count: 5 }, 'status', 'count'),
        ).toBe(true);
      });
    });
  });

  describe('#10 => objects.hasAllKeys', () => {
    it('#08.01 => should return true when all object keys are provided', () => {
      const obj = { a: 1, b: 2 };
      expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(true);
    });

    it('#08.02 => should return false when not all object keys are provided', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(false);
    });

    it('#08.03 => should return true for empty object with no keys', () => {
      expect(objects.hasAllKeys({} as any)).toBe(true);
    });

    it('#08.04 => should return false when extra keys are provided', () => {
      const obj = { a: 1 };
      expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(false);
    });

    it('#08.01 => should return true when all object keys are provided', () => {
      const obj = { a: 1, b: 2 };
      expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(true);
    });

    it('#08.02 => should return false when not all object keys are provided', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(false);
    });

    it('#08.03 => should return true for empty object with no keys', () => {
      expect(objects.hasAllKeys({} as any)).toBe(true);
    });

    it('#08.04 => should return false when extra keys are provided', () => {
      const obj = { a: 1 };
      expect(objects.hasAllKeys(obj, 'a', 'b')).toBe(false);
    });
  });

  describe('#11 => objects.omit', () => {
    it('#09.01 => should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const result = objects.omit(obj, 'b', 'd');
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('#09.02 => should return same object when no keys to omit', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.omit(obj);
      expect(result).toEqual(obj);
    });

    it('#09.03 => should handle non-existent keys', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.omit(obj, 'c' as any);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('#09.04 => should work with nested objects', () => {
      const obj = { nested: { value: 'test' }, simple: 'value' };
      const result = objects.omit(obj, 'simple');
      expect(result).toEqual({ nested: { value: 'test' } });
    });

    it('#09.01 => should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const result = objects.omit(obj, 'b', 'd');
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('#09.02 => should return same object when no keys to omit', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.omit(obj);
      expect(result).toEqual(obj);
    });

    it('#09.03 => should handle non-existent keys', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.omit(obj, 'c' as any);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('#09.04 => should work with nested objects', () => {
      const obj = { nested: { value: 'test' }, simple: 'value' };
      const result = objects.omit(obj, 'simple');
      expect(result).toEqual({ nested: { value: 'test' } });
    });

    describe('#09.05 => objects.omit.strict', () => {
      it('#09.05.01 => should omit specified keys strictly', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = objects.omit.strict(obj, 'b');
        expect(result).toEqual({ a: 1, c: 3 });
      });

      it('#09.05.02 => should not modify original object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const original = { ...obj };
        objects.omit.strict(obj, 'b');
        expect(obj).toEqual(original);
      });

      it('#09.05.03 => should handle multiple keys', () => {
        const obj = { a: 1, b: 2, c: 3, d: 4 };
        const result = objects.omit.strict(obj, 'a', 'c');
        expect(result).toEqual({ b: 2, d: 4 });
      });
    });

    describe('#09.07 => objects.omit.is', () => {
      it('#09.07.01 => should return true when keys are omitted', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = objects.omit.is(obj, 'b', 'd');
        expect(result).toBe(false); // contains key 'b'
      });

      it('#09.06.02 => should return true when object does not contain keys', () => {
        const obj = { a: 1, c: 3 };
        const result = objects.omit.is(obj, 'b', 'd');
        expect(result).toBe(true); // does not contain keys 'b' or 'd'
      });

      it('#09.06.03 => should return true for empty object', () => {
        const obj = {};
        const result = objects.omit.is(obj, 'a', 'b');
        expect(result).toBe(true);
      });

      it('#09.06.04 => should handle non-existent keys', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.omit.is(obj, 'x', 'y');
        expect(result).toBe(true);
      });
    });

    describe('#09.07 => objects.omit.by', () => {
      it('#09.07.01 => should omit by values', () => {
        const obj = { a: 1, b: 2, c: 1, d: 3 };
        const result = objects.omit.by(obj, 1);
        expect(result).toEqual({ b: 2, d: 3 });
      });

      it('#09.07.02 => should handle multiple values', () => {
        const obj = { a: 1, b: 2, c: 3, d: 2 };
        const result = objects.omit.by(obj, 1, 2);
        expect(result).toEqual({ c: 3 });
      });

      it('#09.07.03 => should handle non-existent values', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.omit.by(obj, 3);
        expect(result).toEqual({ a: 1, b: 2 });
      });

      describe('#09.07.04 => objects.omit.by.is', () => {
        it('#09.07.04.01 => should return false when values are present', () => {
          const obj = { a: 1, b: 2, c: 3 };
          const result = objects.omit.by.is(obj, 2);
          expect(result).toBe(false); // contains value 2
        });

        it('#09.07.04.02 => should return true when values are not present', () => {
          const obj = { a: 1, c: 3 };
          const result = objects.omit.by.is(obj, 2, 4);
          expect(result).toBe(true); // does not contain values 2 or 4
        });

        it('#09.07.04.03 => should handle multiple values', () => {
          const obj = { a: 'hello', b: 'world', c: 'test' };
          const result = objects.omit.by.is(obj, 'world', 'foo');
          expect(result).toBe(false); // contains value 'world'
        });

        it('#09.07.04.04 => should return true for empty object', () => {
          const obj = {};
          const result = objects.omit.by.is(obj, 1, 2);
          expect(result).toBe(true);
        });
      });

      // Test 12: Object omit.deep operations
      describe('#09.07.05 => objects.omit.deep', () => {
        it('#09.07.05.01 => should omit keys deeply', () => {
          const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
          const result = objects.omit.deep(obj, 'b');
          expect(result).toEqual({ a: 1, nested: { c: 3 }, d: 4 });
        });

        it('#09.07.05.02 => should handle multiple deep keys', () => {
          const obj = { a: 1, nested: { b: 2, c: 3, deep: { b: 4 } } };
          const result = objects.omit.deep(obj, 'b');
          expect(result).toEqual({ a: 1, nested: { c: 3, deep: {} } });
        });

        it('#09.07.05.03 => should work with top-level keys', () => {
          const obj = { a: 1, b: 2, nested: { c: 3 } };
          const result = objects.omit.deep(obj, 'a');
          expect(result).toEqual({ b: 2, nested: { c: 3 } });
        });

        describe('#09.07.05.04 => objects.omit.deep.by', () => {
          it('#09.07.05.04.01 => should omit by values deeply', () => {
            const obj = { a: 1, nested: { b: 2, c: 2 }, d: 3 };
            const result = objects.omit.deep.by(obj, 2);
            expect(result).toEqual({ a: 1, nested: {}, d: 3 });
          });

          it('#09.07.05.04.02 => should handle multiple values', () => {
            const obj = {
              a: 'hello',
              nested: { b: 'world', c: 'test' },
              d: 'hello',
            };
            const result = objects.omit.deep.by(obj, 'hello', 'world');
            expect(result).toEqual({ nested: { c: 'test' } });
          });

          it('#09.07.05.04.03 => should work with nested objects', () => {
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

          it('#09.07.05.04.04 => should handle empty object', () => {
            const obj = {};
            const result = objects.omit.deep.by(obj, 'any');
            expect(result).toEqual({});
          });

          it('#09.07.05.04.05 => should handle non-existent values', () => {
            const obj = { a: 1, nested: { b: 2 } };
            const result = objects.omit.deep.by(obj, 'nonexistent');
            expect(result).toEqual({ a: 1, nested: { b: 2 } });
          });

          // Test 12sexies: Object omit.deep.by.is operations
          describe('#09.07.05.04.06 => objects.omit.deep.by.is', () => {
            it('#09.07.05.04.06.01 => should return false when deep values are present', () => {
              const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
              const result = objects.omit.deep.by.is(obj, 2);
              expect(result).toBe(false); // contains deep value 2
            });

            it('#09.07.05.04.06.02 => should return true when deep values are not present', () => {
              const obj = { a: 1, nested: { c: 3 }, d: 4 };
              const result = objects.omit.deep.by.is(obj, 2);
              expect(result).toBe(true); // does not contain deep value 2
            });

            it('#09.07.05.04.06.03 => should handle multiple values', () => {
              const obj = {
                a: 'hello',
                nested: { b: 'world', c: 'test' },
              };
              const result = objects.omit.deep.by.is(obj, 'world', 'foo');
              expect(result).toBe(false); // contains deep value 'world'
            });

            it('#09.07.05.04.06.04 => should handle complex nested structures', () => {
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

            it('#09.07.05.04.06.05 => should return true for empty object', () => {
              const obj = {};
              const result = objects.omit.deep.by.is(obj, 'any');
              expect(result).toBe(true);
            });
          });
        });

        describe('#09.07.05.05 => objects.omit.deep.is', () => {
          it('#09.07.05.05.01 => should return false when deep keys are present', () => {
            const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
            const result = objects.omit.deep.is(obj, 'b');
            expect(result).toBe(false); // contains deep key 'b'
          });

          it('#09.07.05.05.02 => should return true when deep keys are not present', () => {
            const obj = { a: 1, nested: { c: 3 }, d: 4 };
            const result = objects.omit.deep.is(obj, 'b');
            expect(result).toBe(true); // does not contain deep key 'b'
          });

          it('#09.07.05.05.03 => should handle top-level keys', () => {
            const obj = { a: 1, nested: { c: 3 } };
            const result = objects.omit.deep.is(obj, 'a');
            expect(result).toBe(false); // contains top-level key 'a'
          });

          it('#09.07.05.05.04 => should handle complex nested structures', () => {
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

          it('#09.07.05.05.05 => should return true for empty object', () => {
            const obj = {};
            const result = objects.omit.deep.is(obj, 'a');
            expect(result).toBe(true);
          });
        });
      });
    });
  });

  describe('#12 => objects.reverse', () => {
    it('#10.01 => should reverse key-value pairs', () => {
      const obj = { a: 'x', b: 'y', c: 'z' };
      const result = objects.reverse(obj);
      expect(result).toEqual({ x: 'a', y: 'b', z: 'c' });
    });

    it('#10.02 => should handle numeric values', () => {
      const obj = { first: '1', second: '2' };
      const result = objects.reverse(obj);
      expect(result).toEqual({ '1': 'first', '2': 'second' });
    });

    it('#10.03 => should handle empty object', () => {
      const result = objects.reverse({});
      expect(result).toEqual({});
    });
  });

  describe('#13 => objects.readonly', () => {
    it('#11.01 => should make object readonly', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.readonly(obj);
      expect(result).toEqual(obj);
      expect(Object.isFrozen(result)).toBe(true);
    });

    it('#11.02 => should return same reference', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.readonly(obj);
      expect(result).toBe(obj);
    });

    it('#11.01 => should make object readonly', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.readonly(obj);
      expect(result).toEqual(obj);
      expect(Object.isFrozen(result)).toBe(true);
      expect(result).toBe(obj);
    });

    it('#11.02 => should return same reference', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.readonly(obj);
      expect(result).toBe(obj);
    });

    describe('#11.03 => objects.readonly.forceCast', () => {
      it('#11.03.01 => should force cast and make readonly', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.readonly.forceCast(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
        expect(result).toBe(obj);
      });

      it('#11.03.02 => should work with any input type', () => {
        const obj = { complex: { nested: 'value' } };
        const result = objects.readonly.forceCast(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
      });
    });

    describe('#11.04 => objects.readonly.dynamic', () => {
      it('#11.04.01 => should dynamically make typed object readonly', () => {
        const obj = { specific: 'value', number: 42 };
        const result = objects.readonly.dynamic(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
        expect(result).toBe(obj);
      });

      it('#11.04.02 => should preserve specific object type', () => {
        const obj = { name: 'test', id: 123 };
        const result = objects.readonly.dynamic(obj);
        expect(result.name).toBe('test');
        expect(result.id).toBe(123);
        expect(Object.isFrozen(result)).toBe(true);
      });
    });

    describe('#11.05 => objects.readonly.is', () => {
      it('#11.05.01 => should return true for frozen objects', () => {
        const obj = { a: 1, b: 2 };
        expect(objects.readonly.is(obj)).toBe(false);

        Object.freeze(obj);
        expect(objects.readonly.is(obj)).toBe(true);
      });

      it('#11.05.02 => should return false for non-frozen objects', () => {
        const obj = { a: 1, b: 2 };
        expect(objects.readonly.is(obj)).toBe(false);

        const readonly = objects.readonly(obj);
        expect(objects.readonly.is(readonly)).toBe(true);
      });

      it('#11.05.03 => should work with nested objects', () => {
        const obj = { nested: { value: 'test' } };
        expect(objects.readonly.is(obj)).toBe(false);

        const readonly = objects.readonly(obj);
        expect(objects.readonly.is(readonly)).toBe(true);
      });
    });

    describe('#11.07 => objects.readonly.not', () => {
      it('#11.07.01 => should return object without readonly type', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.readonly.not(obj);
        expect(result).toEqual(obj);
        expect(result).toBe(obj);
      });

      it('#11.07.02 => should work with any object type', () => {
        const obj = { complex: { nested: 'value' } };
        const result = objects.readonly.not(obj);
        expect(result).toEqual(obj);
      });

      it('#11.07.01 => should return object without readonly type', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.readonly.not(obj);
        expect(result).toEqual(obj);
        expect(result).toBe(obj);
      });

      it('#11.07.02 => should work with any object type', () => {
        const obj = { complex: { nested: 'value' } };
        const result = objects.readonly.not(obj);
        expect(result).toEqual(obj);
      });
    });

    describe('#11.08 => objects.readonly.deep', () => {
      it('#11.08.01 => should deep make object readonly', () => {
        const obj = { a: 1, nested: { b: 2 } };
        const result = objects.readonly.deep(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
        expect(result).toBe(obj);
      });

      it('#11.08.02 => should make nested structures readonly', () => {
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

      describe('#11.08.04 => objects.readonly.deep.not', () => {
        it('#11.08.04.01 => should return object without deep readonly type', () => {
          const obj = { a: 1, nested: { b: 2 } };
          const result = objects.readonly.deep.not(obj);
          expect(result).toEqual(obj);
          expect(result).toBe(obj);
        });

        it('#11.08.04.02 => should preserve object structure', () => {
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

  describe('#14 => objects.freeze', () => {
    it('#12.01 => should freeze object', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.freeze(obj);
      expect(result).toEqual(obj);
      expect(result).toBe(obj);
      expect(Object.isFrozen(result)).toBe(true);
    });

    it('#12.02 => should work with nested objects', () => {
      const obj = { nested: { value: 'test' } };
      const result = objects.freeze(obj);
      expect(result).toEqual(obj);
      expect(Object.isFrozen(result)).toBe(true);
    });

    describe('#12.03 => objects.freeze.forceCast', () => {
      it('#12.03.01 => should force cast and freeze object', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.freeze.forceCast(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
        expect(result).toBe(obj);
      });

      it('#12.03.02 => should work with any input type', () => {
        const obj = { complex: { nested: 'value' } };
        const result = objects.freeze.forceCast(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
      });
    });

    describe('#12.04 => objects.freeze.dynamic', () => {
      it('#12.04.01 => should dynamically freeze typed object', () => {
        const obj = { specific: 'value', number: 42 };
        const result = objects.freeze.dynamic(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
        expect(result).toBe(obj);
      });

      it('#12.04.02 => should preserve specific object type', () => {
        const obj = { name: 'test', id: 123 };
        const result = objects.freeze.dynamic(obj);
        expect(result.name).toBe('test');
        expect(result.id).toBe(123);
        expect(Object.isFrozen(result)).toBe(true);
      });
    });

    describe('#12.05 => objects.freeze.is', () => {
      it('#12.05.01 => should return true for frozen objects', () => {
        const obj = { a: 1, b: 2 };
        expect(objects.freeze.is(obj)).toBe(false);

        Object.freeze(obj);
        expect(objects.freeze.is(obj)).toBe(true);
      });

      it('#12.05.02 => should return false for non-frozen objects', () => {
        const obj = { a: 1, b: 2 };
        expect(objects.freeze.is(obj)).toBe(false);

        const frozen = objects.freeze(obj);
        expect(objects.freeze.is(frozen)).toBe(true);
      });

      it('#12.05.03 => should work with nested objects', () => {
        const obj = { nested: { value: 'test' } };
        expect(objects.freeze.is(obj)).toBe(false);

        const frozen = objects.freeze(obj);
        expect(objects.freeze.is(frozen)).toBe(true);
      });
    });

    describe('#12.07 => objects.freeze.not', () => {
      it('#12.07.01 => should return object without readonly type', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.freeze.not(obj);
        expect(result).toEqual(obj);
        expect(result).toBe(obj);
      });

      it('#12.07.02 => should work with any object type', () => {
        const obj = { complex: { nested: 'value' } };
        const result = objects.freeze.not(obj);
        expect(result).toEqual(obj);
      });
    });

    describe('#12.08 => objects.freeze.deep', () => {
      it('#12.08.01 => should deep freeze object', () => {
        const obj = { a: 1, nested: { b: 2 } };
        const result = objects.freeze.deep(obj);
        expect(result).toEqual(obj);
        expect(Object.isFrozen(result)).toBe(true);
        expect(result).toBe(obj);
      });

      it('#12.08.02 => should freeze nested structures', () => {
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

      describe('#12.08.04 => objects.freeze.deep.not', () => {
        it('#12.08.04.01 => should return object without deep readonly type', () => {
          const obj = { a: 1, nested: { b: 2 } };
          const result = objects.freeze.deep.not(obj);
          expect(result).toEqual(obj);
          expect(result).toBe(obj);
        });

        it('#12.08.04.02 => should preserve object structure', () => {
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

  describe('#15 => objects.require', () => {
    it('#13.01 => should add required properties', () => {
      const obj = { a: 1, b: undefined };
      const result = objects.required(obj, { b: 2 });
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('#13.02 => should not override existing defined properties', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.required(obj, { b: 3 });
      expect(result).toEqual({ a: 1, b: 3 });
    });

    it('#13.03 => should handle null values', () => {
      const obj = { a: 1, b: null };
      const result = objects.required(obj, { b: 2 });
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('#13.04 => should add new properties', () => {
      const obj = { a: 1 };
      const result = objects.required(obj, { b: 2 });
      expect(result).toEqual({ a: 1, b: 2 });
    });

    describe('#13.06 => objects.require.strict', () => {
      type O = { a: number; b?: number };
      it('#13.06.01 => should require properties strictly', () => {
        const obj: O = { a: 1, b: undefined };
        const result = objects.required.strict(obj, { b: 2 });
        expect(result).toEqual({ a: 1, b: 2 });
      });

      it('#13.06.02 => should modify original object', () => {
        const obj: O = { a: 1, b: undefined };
        objects.required.strict(obj, { b: 2 });
        expect(obj).toEqual({ a: 1, b: 2 });
      });

      it('#13.06.03 => should modify original object', () => {
        const obj: O = { a: 1, b: undefined };
        objects.required.const(obj, { b: 2 });
        expect(obj).toEqual({ a: 1, b: 2 });
      });
    });

    describe('#13.07 => objects.require.is', () => {
      it('#13.07.01 => should return true for fully required object', () => {
        const obj = { a: 1, b: 2, c: 'test' };
        expect(objects.required.is(obj)).toBe(true);
      });

      it('#13.07.02 => should return false for object with undefined values', () => {
        const obj = { a: 1, b: undefined };
        expect(objects.required.is(obj)).toBe(false);
      });

      it('#13.07.03 => should return false for object with null values', () => {
        const obj = { a: 1, b: null };
        expect(objects.required.is(obj)).toBe(false);
      });

      it('#13.07.04 => should return true for empty object', () => {
        expect(objects.required.is({})).toBe(true);
      });

      // Test 23: Object require.is.deep operations
      describe('#13.07.05 => objects.require.is.deep', () => {
        it('#13.07.05.01 => should return true for deeply required object', () => {
          const obj = { a: 1, nested: { b: 2, c: 'test' } };
          expect(objects.required.is.deep(obj)).toBe(true);
        });

        it('#13.07.05.02 => should return false for object with undefined values deep', () => {
          const obj = { a: 1, nested: { b: undefined } };
          expect(objects.required.is.deep(obj)).toBe(false);
        });

        it('#13.07.05.03 => should return false for object with null values deep', () => {
          const obj = { a: 1, nested: { b: null } };
          expect(objects.required.is.deep(obj)).toBe(false);
        });

        it('#13.07.05.04 => should handle arrays', () => {
          const obj = { items: [1, 2, 3] };
          expect(objects.required.is.deep(obj)).toBe(true);

          const objWithUndefined = { items: [1, undefined, 3] };
          expect(objects.required.is.deep(objWithUndefined)).toBe(false);
        });

        it('#13.07.05.05 => should handle nested arrays and objects', () => {
          const obj = {
            items: [
              { name: 'item1', value: 1 },
              { name: 'item2', value: 2 },
            ],
          };
          expect(objects.required.is.deep(obj)).toBe(true);

          const objWithUndefined = {
            items: [
              { name: 'item1', value: undefined },
              { name: 'item2', value: 2 },
            ],
          };
          expect(objects.required.is.deep(objWithUndefined)).toBe(false);
        });

        it('#13.07.05.06 => should handle empty arrays', () => {
          const obj = { emptyArray: [] };
          expect(objects.required.is.deep(obj)).toBe(true);
        });

        it('#13.07.05.07 => should handle mixed arrays with primitives', () => {
          const obj = { mixed: ['string', 42, true, null] };
          expect(objects.required.is.deep(obj)).toBe(false);

          const objWithUndefined = { mixed: ['string', 42, undefined] };
          expect(objects.required.is.deep(objWithUndefined)).toBe(false);
        });

        it('#13.07.05.08 => should handle deeply nested structures', () => {
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
          expect(objects.required.is.deep(obj)).toBe(true);

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
          expect(objects.required.is.deep(objWithUndefined)).toBe(false);
        });

        it('#13.07.05.09 => should handle arrays containing nested objects', () => {
          const obj = {
            items: [{ nested: { value: 'test' } }, { simple: 'value' }],
          };
          expect(objects.required.is.deep(obj)).toBe(true);

          const objWithUndefined = {
            items: [{ nested: { value: undefined } }, { simple: 'value' }],
          };
          expect(objects.required.is.deep(objWithUndefined)).toBe(false);
        });

        it('#13.07.05.10 => should handle complex mixed structures', () => {
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
          expect(objects.required.is.deep(obj)).toBe(true);

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
          expect(objects.required.is.deep(objWithNull)).toBe(false);
        });

        it('#13.07.05.11 => should return true for empty object', () => {
          expect(objects.required.is.deep({})).toBe(true);
        });

        it('#13.07.05.12 => should handle objects with zero values', () => {
          const obj = { zero: 0, empty: '', boolean: false };
          expect(objects.required.is.deep(obj)).toBe(true);
        });
      });
    });
  });

  describe('#16 => objects.pick', () => {
    it('#14.01 => should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const result = objects.pick(obj, 'a', 'c');
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('#14.02 => should return empty object when no keys specified', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.pick(obj);
      expect(result).toEqual({});
    });

    it('#14.03 => should handle non-existent keys', () => {
      const obj = { a: 1, b: 2 };
      const result = objects.pick(obj, 'a', 'c' as any);
      expect(result).toEqual({ a: 1 });
    });

    it('#14.04 => should work with nested objects', () => {
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

    describe('#14.05 => objects.pick.deep', () => {
      it('#14.05.01 => should pick keys deeply', () => {
        const obj = { a: 1, nested: { b: 2, c: 3 }, d: 4 };
        const result = objects.pick.deep(obj, 'b');
        expect(result).toEqual({ nested: { b: 2 } });
      });

      it('#14.05.02 => should handle multiple deep keys', () => {
        const obj = { a: 1, nested: { b: 2, c: 3, deep: { b: 4, d: 5 } } };
        const result = objects.pick.deep(obj, 'b', 'd');
        expect(result).toEqual({ nested: { b: 2, deep: { b: 4, d: 5 } } });
      });

      it('#14.05.03 => should work with top-level keys', () => {
        const obj = { a: 1, b: 2, nested: { c: 3 } };
        const result = objects.pick.deep(obj, 'a');
        expect(result).toEqual({ a: 1 });
      });

      describe('#14.04 => objects.pick.deep.by', () => {
        it('#14.04.01 => should pick by values deeply', () => {
          const obj = { a: 1, nested: { b: 2, c: 3 }, d: 2 };
          const result = objects.pick.deep.by(obj, 2);
          expect(result).toEqual({ nested: { b: 2 }, d: 2 });
        });

        it('#14.04.02 => should handle multiple values', () => {
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

        it('#14.04.03 => should work with nested objects', () => {
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

        it('#14.04.04 => should handle empty object', () => {
          const obj = {};
          const result = objects.pick.deep.by(obj, 'any');
          expect(result).toEqual({});
        });

        it('#14.04.05 => should handle non-existent values', () => {
          const obj = { a: 1, nested: { b: 2 } };
          const result = objects.pick.deep.by(obj, 'nonexistent');
          expect(result).toEqual({});
        });

        it('#14.04.06 => should handle complex mixed structures', () => {
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

        it('#14.04.07 => should handle null and undefined values', () => {
          const obj = {
            a: null,
            nested: { b: undefined, c: 'keep' },
            d: null,
          };
          const result = objects.pick.deep.by(obj, null);
          expect(result).toEqual({ a: null, d: null });
        });

        it('#14.04.08 => should handle boolean values', () => {
          const obj = {
            flag1: true,
            flag2: false,
            nested: { flag3: true, other: 'ignore' },
          };
          const result = objects.pick.deep.by(obj, true);
          expect(result).toEqual({ flag1: true, nested: { flag3: true } });
        });

        it('#14.04.09 => should handle numeric values', () => {
          const obj = {
            zero: 0,
            positive: 42,
            nested: { negative: -1, zero: 0 },
          };
          const result = objects.pick.deep.by(obj, 0);
          expect(result).toEqual({ zero: 0, nested: { zero: 0 } });
        });

        it('#14.04.10 => should handle string values with special characters', () => {
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
    });

    describe('#17 => objects.pick.by', () => {
      it('#17.01 => should pick by values', () => {
        const obj = { a: 1, b: 2, c: 1, d: 3 };
        const result = objects.pick.by(obj, 1);
        expect(result).toEqual({ a: 1, c: 1 });
      });

      it('#17.02 => should handle multiple values', () => {
        const obj = { a: 1, b: 2, c: 3, d: 2 };
        const result = objects.pick.by(obj, 1, 2);
        expect(result).toEqual({ a: 1, b: 2, d: 2 });
      });

      it('#17.03 => should return empty object for non-existent values', () => {
        const obj = { a: 1, b: 2 };
        const result = objects.pick.by(obj, 3);
        expect(result).toEqual({});
      });
    });
  });

  describe('#17 => objects.ru', () => {
    it('#15.01 => should cast value to Record<string, unknown>', () => {
      const obj = { a: 1, b: 'test', c: true };
      const result = objects.ru(obj);
      expect(result).toBe(obj);
      expect(result).toEqual({ a: 1, b: 'test', c: true });
    });

    it('#15.02 => should work with any object', () => {
      const obj = { key: 'value', number: 42 };
      const result = objects.ru(obj);
      expect(result).toBe(obj);
    });

    describe('#15.03 => objects.ru.forceCast', () => {
      it('#15.03.01 => should force cast any value to Record<string, unknown>', () => {
        const value = 'not an object';
        const result = objects.ru.forceCast(value);
        expect(result).toBe(value);
      });

      it('#15.03.02 => should work with numbers', () => {
        const value = 42;
        const result = objects.ru.forceCast(value);
        expect(result).toBe(value);
      });

      it('#15.03.03 => should work with arrays', () => {
        const value = [1, 2, 3];
        const result = objects.ru.forceCast(value);
        expect(result).toBe(value);
      });

      it('#15.03.04 => should work with null', () => {
        const value = null;
        const result = objects.ru.forceCast(value);
        expect(result).toBe(value);
      });
    });

    describe('#15.04 => objects.ru.dynamic', () => {
      it('#15.04.01 => should preserve object type', () => {
        const obj = { a: 1, b: 'test' };
        const result = objects.ru.dynamic(obj);
        expect(result).toBe(obj);
        expect(result).toEqual({ a: 1, b: 'test' });
      });

      it('#15.04.02 => should work with complex objects', () => {
        const obj = { nested: { value: 'test' }, array: [1, 2, 3] };
        const result = objects.ru.dynamic(obj);
        expect(result).toBe(obj);
      });
    });
  });

  describe('#18 => objects.ra', () => {
    it('#16.01 => should cast value to Record<string, any>', () => {
      const obj = { a: 1, b: 'test', c: true };
      const result = objects.ra(obj);
      expect(result).toBe(obj);
      expect(result).toEqual({ a: 1, b: 'test', c: true });
    });

    it('#16.02 => should work with any object', () => {
      const obj = { key: 'value', number: 42 };
      const result = objects.ra(obj);
      expect(result).toBe(obj);
    });

    describe('#16.03 => objects.ra.forceCast', () => {
      it('#16.03.01 => should force cast any value to Record<string, any>', () => {
        const value = 'not an object';
        const result = objects.ra.forceCast(value);
        expect(result).toBe(value);
      });

      it('#16.03.02 => should work with numbers', () => {
        const value = 42;
        const result = objects.ra.forceCast(value);
        expect(result).toBe(value);
      });

      it('#16.03.03 => should work with arrays', () => {
        const value = [1, 2, 3];
        const result = objects.ra.forceCast(value);
        expect(result).toBe(value);
      });

      it('#16.03.04 => should work with functions', () => {
        const value = () => 'test';
        const result = objects.ra.forceCast(value);
        expect(result).toBe(value);
      });

      it('#16.03.05 => should work with null', () => {
        const value = null;
        const result = objects.ra.forceCast(value);
        expect(result).toBe(value);
      });
    });

    describe('#16.04 => objects.ra.dynamic', () => {
      it('#16.04.01 => should preserve object type', () => {
        const obj = { a: 1, b: 'test' };
        const result = objects.ra.dynamic(obj);
        expect(result).toBe(obj);
        expect(result).toEqual({ a: 1, b: 'test' });
      });

      it('#16.04.02 => should work with complex objects', () => {
        const obj = { nested: { value: 'test' }, array: [1, 2, 3] };
        const result = objects.ra.dynamic(obj);
        expect(result).toBe(obj);
      });

      it('#16.04.03 => should work with objects containing any types', () => {
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

  describe('#19 => objects.primitive', () => {
    describe('#17.00 => main', () => {
      it('#17.00.01 => should cast value to primitive object', () => {
        const obj = { a: 1, b: 'test' };
        const result = objects.primitive(obj);
        expect(result).toBe(obj);
        expect(result).toEqual({ a: 1, b: 'test' });
      });

      it('#17.00.02 => should work with any JSON object', () => {
        const obj = { key: 'value', number: 42 };
        const result = objects.primitive(obj);
        expect(result).toBe(obj);
      });
    });

    describe('#17.01 => objects.primitive.forceCast', () => {
      it('#17.01.01 => should force cast any value to primitive object', () => {
        const value = 'test';
        const result = objects.primitive.forceCast(value);
        expect(result).toBe(value);
      });

      it('#17.01.02 => should work with numbers', () => {
        const value = 42;
        const result = objects.primitive.forceCast(value);
        expect(result).toBe(value);
      });

      it('#17.01.03 => should work with arrays', () => {
        const value = [1, 2, 3];
        const result = objects.primitive.forceCast(value);
        expect(result).toBe(value);
      });

      it('#17.01.04 => should work with null', () => {
        const value = null;
        const result = objects.primitive.forceCast(value);
        expect(result).toBe(value);
      });
    });

    describe('#17.02 => objects.primitive.dynamic', () => {
      it('#17.02.01 => should preserve object type', () => {
        const obj = { a: 1, b: 'test' };
        const result = objects.primitive.dynamic(obj);
        expect(result).toBe(obj);
        expect(result).toEqual({ a: 1, b: 'test' });
      });

      it('#17.02.02 => should work with complex objects', () => {
        const obj = { nested: { value: 'test' }, array: [1, 2, 3] };
        const result = objects.primitive.dynamic(obj);
        expect(result).toBe(obj);
      });
    });

    describe('#17.03 => objects.primitive.is', () => {
      it('#17.03.01 => should return true for empty object', () => {
        expect(objects.primitive.is({})).toBe(true);
      });

      it('#17.03.02 => should return true for object with only primitive values', () => {
        const obj = {
          string: 'hello',
          number: 42,
          boolean: true,
          null: null,
          undefined: undefined,
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#17.03.03 => should return true for object with arrays of primitives', () => {
        const obj = {
          strings: ['hello', 'world'],
          numbers: [1, 2, 3],
          booleans: [true, false],
          mixed: ['hello', 42, true, null, undefined],
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#17.03.04 => should return true for nested object with primitives', () => {
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

      it('#17.03.05 => should return true for object with arrays containing nested primitive objects', () => {
        const obj = {
          items: [
            { name: 'item1', value: 1 },
            { name: 'item2', value: 2 },
          ],
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#17.03.06 => should return false for object with function', () => {
        const obj = {
          fn: () => {},
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.07 => should return false for object with Date', () => {
        const obj = {
          date: new Date(),
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.08 => should return false for object with RegExp', () => {
        const obj = {
          regex: /test/,
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.09 => should return false for object with Map', () => {
        const obj = {
          map: new Map(),
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.10 => should return false for object with Set', () => {
        const obj = {
          set: new Set(),
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.11 => should return false for object with class instance', () => {
        class TestClass {
          constructor(public value: string) {}
        }
        const obj = {
          instance: new TestClass('test'),
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.12 => should return false for object with Symbol', () => {
        const obj = {
          symbol: Symbol('test'),
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.13 => should return false for nested object with non-primitive', () => {
        const obj = {
          name: 'test',
          nested: {
            value: 42,
            fn: () => {},
          },
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.14 => should return false for array containing non-primitive objects', () => {
        const obj = {
          items: [
            { name: 'item1', value: 1 },
            { name: 'item2', date: new Date() },
          ],
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.15 => should return false for array containing non-primitive values', () => {
        const obj = {
          items: ['string', 42, () => {}],
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.16 => should handle deeply nested structures', () => {
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

      it('#17.03.17 => should handle empty arrays', () => {
        const obj = {
          emptyArray: [],
          value: 'test',
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#17.03.18 => should handle mixed arrays with nested objects', () => {
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

      it('#17.03.19 => should return false for arrays with functions', () => {
        const obj = {
          mixed: ['string', 42, () => {}],
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.20 => should return false for arrays with complex objects', () => {
        const obj = {
          mixed: ['string', 42, { nested: new Date() }],
        };
        expect(objects.primitive.is(obj)).toBe(false);
      });

      it('#17.03.21 => should return false for non-plain objects', () => {
        expect(objects.primitive.is([])).toBe(false);
        expect(objects.primitive.is(new Date())).toBe(false);
        expect(objects.primitive.is(null)).toBe(false);
        expect(objects.primitive.is(undefined)).toBe(false);
        expect(objects.primitive.is('string')).toBe(false);
        expect(objects.primitive.is(42)).toBe(false);
        expect(objects.primitive.is(true)).toBe(false);
        expect(objects.primitive.is(() => {})).toBe(false);
      });

      it('#17.03.23 => should handle objects with prototype properties', () => {
        const obj = Object.create({ inherited: 'value' });
        obj.own = 'property';
        // Should only check own properties, not inherited ones
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#17.03.24 => should handle objects with numeric keys', () => {
        const obj = {
          1: 'one',
          2: 'two',
          normal: 'value',
        };
        expect(objects.primitive.is(obj)).toBe(true);
      });

      it('#17.03.25 => should handle objects with mixed nested structures', () => {
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
  });
});
