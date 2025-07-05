import deepClone from './deepclone';

describe('#01 => deepClone - Basic functionality', () => {
  it('#01.01 => should clone string primitive correctly', () => {
    expect(deepClone('hello')).toBe('hello');
  });

  it('#01.01 => should clone number primitive correctly', () => {
    expect(deepClone(42)).toBe(42);
  });

  it('#01.01 => should clone boolean primitive correctly', () => {
    expect(deepClone(true)).toBe(true);
  });

  it('#01.01 => should clone null correctly', () => {
    expect(deepClone(null)).toBe(null);
  });

  it('#01.01 => should clone undefined correctly', () => {
    expect(deepClone(undefined)).toBe(undefined);
  });

  describe('#01.02 => simple objects cloning', () => {
    const original = { a: 1, b: 'hello', c: true } as const;
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#01.02.01 => should match the original object structure', () => {
      expect(cloned).toEqual(original);
    });

    it('#01.02.02 => should create a new object instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#01.02.03 => should correctly clone number property', () => {
      expect(cloned.a).toBe(1);
    });

    it('#01.02.04 => should correctly clone string property', () => {
      expect(cloned.b).toBe('hello');
    });

    it('#01.02.05 => should correctly clone boolean property', () => {
      expect(cloned.c).toBe(true);
    });
  });

  describe('#01.03 => nested objects cloning', () => {
    const original = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 'nested',
          f: true,
        },
      },
    } as const;
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#01.03.01 => should match the original object structure', () => {
      expect(cloned).toEqual(original);
    });

    it('#01.03.02 => should create a new object instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#01.03.03 => should create new instances for nested objects', () => {
      expect(cloned.b).not.toBe(original.b);
      expect(cloned.b.d).not.toBe(original.b.d);
    });

    it('#01.03.04 => should correctly clone deeply nested properties', () => {
      expect(cloned.b.d.e).toBe('nested');
    });
  });

  describe('#01.04 => should clone simple arrays', () => {
    const original = [1, 'hello', true] as any;
    let cloned: any[];

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#01.04.01 => should match the original array structure', () => {
      expect(cloned).toEqual(original);
    });

    it('#01.04.02 => should create a new array instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#01.04.03 => should maintain array type', () => {
      expect(Array.isArray(cloned)).toBe(true);
    });
  });

  describe('#01.05 => should clone arrays with objects', () => {
    const original = [{ a: 1 }, { b: { c: 2 } }];
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#01.05.01 => should match the original array structure', () => {
      expect(cloned).toEqual(original);
    });

    it('#01.05.02 => should create a new array instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#01.05.03 => should create new instances for objects in array', () => {
      expect(cloned[0]).not.toBe(original[0]);
      expect(cloned[1]).not.toBe(original[1]);
    });

    it('#01.05.04 => should create new instances for nested objects', () => {
      expect(cloned[1].b).not.toBe(original[1].b);
    });
  });

  describe('#01.06 => should clone objects with arrays', () => {
    const original = {
      arr1: [1, 2, 3],
      arr2: ['a', 'b'],
      nested: {
        arr3: [{ x: 1 }, { y: 2 }],
      },
    } as const;
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#01.06.01 => should match the original object structure', () => {
      expect(cloned).toEqual(original);
    });

    it('#01.06.02 => should create a new object instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#01.06.03 => should create new instances for arrays in object', () => {
      expect(cloned.arr1).not.toBe(original.arr1);
      expect(cloned.arr2).not.toBe(original.arr2);
    });

    it('#01.06.04 => should create new instances for nested objects', () => {
      expect(cloned.nested).not.toBe(original.nested);
    });

    it('#01.06.05 => should create new instances for nested arrays', () => {
      expect(cloned.nested.arr3).not.toBe(original.nested.arr3);
    });

    it('#01.06.06 => should create new instances for objects in nested arrays', () => {
      expect(cloned.nested.arr3[0]).not.toBe(original.nested.arr3[0]);
    });
  });
});

