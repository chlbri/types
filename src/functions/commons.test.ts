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
    });
  });
});
