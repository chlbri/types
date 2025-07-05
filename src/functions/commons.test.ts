import { _unknown, castFn, castFnBasic, commons } from './commons';

describe('Castings common', () => {
  describe('#00 => castFnBasic', () => {
    it('#00.01 => should create a function with main functionality', () => {
      const mainFn = (x: string) => x.toUpperCase();
      const result = castFnBasic(mainFn);

      expect(typeof result).toBe('function');
      expect(result('test')).toBe('TEST');
    });

    it('#00.02 => should extend function with additional properties', () => {
      const mainFn = (x: string) => x.toUpperCase();
      const extensions = {
        toLowerCase: (x: string) => x.toLowerCase(),
        reverse: (x: string) => x.split('').reverse().join(''),
      };

      const result = castFnBasic(mainFn, extensions);

      expect(result('TEST')).toBe('TEST');
      expect(result.toLowerCase('TEST')).toBe('test');
      expect(result.reverse('TEST')).toBe('TSET');
    });

    it('#00.03 => should work without extensions', () => {
      const mainFn = (x: number) => x * 2;
      const result = castFnBasic(mainFn);

      expect(result(5)).toBe(10);
    });
  });

  describe('#01 => should have typeFn', () => {
    const fn = castFn()();

    it('#01.01 => should return a function', () => {
      expect(typeof fn).toBe('function');
    });

    it('#01.02 => should have a forceCast property', () => {
      expect(fn.forceCast).toBeDefined();
    });

    describe('#01.03 => dynamic method', () => {
      it('#01.04 => should be defined', () => {
        expect(fn.dynamic).toBeDefined();
      });

      it('#01.05 => should be a function', () => {
        expect(typeof fn.dynamic).toBe('function');
      });
    });
  });

  describe('#02 => should have _unknown and identity', () => {
    it('#02.01 => identity and _unknwown returns same value for the same params', () => {
      const value = { a: 1, b: 'test' };
      expect(commons.identity(value)).toBe(value);
      expect(_unknown(value)).toBe(value);
    });

    it('#02.02 => _unknown should return undefined if no args', () => {
      expect(_unknown()).toBeUndefined();
    });
  });

  describe('#03 => Testing same output', () => {
    const value: any = { a: 1, b: 'test' };

    it('#03.00 => for main', () => {
      expect(commons(value)).toBe(value);
    });

    it.each([
      [1, 'partial'],
      [2, 'identity'],
      [3, 'unknown'],
      [4, 'any'],
      [5, 'neverify'],
      [6, 'required'],
      [7, 'readonly'],
      [8, 'primitive'],
      [9, 'symbol'],
      [10, 'date'],
      [11, 'undefiny'],
    ])('#03.%i => for %s', (_, method) => {
      const fn = commons[method as keyof typeof commons] as any;
      expect(fn(value)).toBe(value);
    });

    it('#03.12 => for partial.deep', () => {
      const fn = commons.partial.deep;
      expect(fn(value)).toBe(value);
    });

    describe('#03.13 => any', () => {
      it('#03.13.01 => for any.forceCast', () => {
        const fn = commons.any.forceCast;
        expect(fn(value)).toBe(value);
      });

      it('#03.13.02 => for any.dynamic', () => {
        const fn = commons.any.dynamic;
        expect(fn(value)).toBe(value);
      });
    });

    it('#03.14 => for required.deep', () => {
      const fn = commons.required.deep;
      expect(fn(value)).toBe(value);
    });

    describe('#03.15 => readonly interns', () => {
      it('#03.15.01 => for readonly.const', () => {
        const fn = commons.readonly.const;
        expect(fn(value)).toBe(value);
      });

      it('#03.15.02 => for readonly.deep', () => {
        const fn = commons.readonly.deep;
        expect(fn(value)).toBe(value);
      });

      it('#03.15.03 => for readonly.deep.const', () => {
        const fn = commons.readonly.deep.const;
        expect(fn(value)).toBe(value);
      });

      it('#03.15.04 => for readonly.not', () => {
        const fn = commons.readonly.not;
        expect(fn(value)).toBe(value);
      });

      it('#03.15.05 => for readonly.not.const', () => {
        const fn = commons.readonly.not.const;
        expect(fn(value)).toBe(value);
      });

      it('#03.15.06 => for readonly.not.deep', () => {
        const fn = commons.readonly.not.deep;
        expect(fn(value)).toBe(value);
      });
    });

    describe('#03.16 => primitive', () => {
      it('#03.16.01 => for primitive.forceCast', () => {
        const fn = commons.primitive.forceCast;
        expect(fn(value)).toBe(value);
      });

      it('#03.16.02 => for primitive.dynamic', () => {
        const fn = commons.primitive.dynamic;
        expect(fn(value)).toBe(value);
      });
    });

    describe('#03.17 => symbol', () => {
      it('#03.17.01 => for symbol.forceCast', () => {
        const fn = commons.symbol.forceCast;
        expect(fn(value)).toBe(value);
      });

      it('#03.17.02 => for symbol.dynamic', () => {
        const fn = commons.symbol.dynamic;
        expect(fn(value)).toBe(value);
      });
    });

    describe('#03.18 => date', () => {
      it('#03.18.01 => for date.forceCast', () => {
        const fn = commons.date.forceCast;
        expect(fn(value)).toBe(value);
      });

      it('#03.18.02 => for date.dynamic', () => {
        const fn = commons.date.dynamic;
        expect(fn(value)).toBe(value);
      });
    });
  });

  describe('#04 => constants', () => {
    it('#04.01 => should have a constant for undefined', () => {
      expect(commons.undefined).toBeUndefined();
    });

    it('#04.02 => should have a constant for null', () => {
      expect(commons.null).toBeNull();
    });
  });

  describe('#04.1 => commons.clone', () => {
    it('#04.1.01 => should deep clone simple objects', () => {
      const original = { a: 1, b: 'test', c: true };
      const cloned = commons.clone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);

      // Modify cloned object should not affect original
      cloned.a = 999;
      expect(original.a).toBe(1);
    });

    it('#04.1.02 => should deep clone nested objects', () => {
      const original = {
        user: {
          name: 'John',
          age: 30,
          address: {
            street: '123 Main St',
            city: 'New York',
          },
        },
        active: true,
      };

      const cloned = commons.clone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.user).not.toBe(original.user);
      expect(cloned.user.address).not.toBe(original.user.address);

      // Modify nested properties
      cloned.user.name = 'Jane';
      cloned.user.address.city = 'Boston';

      expect(original.user.name).toBe('John');
      expect(original.user.address.city).toBe('New York');
    });

    it('#04.1.03 => should clone arrays within objects', () => {
      const original = {
        items: [1, 2, 3],
        tags: ['typescript', 'javascript'],
        metadata: {
          categories: ['web', 'frontend'],
        },
      };

      const cloned = commons.clone(original);

      expect(cloned).toEqual(original);
      expect(cloned.items).not.toBe(original.items);
      expect(cloned.tags).not.toBe(original.tags);
      expect(cloned.metadata.categories).not.toBe(
        original.metadata.categories,
      );

      // Modify arrays
      cloned.items.push(4);
      cloned.tags[0] = 'python';
      cloned.metadata.categories.pop();

      expect(original.items).toEqual([1, 2, 3]);
      expect(original.tags[0]).toBe('typescript');
      expect(original.metadata.categories).toEqual(['web', 'frontend']);
    });

    it('#04.1.04 => should handle primitive values in objects', () => {
      const original = {
        string: 'hello',
        number: 42,
        boolean: true,
        nullValue: null,
        undefinedValue: undefined,
      };

      const cloned = commons.clone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);

      // Primitive values should be copied correctly
      expect(cloned.string).toBe('hello');
      expect(cloned.number).toBe(42);
      expect(cloned.boolean).toBe(true);
      expect(cloned.nullValue).toBeNull();
      expect(cloned.undefinedValue).toBeUndefined();
    });

    it('#04.1.05 => should clone empty objects and arrays', () => {
      const originalEmpty = {};
      const clonedEmpty = commons.clone(originalEmpty);

      expect(clonedEmpty).toEqual({});
      expect(clonedEmpty).not.toBe(originalEmpty);

      const originalWithEmptyArray = { items: [] };
      const clonedWithEmptyArray = commons.clone(originalWithEmptyArray);

      expect(clonedWithEmptyArray.items).toEqual([]);
      expect(clonedWithEmptyArray.items).not.toBe(
        originalWithEmptyArray.items,
      );
    });

    it('#04.1.06 => should handle objects with mixed array and object nesting', () => {
      const original = {
        users: [
          { id: 1, name: 'Alice', preferences: { theme: 'dark' } },
          { id: 2, name: 'Bob', preferences: { theme: 'light' } },
        ],
        settings: {
          notifications: ['email', 'push'],
          security: {
            twoFactor: true,
            allowedIPs: ['192.168.1.1', '10.0.0.1'],
          },
        },
      };

      const cloned = commons.clone(original);

      expect(cloned).toEqual(original);
      expect(cloned.users).not.toBe(original.users);
      expect(cloned.users[0]).not.toBe(original.users[0]);
      expect(cloned.users[0].preferences).not.toBe(
        original.users[0].preferences,
      );
      expect(cloned.settings.notifications).not.toBe(
        original.settings.notifications,
      );
      expect(cloned.settings.security.allowedIPs).not.toBe(
        original.settings.security.allowedIPs,
      );

      // Modify deeply nested values
      cloned.users[0].name = 'Carol';
      cloned.settings.notifications.push('sms');
      cloned.settings.security.allowedIPs[0] = '172.16.0.1';

      expect(original.users[0].name).toBe('Alice');
      expect(original.settings.notifications).toEqual(['email', 'push']);
      expect(original.settings.security.allowedIPs[0]).toBe('192.168.1.1');
    });

    it('#04.1.07 => should clone objects with numeric and string keys', () => {
      const original = {
        '0': 'zero',
        1: 'one',
        name: 'test',
        nested: {
          '2': 'two',
          value: 42,
        },
      };

      const cloned = commons.clone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.nested).not.toBe(original.nested);

      // Test all key types
      expect(cloned['0']).toBe('zero');
      expect(cloned[1]).toBe('one');
      expect(cloned.name).toBe('test');
      expect(cloned.nested['2']).toBe('two');
      expect(cloned.nested.value).toBe(42);
    });

    it('#04.1.08 => should handle objects with primitive special values', () => {
      const original = {
        number: {
          positive: 42,
          negative: -17,
          zero: 0,
          float: 3.14,
          infinity: Infinity,
          negativeInfinity: -Infinity,
          nan: NaN,
        },
        strings: {
          empty: '',
          normal: 'hello',
          withSpaces: 'hello world',
        },
        booleans: {
          truthy: true,
          falsy: false,
        },
        nullish: {
          nullValue: null,
          undefinedValue: undefined,
        },
      };

      const cloned = commons.clone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);

      // Special values should be cloned correctly
      const typedCloned = cloned as typeof original;
      expect(typedCloned.number.positive).toBe(42);
      expect(typedCloned.number.negative).toBe(-17);
      expect(typedCloned.number.zero).toBe(0);
      expect(typedCloned.number.float).toBe(3.14);
      expect(typedCloned.number.infinity).toBe(Infinity);
      expect(typedCloned.number.negativeInfinity).toBe(-Infinity);
      expect(typedCloned.number.nan).toBe(NaN);
      expect(typedCloned.strings.empty).toBe('');
      expect(typedCloned.strings.normal).toBe('hello');
      expect(typedCloned.booleans.truthy).toBe(true);
      expect(typedCloned.booleans.falsy).toBe(false);
      expect(typedCloned.nullish.nullValue).toBeNull();
      expect(typedCloned.nullish.undefinedValue).toBeUndefined();
    });

    it('#04.1.09 => should clone objects with circular references safely', () => {
      const original: any = {
        name: 'root',
        child: {
          name: 'child',
          value: 42,
        },
      };

      // Create circular reference
      original.child.parent = original;

      // Should not throw an error and should handle circular references
      expect(() => {
        const cloned = commons.clone(original);
        expect(cloned.name).toBe('root');
        expect(cloned.child.name).toBe('child');
        expect(cloned.child.value).toBe(42);
      }).not.toThrow();
    });

    it('#04.1.10 => should preserve object property descriptors for simple cases', () => {
      const original = {
        normal: 'value',
        nested: {
          deep: 'content',
        },
      };

      const cloned = commons.clone(original);

      expect(cloned).toEqual(original);
      expect(Object.getOwnPropertyDescriptor(cloned, 'normal')).toEqual(
        Object.getOwnPropertyDescriptor(original, 'normal'),
      );
      expect(
        Object.getOwnPropertyDescriptor(cloned.nested, 'deep'),
      ).toEqual(Object.getOwnPropertyDescriptor(original.nested, 'deep'));
    });

    it('#04.1.11 => should handle large nested structures', () => {
      const createNestedObject = (depth: number): any => {
        if (depth === 0) return { value: 'leaf' };
        return {
          level: depth,
          data: [1, 2, 3],
          child: createNestedObject(depth - 1),
        };
      };

      const original = createNestedObject(5);
      const cloned = commons.clone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);

      // Check deep nesting is properly cloned
      let originalPtr = original;
      let clonedPtr = cloned;

      for (let i = 5; i > 0; i--) {
        expect(clonedPtr.level).toBe(i);
        expect(clonedPtr.data).not.toBe(originalPtr.data);
        expect(clonedPtr.child).not.toBe(originalPtr.child);

        originalPtr = originalPtr.child;
        clonedPtr = clonedPtr.child;
      }

      expect(clonedPtr.value).toBe('leaf');
    });

    it('#04.1.12 => should work with TypeScript interfaces', () => {
      type User = {
        id: number;
        profile: {
          name: string;
          settings: {
            theme: 'light' | 'dark';
            notifications: boolean;
          };
        };
        tags: string[];
      };

      const original: User = {
        id: 1,
        profile: {
          name: 'John Doe',
          settings: {
            theme: 'dark',
            notifications: true,
          },
        },
        tags: ['admin', 'user'],
      };

      const cloned = commons.clone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.profile).not.toBe(original.profile);
      expect(cloned.profile.settings).not.toBe(original.profile.settings);
      expect(cloned.tags).not.toBe(original.tags);

      // Type safety should be preserved
      expect(cloned.id).toBe(1);
      expect(cloned.profile.name).toBe('John Doe');
      expect(cloned.profile.settings.theme).toBe('dark');
      expect(cloned.profile.settings.notifications).toBe(true);
      expect(cloned.tags).toEqual(['admin', 'user']);
    });
  });

  describe('#05 => All "is" functions', () => {
    describe('#05.01 => commons.isDefined function', () => {
      const isDefined = commons.isDefined;

      it('#05.01.01 => should return true for defined values', () => {
        expect(isDefined('test')).toBe(true);
        expect(isDefined(123)).toBe(true);
        expect(isDefined(true)).toBe(true);
        expect(isDefined(false)).toBe(true);
        expect(isDefined(0)).toBe(true);
        expect(isDefined('')).toBe(true);
        expect(isDefined({})).toBe(true);
        expect(isDefined([])).toBe(true);
      });

      it('#05.01.02 => should return false for undefined', () => {
        expect(isDefined(undefined)).toBe(false);
      });

      it('#05.01.03 => should return false for null', () => {
        expect(isDefined(null)).toBe(false);
      });
    });

    describe('#05.02 => commons.isUndefined function', () => {
      const isUndefined = commons.isUndefined;

      it('#05.02.01 => should return true for undefined', () => {
        expect(isUndefined(undefined)).toBe(true);
      });

      it('#05.02.02 => should return false for null', () => {
        expect(isUndefined(null)).toBe(false);
      });

      it('#05.02.03 => should return false for defined values', () => {
        expect(isUndefined('test')).toBe(false);
        expect(isUndefined(123)).toBe(false);
        expect(isUndefined(true)).toBe(false);
        expect(isUndefined(false)).toBe(false);
        expect(isUndefined(0)).toBe(false);
        expect(isUndefined('')).toBe(false);
        expect(isUndefined({})).toBe(false);
        expect(isUndefined([])).toBe(false);
      });
    });

    describe('#05.03 => commons.isNull function', () => {
      const isNull = commons.isNull;

      it('#05.03.01 => should return true for null', () => {
        expect(isNull(null)).toBe(true);
      });

      it('#05.03.02 => should return false for undefined', () => {
        expect(isNull(undefined)).toBe(false);
      });

      it('#05.03.03 => should return false for defined values', () => {
        expect(isNull('test')).toBe(false);
        expect(isNull(123)).toBe(false);
        expect(isNull(true)).toBe(false);
        expect(isNull(false)).toBe(false);
        expect(isNull(0)).toBe(false);
        expect(isNull('')).toBe(false);
        expect(isNull({})).toBe(false);
        expect(isNull([])).toBe(false);
      });
    });

    describe('#05.04 => primitive.is function', () => {
      const isPrimitive = commons.primitive.is;

      it('#05.04.01 => for string', () => {
        expect(isPrimitive('test')).toBe(true);
      });

      it('#05.04.02 => for number', () => {
        expect(isPrimitive(123)).toBe(true);
      });

      it('#05.04.03 => for boolean', () => {
        expect(isPrimitive(true)).toBe(true);
      });

      it('#05.04.04 => for null', () => {
        expect(isPrimitive(null)).toBe(true);
      });

      it('#05.04.05 => for undefined', () => {
        expect(isPrimitive(undefined)).toBe(true);
      });

      it('#05.04.06 => should return false for non-primitive values', () => {
        expect(isPrimitive({})).toBe(false);
        expect(isPrimitive([])).toBe(false);
        expect(isPrimitive(new Date())).toBe(false);
        expect(isPrimitive(Symbol('test'))).toBe(false);
        expect(isPrimitive(() => {})).toBe(false);
      });
    });

    describe('#05.05 => primitiveObject.is function', () => {
      const isPrimitiveObject = commons.primitiveObject.is;

      it('#05.05.01 => should return true for primitive objects', () => {
        expect(isPrimitiveObject({ a: 1, b: 'test' })).toBe(true);
        expect(
          isPrimitiveObject({ num: 42, str: 'hello', bool: true }),
        ).toBe(true);
        expect(isPrimitiveObject({ nested: { value: 'test' } })).toBe(
          true,
        );
      });

      it('#05.05.02 => should return true for primitive arrays', () => {
        expect(isPrimitiveObject([1, 2, 3])).toBe(true);
        expect(isPrimitiveObject(['a', 'b', 'c'])).toBe(true);
        expect(isPrimitiveObject([true, false])).toBe(true);
      });

      it('#05.05.03 => should return true for primitive values', () => {
        expect(isPrimitiveObject('string')).toBe(true);
        expect(isPrimitiveObject(42)).toBe(true);
        expect(isPrimitiveObject(true)).toBe(true);
        expect(isPrimitiveObject(null)).toBe(true);
        expect(isPrimitiveObject(undefined)).toBe(true);
      });

      it('#05.05.04 => should return false for non-primitive objects', () => {
        expect(isPrimitiveObject({ date: new Date() })).toBe(false);
        expect(isPrimitiveObject({ func: () => {} })).toBe(false);
        expect(isPrimitiveObject({ symbol: Symbol('test') })).toBe(false);
      });

      it('#05.05.05 => should return false for non-primitive arrays', () => {
        expect(isPrimitiveObject([new Date()])).toBe(false);
        expect(isPrimitiveObject([() => {}])).toBe(false);
        expect(isPrimitiveObject([Symbol('test')])).toBe(false);
      });

      it('#05.05.06 => should return false for mixed primitive/non-primitive objects', () => {
        expect(isPrimitiveObject({ a: 1, b: new Date() })).toBe(false);
        expect(
          isPrimitiveObject({ valid: 'test', invalid: () => {} }),
        ).toBe(false);
      });
    });

    describe('#05.06 => symbol.is function', () => {
      const isSymbol = commons.symbol.is;

      it('#05.06.01 => should return true for Symbol values', () => {
        expect(isSymbol(Symbol('test'))).toBe(true);
      });

      it('#05.06.02 => should return false for string values', () => {
        expect(isSymbol('test')).toBe(false);
      });

      it('#05.06.03 => should return false for other types', () => {
        expect(isSymbol(123)).toBe(false);
        expect(isSymbol(true)).toBe(false);
        expect(isSymbol(null)).toBe(false);
        expect(isSymbol(undefined)).toBe(false);
        expect(isSymbol({})).toBe(false);
        expect(isSymbol([])).toBe(false);
        expect(isSymbol(new Date())).toBe(false);
      });
    });

    describe('#05.07 => date.is function', () => {
      const isDate = commons.date.is;

      it('#05.07.01 => should return true for Date objects', () => {
        expect(isDate(new Date())).toBe(true);
        expect(isDate(new Date('2023-01-01'))).toBe(true);
      });

      it('#05.07.02 => should return false for date strings', () => {
        expect(isDate('2023-01-01')).toBe(false);
        expect(isDate('January 1, 2023')).toBe(false);
      });

      it('#05.07.03 => should return false for other types', () => {
        expect(isDate(123)).toBe(false);
        expect(isDate(true)).toBe(false);
        expect(isDate(null)).toBe(false);
        expect(isDate(undefined)).toBe(false);
        expect(isDate({})).toBe(false);
        expect(isDate([])).toBe(false);
        expect(isDate(Symbol('test'))).toBe(false);
      });
    });

    describe('#05.08 => function main and subfunctions', () => {
      const testFn = (x: number, y: number) => x + y;
      const testAsyncFn = async (x: number) => x * 2;
      const testVoidFn = () => {};

      describe('#05.08.01 => commons.function main function', () => {
        it('#05.08.01.01 => should return the same function', () => {
          const result = commons.function(testFn);
          expect(result).toBe(testFn);
          expect(result(5, 3)).toBe(8);
        });

        it('#05.08.01.02 => should work with arrow functions', () => {
          const arrowFn = (x: string) => x.toUpperCase();
          const result = commons.function(arrowFn);
          expect(result).toBe(arrowFn);
          expect(result('hello')).toBe('HELLO');
        });

        it('#05.08.01.03 => should work with async functions', async () => {
          const result = commons.function(testAsyncFn);
          expect(result).toBe(testAsyncFn);
          await expect(result(5)).resolves.toBe(10);
        });

        it('#05.08.01.04 => should work with void functions', () => {
          const result = commons.function(testVoidFn);
          expect(result).toBe(testVoidFn);
          expect(result()).toBeUndefined();
        });

        it('#05.08.01.05 => should work with constructor functions', () => {
          function TestConstructor(this: any, value: number) {
            this.value = value;
          }
          const result = commons.function(TestConstructor);
          expect(result).toBe(TestConstructor);
        });
      });

      describe('#05.08.02 => commons.function.is', () => {
        it('#05.08.02.01 => should return true for regular functions', () => {
          expect(commons.function.is(testFn)).toBe(true);
        });

        it('#05.08.02.02 => should return true for arrow functions', () => {
          const arrowFn = () => {};
          expect(commons.function.is(arrowFn)).toBe(true);
        });

        it('#05.08.02.03 => should return true for async functions', () => {
          expect(commons.function.is(testAsyncFn)).toBe(true);
        });

        it('#05.08.02.04 => should return true for constructor functions', () => {
          function TestConstructor() {}
          expect(commons.function.is(TestConstructor)).toBe(true);
        });

        it('#05.08.02.05 => should return true for built-in functions', () => {
          expect(commons.function.is(Math.max)).toBe(true);
          expect(commons.function.is(console.log)).toBe(true);
          expect(commons.function.is(Array.isArray)).toBe(true);
        });

        it('#05.08.02.06 => should return false for non-function values', () => {
          expect(commons.function.is('string')).toBe(false);
          expect(commons.function.is(123)).toBe(false);
          expect(commons.function.is(true)).toBe(false);
          expect(commons.function.is(null)).toBe(false);
          expect(commons.function.is(undefined)).toBe(false);
          expect(commons.function.is({})).toBe(false);
          expect(commons.function.is([])).toBe(false);
          expect(commons.function.is(new Date())).toBe(false);
          expect(commons.function.is(Symbol('test'))).toBe(false);
        });
      });

      describe('#05.08.03 => commons.function.is.strict', () => {
        it('#05.08.03.01 => should work with type guard functions', () => {
          const isString = (value: unknown): value is string =>
            typeof value === 'string';
          const validator = commons.function.is.strict(isString);

          // Since isString function validates strings, not functions, it should return false for functions
          expect(validator(isString)).toBe(false);
          expect(validator(testFn)).toBe(false);

          // But it should work correctly for functions that pass the validation
          const alwaysTrue = () => true;
          const validator2 = commons.function.is.strict(alwaysTrue);
          expect(validator2(testFn)).toBe(true);
        });

        it('#05.08.03.02 => should work with simple boolean functions', () => {
          const isNumberFunction = (fn: unknown) =>
            typeof fn === 'function' && fn.length === 1;
          const validator = commons.function.is.strict(isNumberFunction);

          const singleParamFn = (x: number) => x;
          const multiParamFn = (x: number, y: number) => x + y;

          expect(validator(singleParamFn)).toBe(true);
          expect(validator(multiParamFn)).toBe(false);
        });

        it('#05.08.03.03 => should work with complex validation functions', () => {
          const isAddFunction = (fn: unknown) =>
            typeof fn === 'function' &&
            fn.length === 2 &&
            fn.name === 'add';

          const validator = commons.function.is.strict(isAddFunction);

          function add(x: number, y: number) {
            return x + y;
          }
          function multiply(x: number, y: number) {
            return x * y;
          }

          expect(validator(add)).toBe(true);
          expect(validator(multiply)).toBe(false);
        });

        it('#05.08.03.04 => should reject non-functions', () => {
          const isAnyFunction = () => true;
          const validator = commons.function.is.strict(isAnyFunction);

          expect(validator('string')).toBe(false);
          expect(validator(123)).toBe(false);
          expect(validator({})).toBe(false);
          expect(validator([])).toBe(false);
          expect(validator(null)).toBe(false);
          expect(validator(undefined)).toBe(false);
        });

        it('#05.08.03.05 => should work with async function validation', () => {
          const isAsyncFunction = (fn: unknown) =>
            typeof fn === 'function' &&
            fn.constructor.name === 'AsyncFunction';

          const validator = commons.function.is.strict(isAsyncFunction);

          expect(validator(testAsyncFn)).toBe(true);
          expect(validator(testFn)).toBe(false);
        });
      });

      describe('#05.08.04 => commons.function.forceCast', () => {
        it('#05.08.04.01 => should force cast any value to function type', () => {
          const notAFunction = 'not a function';
          const result = commons.function.forceCast(notAFunction);

          // Type assertion, but the value is still the original
          expect(result).toBe(notAFunction);
        });

        it('#05.08.04.02 => should work with actual functions', () => {
          const actualFunction = (x: number) => x * 2;
          const result = commons.function.forceCast(actualFunction);

          expect(result).toBe(actualFunction);
          expect(result(5)).toBe(10);
        });

        it('#05.08.04.03 => should work with null and undefined', () => {
          const nullResult = commons.function.forceCast(null);
          const undefinedResult = commons.function.forceCast(undefined);

          expect(nullResult).toBeNull();
          expect(undefinedResult).toBeUndefined();
        });
      });

      describe('#05.08.05 => commons.function.dynamic', () => {
        it('#05.08.05.01 => should return the same function with preserved type', () => {
          const specificFn = (x: number, y: string) => `${x}-${y}`;
          const result = commons.function.dynamic(specificFn);

          expect(result).toBe(specificFn);
          expect(result(42, 'test')).toBe('42-test');
        });

        it('#05.08.05.02 => should work with arrow functions', () => {
          const arrowFn = (x: string) => x.split('').reverse().join('');
          const result = commons.function.dynamic(arrowFn);

          expect(result).toBe(arrowFn);
          expect(result('hello')).toBe('olleh');
        });

        it('#05.08.05.03 => should work with async functions', async () => {
          const asyncFn = async (x: number) => {
            await new Promise(resolve => setTimeout(resolve, 1));
            return x * 3;
          };
          const result = commons.function.dynamic(asyncFn);

          expect(result).toBe(asyncFn);
          await expect(result(5)).resolves.toBe(15);
        });

        it('#05.08.05.04 => should work with void functions', () => {
          let sideEffect = 0;
          const voidFn = () => {
            sideEffect += 1;
          };
          const result = commons.function.dynamic(voidFn);

          expect(result).toBe(voidFn);
          result();
          expect(sideEffect).toBe(1);
        });
      });

      describe('#05.08.06 => commons.function.checker', () => {
        it('#05.08.06.01 => should work as a type guard checker', () => {
          const isString = (value: unknown): value is string =>
            typeof value === 'string';
          const result = commons.function.checker(isString);

          expect(result).toBe(isString);
          expect(result('test')).toBe(true);
          expect(result(123)).toBe(false);
        });

        it('#05.08.06.02 => should work with simple boolean checkers', () => {
          const isEven = (value: unknown) =>
            typeof value === 'number' && value % 2 === 0;
          const result = commons.function.checker(isEven);

          expect(result).toBe(isEven);
          expect(result(2)).toBe(true);
          expect(result(3)).toBe(false);
          expect(result('test')).toBe(false);
        });

        it('#05.08.06.03 => should work with complex validation checkers', () => {
          const isPositiveNumber = (value: unknown) =>
            typeof value === 'number' && !isNaN(value) && value > 0;

          const result = commons.function.checker(isPositiveNumber);

          expect(result).toBe(isPositiveNumber);
          expect(result(5)).toBe(true);
          expect(result(-5)).toBe(false);
          expect(result(0)).toBe(false);
          expect(result(NaN)).toBe(false);
          expect(result('5')).toBe(false);
        });

        it('#05.08.06.04 => should work with object validation checkers', () => {
          const hasIdProperty = (value: unknown) =>
            typeof value === 'object' && value !== null && 'id' in value;

          const result = commons.function.checker(hasIdProperty);

          expect(result).toBe(hasIdProperty);
          expect(result({ id: 1 })).toBe(true);
          expect(result({ name: 'test' })).toBe(false);
          expect(result(null)).toBe(false);
          expect(result(undefined)).toBe(false);
        });

        it('#05.08.06.05 => should work with array validation checkers', () => {
          const isNonEmptyArray = (value: unknown) =>
            Array.isArray(value) && value.length > 0;

          const result = commons.function.checker(isNonEmptyArray);

          expect(result).toBe(isNonEmptyArray);
          expect(result([1, 2, 3])).toBe(true);
          expect(result([])).toBe(false);
          expect(result('not array')).toBe(false);
        });
      });

      describe('#05.08.07 => commons.function.checker.is', () => {
        it('#05.08.07.01 => should return true for functions with one parameter', () => {
          const singleParamFn = (value: unknown) =>
            typeof value === 'string';
          const result = commons.function.checker.is(singleParamFn);
          expect(result).toBe(true);
        });

        it('#05.08.07.02 => should return true for type guard functions', () => {
          const isString = (value: unknown): value is string =>
            typeof value === 'string';
          const result = commons.function.checker.is(isString);
          expect(result).toBe(true);
        });

        it('#05.08.07.03 => should return true for arrow functions with one parameter', () => {
          const arrowChecker = (x: any) => x != null;
          const result = commons.function.checker.is(arrowChecker);
          expect(result).toBe(true);
        });

        it('#05.08.07.04 => should return true for anonymous functions with one parameter', () => {
          const result = commons.function.checker.is(function (
            value: unknown,
          ) {
            return typeof value === 'number';
          });
          expect(result).toBe(true);
        });

        it('#05.08.07.05 => should return true for built-in functions with one parameter', () => {
          const result = commons.function.checker.is(Array.isArray);
          expect(result).toBe(true);
        });

        it('#05.08.07.06 => should return false for functions with zero parameters', () => {
          const noParamFn = () => true;
          const result = commons.function.checker.is(noParamFn);
          expect(result).toBe(false);
        });

        it('#05.08.07.07 => should return false for functions with multiple parameters', () => {
          const multiParamFn = (a: unknown, b: unknown) => a === b;
          const result = commons.function.checker.is(multiParamFn);
          expect(result).toBe(false);
        });

        it('#05.08.07.08 => should return false for functions with two parameters', () => {
          const twoParamFn = (value: unknown, context: any) => {
            void value;
            void context;
            return true;
          };
          const result = commons.function.checker.is(twoParamFn);
          expect(result).toBe(false);
        });

        it('#05.08.07.09 => should return false for functions with three parameters', () => {
          const threeParamFn = (a: any, b: any, c: any) => {
            void a;
            void b;
            void c;
            return true;
          };
          const result = commons.function.checker.is(threeParamFn);
          expect(result).toBe(false);
        });

        it('#05.08.07.10 => should return false for non-function values', () => {
          expect(commons.function.checker.is('string')).toBe(false);
          expect(commons.function.checker.is(123)).toBe(false);
          expect(commons.function.checker.is(true)).toBe(false);
          expect(commons.function.checker.is(null)).toBe(false);
          expect(commons.function.checker.is(undefined)).toBe(false);
          expect(commons.function.checker.is({})).toBe(false);
          expect(commons.function.checker.is([])).toBe(false);
          expect(commons.function.checker.is(new Date())).toBe(false);
          expect(commons.function.checker.is(Symbol('test'))).toBe(false);
        });

        it('#05.08.07.11 => should return false for class constructors', () => {
          class TestClass {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            constructor(_: string) {}
          }
          const result = commons.function.checker.is(TestClass);
          expect(result).toBe(false); // Constructor has 1 param but .length might be different
        });

        it('#05.08.07.12 => should return false for functions with default parameters', () => {
          const defaultParamFn = (value: unknown = 'default') => value;
          const result = commons.function.checker.is(defaultParamFn);
          expect(result).toBe(false);
        });

        it('#05.08.07.13 => should return false for functions with rest parameters', () => {
          const restParamFn = (...args: unknown[]) => args.length > 0;
          const result = commons.function.checker.is(restParamFn);
          expect(result).toBe(false);
        });

        it('#05.08.07.14 => should return false for async functions with multiple parameters', () => {
          const asyncMultiParamFn = async (a: unknown, b: unknown) =>
            a === b;
          const result = commons.function.checker.is(asyncMultiParamFn);
          expect(result).toBe(false);
        });

        it('#05.08.07.15 => should return true for async functions with one parameter', () => {
          const asyncSingleParamFn = async (value: unknown) =>
            typeof value === 'string';
          const result = commons.function.checker.is(asyncSingleParamFn);
          expect(result).toBe(true);
        });

        it('#05.08.07.16 => should return true for generator functions with one parameter', () => {
          function* generatorFn(value: unknown) {
            yield value;
          }
          const result = commons.function.checker.is(generatorFn);
          expect(result).toBe(true);
        });

        it('#05.08.07.17 => should return false for generator functions with multiple parameters', () => {
          function* generatorFn(a: unknown, b: unknown) {
            yield a;
            yield b;
          }
          const result = commons.function.checker.is(generatorFn);
          expect(result).toBe(false);
        });

        it('#05.08.07.18 => should work with complex type checkers', () => {
          const isValidUser = (value: unknown) => {
            return (
              typeof value === 'object' &&
              value !== null &&
              'name' in value &&
              'id' in value
            );
          };
          const result = commons.function.checker.is(isValidUser);
          expect(result).toBe(true);
        });

        it('#05.08.07.19 => should work with numeric validation checkers', () => {
          const isPositiveInteger = (value: unknown) => {
            return (
              typeof value === 'number' &&
              Number.isInteger(value) &&
              value > 0
            );
          };
          const result = commons.function.checker.is(isPositiveInteger);
          expect(result).toBe(true);
        });

        it('#05.08.07.20 => should work with string validation checkers', () => {
          const isValidEmail = (value: unknown) => {
            return (
              typeof value === 'string' &&
              value.includes('@') &&
              value.includes('.')
            );
          };
          const result = commons.function.checker.is(isValidEmail);
          expect(result).toBe(true);
        });

        it('#05.08.07.21 => should handle functions with destructured parameters', () => {
          const destructuredFn = ({ value }: { value: unknown }) => value;
          const result = commons.function.checker.is(destructuredFn);
          expect(result).toBe(true);
        });

        it('#05.08.07.22 => should handle functions with array destructured parameters', () => {
          const arrayDestructuredFn = ([value]: [unknown]) => value;
          const result = commons.function.checker.is(arrayDestructuredFn);
          expect(result).toBe(true);
        });

        it('#05.08.07.23 => should return false for methods with multiple parameters', () => {
          const obj = {
            method: (a: unknown, b: unknown) => a === b,
          };
          const result = commons.function.checker.is(obj.method);
          expect(result).toBe(false);
        });

        it('#05.08.07.24 => should return true for methods with single parameter', () => {
          const obj = {
            checker: (value: unknown) => typeof value === 'string',
          };
          const result = commons.function.checker.is(obj.checker);
          expect(result).toBe(true);
        });

        it('#05.08.07.25 => should work with bound functions', () => {
          const originalFn = function (this: any, value: unknown) {
            return this.prefix + value;
          };
          const boundFn = originalFn.bind({ prefix: 'test: ' });
          const result = commons.function.checker.is(boundFn);
          expect(result).toBe(true);
        });
      });
    });
  });
});