describe('#02 => deepClone - Circular references', () => {
  describe('#02.01 => Circular references in objects', () => {
    let original: any;
    let cloned: any;

    beforeEach(() => {
      original = { a: 1 };
      original.self = original;
      cloned = deepClone(original);
    });

    it('#02.01.01 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#02.01.02 => should preserve primitive properties', () => {
      expect(cloned.a).toBe(1);
    });

    it('#02.01.03 => should properly handle self-reference', () => {
      expect(cloned.self).toBe(cloned);
      expect(cloned.self).not.toBe(original);
    });
  });

  describe('#02.02 => Circular references in arrays', () => {
    let original: any[];
    let cloned: any[];

    beforeEach(() => {
      original = [1, 2];
      original.push(original);
      cloned = deepClone(original);
    });

    it('#02.02.01 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#02.02.02 => should preserve primitive values', () => {
      expect(cloned[0]).toBe(1);
      expect(cloned[1]).toBe(2);
    });

    it('#02.02.03 => should properly handle self-reference', () => {
      expect(cloned[2]).toBe(cloned);
      expect(cloned[2]).not.toBe(original);
      expect(cloned[2]).toEqual(original);
    });
  });

  describe('#02.03 => Complex circular references', () => {
    let original: any;
    let cloned: any;

    beforeEach(() => {
      original = {
        a: 1,
        b: {
          c: 2,
        },
      };
      original.b.parent = original;
      original.sibling = original.b;
      cloned = deepClone(original);
    });

    it('#02.03.01 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });

    it('#02.03.02 => should properly handle parent reference', () => {
      expect(cloned.b.parent).toBe(cloned);
    });

    it('#02.03.03 => should properly handle sibling reference', () => {
      expect(cloned.sibling).toBe(cloned.b);
      expect(cloned.sibling.parent).toBe(cloned);
    });
  });

  describe('#02.04 => Recursive structures without direct circular references', () => {
    let original: any[];
    let cloned: any[];

    beforeEach(() => {
      original = [1, 2];
      original.push([...original]);
      cloned = deepClone(original);
    });

    it('#02.04.01 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
      expect(cloned[2]).not.toBe(original[2]);
    });

    it('#02.04.02 => should preserve the structure', () => {
      expect(cloned).toEqual(original);
      expect(cloned).toEqual([1, 2, [1, 2]]);
    });

    it('#02.04.03 => should preserve primitive values', () => {
      expect(cloned[0]).toBe(1);
      expect(cloned[1]).toBe(2);
      expect(cloned[2]).toEqual([1, 2]);
    });
  });
});

describe('#03 => deepClone - Object properties', () => {
  describe('#03.01 => should preserve frozen objects', () => {
    const original = Object.freeze({ a: 1, b: 2 } as const);
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#03.01.01 => should match the original object', () => {
      expect(cloned).toEqual(original);
    });

    it('#03.01.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#03.01.03 => should preserve frozen state', () => {
      expect(Object.isFrozen(cloned)).toBe(true);
    });
  });

  describe('#03.02 => should preserve sealed objects', () => {
    const original = Object.seal({ a: 1, b: 2 } as const);
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#03.02.01 => should match the original object', () => {
      expect(cloned).toEqual(original);
    });

    it('#03.02.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#03.02.03 => should preserve sealed state', () => {
      expect(Object.isSealed(cloned)).toBe(true);
    });
  });

  describe('#03.03 => should preserve both frozen and sealed properties', () => {
    const original = Object.freeze(Object.seal({ a: 1, b: 2 } as const));
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#03.03.01 => should match the original object', () => {
      expect(cloned).toEqual(original);
    });

    it('#03.03.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#03.03.03 => should preserve frozen state', () => {
      expect(Object.isFrozen(cloned)).toBe(true);
    });

    it('#03.03.04 => should preserve sealed state', () => {
      expect(Object.isSealed(cloned)).toBe(true);
    });
  });

  describe('#03.04 => should preserve frozen/sealed state in nested objects', () => {
    const original = {
      normal: { a: 1 },
      frozen: Object.freeze({ b: 2 }),
      sealed: Object.seal({ c: 3 }),
    } as const;
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#03.04.01 => should match the original object', () => {
      expect(cloned).toEqual(original);
    });

    it('#03.04.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#03.04.03 => should not freeze normal objects', () => {
      expect(Object.isFrozen((cloned as any).normal)).toBe(false);
    });

    it('#03.04.04 => should preserve frozen state in nested objects', () => {
      expect(Object.isFrozen((cloned as any).frozen)).toBe(true);
    });

    it('#03.04.05 => should preserve sealed state in nested objects', () => {
      expect(Object.isSealed((cloned as any).sealed)).toBe(true);
    });
  });
});

