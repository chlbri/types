import { _unknown, castFn, commons, identity } from './commons';

describe('Typings common', () => {
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
    describe('#05.01 => primitive.is function', () => {
      const isPrimitive = commons.primitive.is;

      it('#05.01.01 => for string', () => {
        expect(isPrimitive('test')).toBe(true);
      });

      it('#05.01.02 => for number', () => {
        expect(isPrimitive(123)).toBe(true);
      });

      it('#05.01.03 => for boolean', () => {
        expect(isPrimitive(true)).toBe(true);
      });

      it('#05.01.04 => for null', () => {
        expect(isPrimitive(null)).toBe(true);
      });

      it('#05.01.05 => for undefined', () => {
        expect(isPrimitive(undefined)).toBe(true);
      });

      it('#05.01.06 => should return false for non-primitive values', () => {
        expect(isPrimitive({})).toBe(false);
      });
    });

    describe('#05.02 => symbol.is function', () => {
      const isSymbol = commons.symbol.is;

      it('#05.02.01 => should return true for Symbol values', () => {
        expect(isSymbol(Symbol('test'))).toBe(true);
      });

      it('#05.02.02 => should return false for string values', () => {
        expect(isSymbol('test')).toBe(false);
      });
    });

    describe('#05.03 => date.is function', () => {
      const isDate = commons.date.is;

      it('#05.03.01 => should return true for Date objects', () => {
        expect(isDate(new Date())).toBe(true);
      });

      it('#05.03.02 => should return false for non-Date values', () => {
        expect(isDate('2023-01-01')).toBe(false);
      });
    });
  });
});
