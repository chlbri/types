import { isPrimitiveObject } from './objects';

describe('isPrimitiveObjectMap', () => {
  describe('should return true for valid primitive object maps', () => {
    it('should return true for empty object', () => {
      expect(isPrimitiveObject({})).toBe(true);
    });

    it('should return true for object with only primitive values', () => {
      const obj = {
        string: 'hello',
        number: 42,
        boolean: true,
        null: null,
        undefined: undefined,
      };
      expect(isPrimitiveObject(obj)).toBe(true);
    });

    it('should return true for object with arrays of primitives', () => {
      const obj = {
        strings: ['hello', 'world'],
        numbers: [1, 2, 3],
        booleans: [true, false],
        mixed: ['hello', 42, true, null, undefined],
      };
      expect(isPrimitiveObject(obj)).toBe(true);
    });

    it('should return true for nested object with primitives', () => {
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
      expect(isPrimitiveObject(obj)).toBe(true);
    });

    it('should return true for object with arrays containing nested primitive objects', () => {
      const obj = {
        items: [
          { name: 'item1', value: 1 },
          { name: 'item2', value: 2 },
        ],
      };
      expect(isPrimitiveObject(obj)).toBe(true);
    });
  });

  describe('should return false for invalid primitive object maps', () => {
    it('should return false for object with function', () => {
      const obj = {
        fn: () => {},
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });

    it('should return false for object with Date', () => {
      const obj = {
        date: new Date(),
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });

    it('should return false for object with RegExp', () => {
      const obj = {
        regex: /test/,
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });

    it('should return false for object with Map', () => {
      const obj = {
        map: new Map(),
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });

    it('should return false for object with Set', () => {
      const obj = {
        set: new Set(),
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });

    it('should return false for object with class instance', () => {
      class TestClass {
        constructor(public value: string) {}
      }
      const obj = {
        instance: new TestClass('test'),
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });

    it('should return false for object with Symbol', () => {
      const obj = {
        symbol: Symbol('test'),
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });

    it('should return false for nested object with non-primitive', () => {
      const obj = {
        name: 'test',
        nested: {
          value: 42,
          fn: () => {},
        },
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });

    it('should return false for array containing non-primitive objects', () => {
      const obj = {
        items: [
          { name: 'item1', value: 1 },
          { name: 'item2', date: new Date() },
        ],
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });

    it('should return false for array containing non-primitive values', () => {
      const obj = {
        items: ['string', 42, () => {}],
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle deeply nested structures', () => {
      const child = {
        value: 'deep',
        number: 42,
      };
      expect(isPrimitiveObject(child)).toBe(true);

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
      expect(isPrimitiveObject(obj)).toBe(true);
    });

    it('should handle empty arrays', () => {
      const obj = {
        emptyArray: [],
        value: 'test',
      };
      expect(isPrimitiveObject(obj)).toBe(true);
    });

    it('should handle mixed arrays with nested objects', () => {
      const obj = {
        mixed: [
          'string',
          42,
          { nested: 'value' },
          [1, 2, 3],
          { deep: { nested: 'value' } },
        ],
      };
      expect(isPrimitiveObject(obj)).toBe(true);
    });

    it('should return false for arrays with functions', () => {
      const obj = {
        mixed: ['string', 42, () => {}],
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });

    it('should return false for arrays with complex objects', () => {
      const obj = {
        mixed: ['string', 42, { nested: new Date() }],
      };
      expect(isPrimitiveObject(obj)).toBe(false);
    });
  });
});

it('my ', () => {
  console.log(Object.assign({ a: 1 }, { b: 2 }, {}));
});