describe('#06 => deepClone - Edge cases', () => {
  describe('#06.01 => should handle empty objects', () => {
    const original = {} as const;
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#06.01.01 => should match the original object', () => {
      expect(cloned).toEqual(original);
    });

    it('#06.01.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });
  });

  describe('#06.02 => should handle empty arrays', () => {
    const original: any[] = [];
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#06.02.01 => should match the original array', () => {
      expect(cloned).toEqual(original);
    });

    it('#06.02.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#06.02.03 => should maintain array type', () => {
      expect(Array.isArray(cloned)).toBe(true);
    });
  });

  describe('#06.03 => should handle objects with numeric string keys', () => {
    const original = { 0: 'zero', '1': 'one', 2: 'two' } as const;
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#06.03.01 => should match the original object', () => {
      expect(cloned).toEqual(original);
    });

    it('#06.03.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#06.03.03 => should preserve key "0"', () => {
      expect((cloned as any)['0']).toBe('zero');
    });

    it('#06.03.04 => should preserve key "1"', () => {
      expect((cloned as any)['1']).toBe('one');
    });

    it('#06.03.05 => should preserve key 2', () => {
      expect((cloned as any)[2]).toBe('two');
    });
  });

  describe('#06.04 => should handle sparse arrays', () => {
    const original: any[] = [];
    original[0] = 'first';
    original[5] = 'sixth';
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#06.04.01 => should match the original array', () => {
      expect(cloned).toEqual(original);
    });

    it('#06.04.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#06.04.03 => should preserve first element', () => {
      expect(cloned[0]).toBe('first');
    });

    it('#06.04.04 => should preserve last element', () => {
      expect(cloned[5]).toBe('sixth');
    });

    it('#06.04.05 => should preserve array length', () => {
      expect(cloned.length).toBe(6);
    });
  });

  describe('#06.05 => should handle objects with symbol keys (they should be ignored)', () => {
    const sym = Symbol('test');
    const original = { a: 1, [sym]: 'symbol value' };
    let cloned: any;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#06.05.01 => should preserve regular keys', () => {
      expect(cloned.a).toBe(1);
    });

    it('#06.05.02 => should not copy symbol keys', () => {
      expect(cloned[sym]).toBeUndefined();
    });

    it('#06.05.03 => should only have expected keys', () => {
      expect(Object.keys(cloned)).toEqual(['a']);
    });
  });
});

describe('#07 => deepClone - Performance and memory', () => {
  describe('#07.01 => should handle large objects', () => {
    const original: any = {};
    for (let i = 0; i < 100; i++) {
      original[`key${i}`] = `value${i}`;
    }
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#07.01.01 => should match the original object', () => {
      expect(cloned).toEqual(original);
    });

    it('#07.01.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#07.01.03 => should have correct number of keys', () => {
      expect(Object.keys(cloned)).toHaveLength(100);
    });
  });

  describe('#07.02 => should handle deeply nested objects', () => {
    let original: any = { value: 0 };
    for (let i = 0; i < 50; i++) {
      original = { nested: original, level: i };
    }
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#07.02.01 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#07.02.02 => should preserve level value', () => {
      expect(cloned.level).toBe(49);
    });

    it('#07.02.03 => should correctly navigate to the deepest level', () => {
      let current = cloned;
      for (let i = 0; i < 50; i++) {
        current = current.nested;
      }
      expect(current.value).toBe(0);
    });
  });

  describe('#07.03 => should reuse references for the same circular object', () => {
    const shared = { shared: true } as const;
    const original = {
      ref1: shared,
      ref2: shared,
      nested: {
        ref3: shared,
      },
    } as const;
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#07.03.01 => should maintain reference equality between ref1 and ref2', () => {
      expect(cloned.ref1).toBe(cloned.ref2);
    });

    it('#07.03.02 => should maintain reference equality with nested ref3', () => {
      expect(cloned.ref1).toBe(cloned.nested.ref3);
    });

    it('#07.03.03 => should create new instances', () => {
      expect(cloned.ref1).not.toBe(shared);
    });
  });

  describe('#07.04 => should handle null and undefined values', () => {
    const original = {
      nullValue: null,
      undefinedValue: undefined,
      nested: {
        alsoNull: null,
        alsoUndefined: undefined,
      },
    } as const;
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#07.04.01 => should match the original object', () => {
      expect(cloned).toEqual(original);
    });

    it('#07.04.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#07.04.03 => should preserve null values', () => {
      expect(cloned.nullValue).toBeNull();
      expect(cloned.nested.alsoNull).toBeNull();
    });

    it('#07.04.04 => should preserve undefined values', () => {
      expect(cloned.undefinedValue).toBeUndefined();
      expect(cloned.nested.alsoUndefined).toBeUndefined();
    });
  });

  describe('#07.05 => should handle mixed arrays with primitives and objects', () => {
    const original = [
      1,
      'string',
      true,
      null,
      undefined,
      { key: 'value' },
      [1, 2, 3],
      [[1, 'hujfdifhid', [true]]],
    ];
    let cloned: typeof original;

    beforeEach(() => {
      cloned = deepClone(original);
    });

    it('#07.05.01 => should match the original array', () => {
      expect(cloned).toEqual(original);
    });

    it('#07.05.02 => should create a new instance', () => {
      expect(cloned).not.toBe(original);
    });

    it('#07.05.03 => should preserve primitive values', () => {
      expect(cloned[0]).toBe(1);
      expect(cloned[1]).toBe('string');
      expect(cloned[2]).toBe(true);
      expect(cloned[3]).toBeNull();
      expect(cloned[4]).toBeUndefined();
    });

    it('#07.05.04 => should create new instances for objects and arrays', () => {
      expect(cloned[5]).not.toBe(original[5]);
      expect(cloned[6]).not.toBe(original[6]);
    });
  });
});
