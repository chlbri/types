import {
  _unknown,
  castFn,
  castFnBasic,
  commons,
  identity,
} from './commons';

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
      expect(identity(value)).toBe(value);
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
  });
});
