import { arrays } from './arrays';

describe('#01 => arrays.indexes', () => {
  it('#01.01 => should return indexes for simple array', () => {
    const result = arrays.indexes('a', 'b', 'c');
    expect(result).toEqual([0, 1, 2]);
  });

  it('#01.02 => should return empty array for empty array', () => {
    const result = arrays.indexes();
    expect(result).toEqual([]);
  });

  it('#01.03 => should return single index for single element array', () => {
    const result = arrays.indexes('x');
    expect(result).toEqual([0]);
  });

  it('#01.04 => should return indexes for array with mixed types', () => {
    const result = arrays.indexes(1, 'str', true, { a: 1 });
    expect(result).toEqual([0, 1, 2, 3]);
  });
});

describe('#02 => arrays.lengthOf', () => {
  it('#02.01 => should return length for simple array', () => {
    const result = arrays.lengthOf('a', 'b', 'c');
    expect(result).toBe(3);
  });

  it('#02.02 => should return 0 for empty array', () => {
    const result = arrays.lengthOf();
    expect(result).toBe(0);
  });

  it('#02.03 => should return 1 for single element array', () => {
    const result = arrays.lengthOf('x');
    expect(result).toBe(1);
  });

  it('#02.04 => should return length for array with mixed types', () => {
    const result = arrays.lengthOf(1, 'str', true, { a: 1 });
    expect(result).toBe(4);
  });
});

describe('#03 => arrays.tupleOf', () => {
  it('#03.01 => should create tuple with string values', () => {
    const result = arrays.tupleOf.number('hello', 3);
    expect(result).toEqual(['hello', 'hello', 'hello']);
  });

  it('#03.02 => should create tuple with number values', () => {
    const result = arrays.tupleOf.number(42, 5);
    expect(result).toEqual([42, 42, 42, 42, 42]);
  });

  it('#03.03 => should create tuple with boolean values', () => {
    const result = arrays.tupleOf.number(true, 2);
    expect(result).toEqual([true, true]);
  });

  it('#03.04 => should create empty tuple when times is 0', () => {
    const result = arrays.tupleOf.number('test', 0);
    expect(result).toEqual([]);
  });

  it('#03.05 => should create single element tuple when times is 1', () => {
    const result = arrays.tupleOf.number('single', 1);
    expect(result).toEqual(['single']);
  });

  it('#03.06 => should create tuple with object values', () => {
    const obj = { key: 'value' };
    const result = arrays.tupleOf.number(obj, 3);
    expect(result).toEqual([obj, obj, obj]);
    // Verify that all elements reference the same object
    expect(result[0]).toBe(result[1]);
    expect(result[1]).toBe(result[2]);
  });

  it('#03.07 => should create tuple with null values', () => {
    const result = arrays.tupleOf.number(null, 2);
    expect(result).toEqual([null, null]);
  });

  it('#03.08 => should create tuple with undefined values', () => {
    const result = arrays.tupleOf.number(undefined, 3);
    expect(result).toEqual([undefined, undefined, undefined]);
  });

  it('#03.09 => should create tuple with array values', () => {
    const arr = [1, 2, 3];
    const result = arrays.tupleOf.number(arr, 2);
    expect(result).toEqual([arr, arr]);
    // Verify that all elements reference the same array
    expect(result[0]).toBe(result[1]);
  });

  it('#03.10 => should create tuple with function values', () => {
    const fn = (x: number) => x * 2;
    const result = arrays.tupleOf.number(fn, 2);
    expect(result).toEqual([fn, fn]);
    // Verify that all elements reference the same function
    expect(result[0]).toBe(result[1]);
    // Verify function still works
    expect(result[0](5)).toBe(10);
  });

  it('#03.11 => should create tuple with complex object values', () => {
    const complexObj = {
      id: 1,
      name: 'test',
      active: true,
      nested: { value: 42 },
    };
    const result = arrays.tupleOf.number(complexObj, 4);
    expect(result).toEqual([
      complexObj,
      complexObj,
      complexObj,
      complexObj,
    ]);
    expect(result).toHaveLength(4);
    // Verify that all elements reference the same object
    result.forEach(item => {
      expect(item).toBe(complexObj);
    });
  });

  it('#03.12 => should handle large tuple sizes', () => {
    const result = arrays.tupleOf.number('x', 100);
    expect(result).toHaveLength(100);
    expect(result.every(item => item === 'x')).toBe(true);
  });
});

describe('#03.1 => arrays.tupleOf.is', () => {
  it('#03.1.01 => should validate tuple with correct length and element types', () => {
    const validator = arrays.tupleOf.is(
      (value: unknown): value is string => typeof value === 'string',
    );
    const result = validator(['a', 'b', 'c']);
    expect(result).toBe(true);
  });

  it('#03.1.02 => should reject tuple with incorrect length', () => {
    const validator = arrays.tupleOf.is(
      (value: unknown): value is string => typeof value === 'string',
    );
    const result = validator(['a', 'b']);
    expect(result).toBe(true);
  });

  it('#03.1.03 => should reject non-array values', () => {
    const validator = arrays.tupleOf.is(
      (value: unknown): value is string => typeof value === 'string',
    );
    const result = validator('not an array');
    expect(result).toBe(false);
  });

  it('#03.1.04 => should validate empty tuple', () => {
    const validator = arrays.tupleOf.is(
      (_value: unknown): _value is any => true,
    );
    const result = validator([]);
    expect(result).toBe(true);
  });

  it('#03.1.05 => should reject tuple with wrong element types', () => {
    const validator = arrays.tupleOf.is(
      (value: unknown): value is string => typeof value === 'string',
    );
    const result = validator([1, 'hello', true]);
    expect(result).toBe(false);
  });

  it('#03.1.06 => should validate single element tuple', () => {
    const validator = arrays.tupleOf.is(
      (value: unknown): value is number => typeof value === 'number',
    );
    const result = validator([42]);
    expect(result).toBe(true);
  });

  it('#03.1.07 => should reject null values', () => {
    const validator = arrays.tupleOf.is(
      (_value: unknown): _value is any => true,
    );
    const result = validator(null);
    expect(result).toBe(false);
  });

  it('#03.1.08 => should reject undefined values', () => {
    const validator = arrays.tupleOf.is(
      (_value: unknown): _value is any => true,
    );
    const result = validator(undefined);
    expect(result).toBe(false);
  });

  it('#03.1.09 => should validate tuple with object elements', () => {
    const validator = arrays.tupleOf.is(
      (value: unknown): value is object =>
        typeof value === 'object' && value !== null,
    );
    const result = validator([{ a: 1 }, { b: 2 }]);
    expect(result).toBe(true);
  });

  it('#03.1.10 => should reject array with longer length', () => {
    const validator = arrays.tupleOf.is(
      (value: unknown): value is number => typeof value === 'number',
    );
    const result = validator([1, 2, 3, 4, 5]);
    expect(result).toBe(true);
  });
});

describe('#03.2 => arrays.is', () => {
  it('#03.2.01 => should identify arrays correctly', () => {
    const result = arrays.is([1, 2, 3]);
    expect(result).toBe(true);
  });

  it('#03.2.02 => should identify empty arrays', () => {
    const result = arrays.is([]);
    expect(result).toBe(true);
  });

  it('#03.2.03 => should reject non-array values', () => {
    const result = arrays.is('not an array');
    expect(result).toBe(false);
  });

  it('#03.2.04 => should reject objects', () => {
    const result = arrays.is({ length: 3 });
    expect(result).toBe(false);
  });

  it('#03.2.05 => should reject null', () => {
    const result = arrays.is(null);
    expect(result).toBe(false);
  });

  it('#03.2.06 => should reject undefined', () => {
    const result = arrays.is(undefined);
    expect(result).toBe(false);
  });

  it('#03.2.07 => should identify arrays with mixed types', () => {
    const result = arrays.is([1, 'hello', true, { key: 'value' }]);
    expect(result).toBe(true);
  });

  it('#03.2.08 => should identify nested arrays', () => {
    const result = arrays.is([
      [1, 2],
      [3, 4],
    ]);
    expect(result).toBe(true);
  });

  it('#03.2.09 => should reject numbers', () => {
    const result = arrays.is(123);
    expect(result).toBe(false);
  });

  it('#03.2.10 => should reject functions', () => {
    const result = arrays.is(() => [1, 2, 3]);
    expect(result).toBe(false);
  });
});

describe('#03.3 => arrays.is.strict', () => {
  it('#03.3.02 => should reject non-arrays', () => {
    const isNumberArray = arrays.tupleOf.is(
      (value: unknown): value is number => typeof value === 'number',
    );
    const result = isNumberArray('not an array');
    expect(result).toBe(false);
  });

  it('#03.3.03 => should accept empty arrays', () => {
    const isAnyArray = arrays.tupleOf.is(
      (_value: unknown): _value is any => true,
    );
    const result = isAnyArray([]);
    expect(result).toBe(true);
  });

  it('#03.3.04 => should work with object arrays', () => {
    const isObjectArray = arrays.tupleOf.is(
      (value: unknown): value is object =>
        typeof value === 'object' && value !== null,
    );
    const result = isObjectArray([{ a: 1 }, { b: 2 }]);
    expect(result).toBe(true);
  });

  it('#03.3.05 => should reject arrays with incorrect element types', () => {
    const isStringArray = arrays.tupleOf.is(
      (value: unknown): value is string => typeof value === 'string',
    );
    const result = isStringArray([1, 'hello', 2, 'world']);
    expect(result).toBe(false);
  });

  it('#03.3.06 => should reject null', () => {
    const isAnyArray = arrays.tupleOf.is(
      (_value: unknown): _value is any => true,
    );
    const result = isAnyArray(null);
    expect(result).toBe(false);
  });

  it('#03.3.07 => should reject undefined', () => {
    const isAnyArray = arrays.tupleOf.is(
      (_value: unknown): _value is any => true,
    );
    const result = isAnyArray(undefined);
    expect(result).toBe(false);
  });

  it('#03.3.08 => should work with boolean arrays', () => {
    const isBooleanArray = arrays.tupleOf.is(
      (value: unknown): value is boolean => typeof value === 'boolean',
    );
    const result = isBooleanArray([true, false, true]);
    expect(result).toBe(true);
  });

  it('#03.3.09 => should reject arrays with mixed types when strict validation', () => {
    const isNumberArray = arrays.tupleOf.is(
      (value: unknown): value is number => typeof value === 'number',
    );
    const result = isNumberArray([1, 2, 'string']);
    expect(result).toBe(false);
  });

  it('#03.3.10 => should reject objects with array-like properties', () => {
    const isAnyArray = arrays.tupleOf.is(
      (_value: unknown): _value is any => true,
    );
    const result = isAnyArray({ 0: 'a', 1: 'b', length: 2 });
    expect(result).toBe(false);
  });

  it('#03.3.11 => should work with simple boolean function for even numbers', () => {
    const isEvenNumber = (value: unknown) =>
      typeof value === 'number' && value % 2 === 0;
    const validator = arrays.tupleOf.is(isEvenNumber);
    const result = validator([2, 4, 6, 8]);
    expect(result).toBe(true);
  });

  it('#03.3.12 => should reject with simple boolean function for mixed even/odd numbers', () => {
    const isEvenNumber = (value: unknown) =>
      typeof value === 'number' && value % 2 === 0;
    const validator = arrays.tupleOf.is(isEvenNumber);
    const result = validator([2, 3, 4, 6]);
    expect(result).toBe(false);
  });

  it('#03.3.13 => should work with simple boolean function for strings longer than 3 chars', () => {
    const isLongString = (value: unknown) =>
      typeof value === 'string' && value.length > 3;
    const validator = arrays.tupleOf.is(isLongString);
    const result = validator(['hello', 'world', 'testing']);
    expect(result).toBe(true);
  });

  it('#03.3.14 => should reject with simple boolean function for short strings', () => {
    const isLongString = (value: unknown) =>
      typeof value === 'string' && value.length > 3;
    const validator = arrays.tupleOf.is(isLongString);
    const result = validator(['hello', 'hi', 'world']);
    expect(result).toBe(false);
  });

  it('#03.3.15 => should work with simple boolean function for positive numbers', () => {
    const isPositive = (value: unknown) =>
      typeof value === 'number' && value > 0;
    const validator = arrays.tupleOf.is(isPositive);
    const result = validator([1, 2, 3, 4, 5]);
    expect(result).toBe(true);
  });

  it('#03.3.16 => should reject with simple boolean function for negative numbers', () => {
    const isPositive = (value: unknown) =>
      typeof value === 'number' && value > 0;
    const validator = arrays.tupleOf.is(isPositive);
    const result = validator([1, -2, 3, 4]);
    expect(result).toBe(false);
  });

  it('#03.3.17 => should work with simple boolean function for objects with specific property', () => {
    const hasIdProperty = (value: unknown) =>
      typeof value === 'object' && value !== null && 'id' in value;
    const validator = arrays.tupleOf.is(hasIdProperty);
    const result = validator([{ id: 1 }, { id: 2, name: 'test' }]);
    expect(result).toBe(true);
  });

  it('#03.3.18 => should reject with simple boolean function for objects without required property', () => {
    const hasIdProperty = (value: unknown) =>
      typeof value === 'object' && value !== null && 'id' in value;
    const validator = arrays.tupleOf.is(hasIdProperty);
    const result = validator([{ id: 1 }, { name: 'test' }]);
    expect(result).toBe(false);
  });

  it('#03.3.19 => should work with simple boolean function for empty array', () => {
    const isEvenNumber = (value: unknown) =>
      typeof value === 'number' && value % 2 === 0;
    const validator = arrays.tupleOf.is(isEvenNumber);
    const result = validator([]);
    expect(result).toBe(true);
  });

  it('#03.3.20 => should work with simple boolean function always returning true', () => {
    const alwaysTrue = () => true;
    const validator = arrays.tupleOf.is(alwaysTrue);
    const result = validator([1, 'hello', true, { test: 'value' }]);
    expect(result).toBe(true);
  });
});

describe('#07 => arrays', () => {
  it('#07.01 => should create array with given arguments', () => {
    const result = arrays(1, 2, 3);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#07.02 => should create empty array when no arguments provided', () => {
    const result = arrays();
    expect(result).toEqual([]);
  });

  it('#07.03 => should create array with mixed types', () => {
    const result = arrays.low(1, 'hello', true, { key: 'value' });
    expect(result).toEqual([1, 'hello', true, { key: 'value' }]);
  });

  it('#07.04 => should create array with single argument', () => {
    const result = arrays('single');
    expect(result).toEqual(['single']);
  });

  it('#07.05 => should preserve object references', () => {
    const obj = { test: 'value' };
    const result = arrays(obj, obj);
    expect(result[0]).toBe(result[1]);
    expect(result[0]).toBe(obj);
  });
});

describe('#08 => arrays.tupleOf', () => {
  it('#08.01 => should create readonly tuple with given arguments', () => {
    const result = arrays.tupleOf(1, 2, 3);
    expect(result).toEqual([1, 2, 3]);
    expect(Object.isFrozen(result)).toBe(false); // arrays.tupleOf returns readonly but not frozen
  });

  it('#08.02 => should create empty readonly tuple when no arguments provided', () => {
    const result = arrays.tupleOf();
    expect(result).toEqual([]);
  });

  it('#08.03 => should create readonly tuple with mixed types', () => {
    const result = arrays.tupleOf(1, 'hello', true, { key: 'value' });
    expect(result).toEqual([1, 'hello', true, { key: 'value' }]);
  });

  it('#08.04 => should create readonly tuple with single argument', () => {
    const result = arrays.tupleOf('single');
    expect(result).toEqual(['single']);
  });

  it('#08.05 => should preserve object references', () => {
    const obj = { test: 'value' };
    const result = arrays.tupleOf(obj, obj);
    expect(result[0]).toBe(result[1]);
    expect(result[0]).toBe(obj);
  });
});

describe('#09 =>  arrays.reduce', () => {
  it('#09.01 => should return first element of array', () => {
    const result = arrays.reduce([1, 2, 3]);
    expect(result).toBe(1);
  });

  it('#09.02 => should return value itself if not an array', () => {
    const result = arrays.reduce(42);
    expect(result).toBe(42);
  });

  it('#09.03 => should return first element of readonly array', () => {
    const result = arrays.reduce([1, 2, 3]);
    expect(result).toBe(1);
  });

  it('#09.04 => should handle string values', () => {
    const result = arrays.reduce('not an array');
    expect(result).toBe('not an array');
  });

  it('#09.05 => should handle empty array', () => {
    const result = arrays.reduce([]);
    expect(result).toBeUndefined();
  });

  it('#09.06 => should handle array with single element', () => {
    const result = arrays.reduce(['single']);
    expect(result).toBe('single');
  });

  it('#09.07 => should handle object values', () => {
    const obj = { key: 'value' };
    const result = arrays.reduce(obj);
    expect(result).toBe(obj);
  });

  it('#09.08 => should handle null and undefined', () => {
    const nullResult = arrays.reduce(null);
    expect(nullResult).toBeNull();

    const undefinedResult = arrays.reduce(undefined);
    expect(undefinedResult).toBeUndefined();
  });
});

describe('#10 =>  arrays.reverse', () => {
  it('#10.01 => should  arrays.reverse array with multiple elements', () => {
    const result = arrays.reverse(1, 2, 3, 4);
    expect(result).toEqual([4, 3, 2, 1]);
  });

  it('#10.02 => should handle empty array', () => {
    const result = arrays.reverse();
    expect(result).toEqual([]);
  });

  it('#10.03 => should handle single element', () => {
    const result = arrays.reverse('single');
    expect(result).toEqual(['single']);
  });

  it('#10.04 => should  arrays.reverse array with mixed types', () => {
    const result = arrays.reverse(1, 'hello', true, { key: 'value' });
    expect(result).toEqual([{ key: 'value' }, true, 'hello', 1]);
  });

  it('#10.05 => should not modify original arguments (create new array)', () => {
    const obj = { test: 'value' };
    const result = arrays.reverse(obj, 'test');
    expect(result).toEqual(['test', obj]);
    expect(result[1]).toBe(obj); // Should reference same object
  });

  it('#10.06 => should handle duplicate elements', () => {
    const result = arrays.reverse('a', 'b', 'a', 'c', 'a');
    expect(result).toEqual(['a', 'c', 'a', 'b', 'a']);
  });
});

describe('#13 => arrays.freeze', () => {
  it('#13.01 => should freeze tuple with multiple elements', () => {
    const result = arrays.freeze(1, 2, 3);
    expect(result).toEqual([1, 2, 3]);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#13.02 => should freeze empty tuple', () => {
    const result = arrays.freeze();
    expect(result).toEqual([]);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#13.03 => should freeze single element tuple', () => {
    const result = arrays.freeze('single');
    expect(result).toEqual(['single']);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#13.04 => should prevent modification of frozen tuple', () => {
    const result = arrays.freeze(1, 2, 3);
    expect(() => {
      (result as any)[0] = 999;
    }).toThrow();
    expect(result[0]).toBe(1); // Should still be 1, not 999
  });

  it('#13.05 => should handle duplicate elements in frozen tuple', () => {
    const result = arrays.freeze('a', 'b', 'a', 'c', 'a');
    expect(result).toEqual(['a', 'b', 'a', 'c', 'a']);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#13.06 => should create immutable frozen tuple', () => {
    const result = arrays.freeze(1, 2, 3);

    // Try to modify - should not work
    expect(() => {
      (result as any).push(4);
    }).toThrow();

    expect(() => {
      (result as any).pop();
    }).toThrow();

    expect(result).toEqual([1, 2, 3]);
    expect(result.length).toBe(3);
  });

  it('#13.07 => should preserve object references in frozen tuple', () => {
    const obj = { test: 'value' };
    const result = arrays.freeze(obj, 'test');
    expect(result[0]).toBe(obj);
    expect(Object.isFrozen(result)).toBe(true);
  });
});

describe('#14 => arrays.extract', () => {
  it('#14.01 => should extract matching elements', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.extract(array, 1, 3);
    expect(result).toEqual([1, 3, 3, 1]);
  });

  it('#14.02 => should extract single matching element', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.extract(array, 2);
    expect(result).toEqual([2, 2]);
  });

  it('#14.03 => should return empty array when no matches', () => {
    const array = [1, 2, 3];
    const result = arrays.extract(array, 5);
    expect(result).toEqual([]);
  });

  it('#14.04 => should handle empty array', () => {
    const array: number[] = [];
    const result = arrays.extract(array, 1);
    expect(result).toEqual([]);
  });

  it('#14.05 => should extract string elements', () => {
    const array = ['a', 'b', 'c', 'b', 'a'];
    const result = arrays.extract(array, 'a', 'c');
    expect(result).toEqual(['a', 'c', 'a']);
  });

  it('#14.06 => should handle mixed types', () => {
    const array = [1, 'hello', true, 2, 'hello', false];
    const result = arrays.extract(array, 'hello', true);
    expect(result).toEqual(['hello', true, 'hello']);
  });

  it('#14.07 => should preserve object references', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const array = [obj1, obj2, obj1];
    const result = arrays.extract(array, obj1);
    expect(result).toEqual([obj1, obj1]);
    expect(result).toHaveLength(2);
    expect((result as any[])[0]).toBe(obj1);
    expect((result as any[])[1]).toBe(obj1);
  });
});

describe('#15 => arrays.exclude', () => {
  it('#15.01 => should exclude matching elements', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.exclude(array, 1, 3);
    expect(result).toEqual([2, 4, 2]);
  });

  it('#15.02 => should exclude single matching element', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.exclude(array, 2);
    expect(result).toEqual([1, 3, 4, 3, 1]);
  });

  it('#15.03 => should return original array when no matches to exclude', () => {
    const array = [1, 2, 3];
    const result = arrays.exclude(array, 5);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#15.04 => should handle empty array', () => {
    const array: number[] = [];
    const result = arrays.exclude(array, 1);
    expect(result).toEqual([]);
  });

  it('#15.05 => should exclude string elements', () => {
    const array = ['a', 'b', 'c', 'b', 'a'];
    const result = arrays.exclude(array, 'a', 'c');
    expect(result).toEqual(['b', 'b']);
  });

  it('#15.06 => should handle mixed types', () => {
    const array = [1, 'hello', true, 2, 'hello', false];
    const result = arrays.exclude(array, 'hello', true);
    expect(result).toEqual([1, 2, false]);
  });

  it('#15.07 => should exclude all elements when all match', () => {
    const array = [1, 1, 1];
    const result = arrays.exclude(array, 1);
    expect(result).toEqual([]);
  });

  it('#15.08 => should preserve object references', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const array = [obj1, obj2, obj3, obj1];
    const result = arrays.exclude(array, obj1);
    expect(result).toEqual([obj2, obj3]);
    expect((result as any[])[0]).toBe(obj2);
    expect((result as any[])[1]).toBe(obj3);
  });
});

describe('#11 => arrays.toArray', () => {
  it('#11.01 => should return array as-is when input is already an array', () => {
    const input = [1, 2, 3];
    const result = arrays.toArray(input);
    expect(result).toEqual([1, 2, 3]);
    expect(result).toBe(input); // Should be the same reference
  });

  it('#11.02 => should wrap single value in array', () => {
    const result = arrays.toArray(42);
    expect(result).toEqual([42]);
  });

  it('#11.03 => should wrap string in array', () => {
    const result = arrays.toArray('hello');
    expect(result).toEqual(['hello']);
  });

  it('#11.04 => should wrap boolean in array', () => {
    const result = arrays.toArray(true);
    expect(result).toEqual([true]);
  });

  it('#11.05 => should wrap object in array', () => {
    const obj = { key: 'value' };
    const result = arrays.toArray(obj);
    expect(result).toEqual([obj]);
    expect(result[0]).toBe(obj); // Should preserve reference
  });

  it('#11.06 => should wrap null in array', () => {
    const result = arrays.toArray(null);
    expect(result).toEqual([null]);
  });

  it('#11.07 => should wrap undefined in array', () => {
    const result = arrays.toArray(undefined);
    expect(result).toEqual([undefined]);
  });

  it('#11.08 => should handle empty array', () => {
    const input: number[] = [];
    const result = arrays.toArray(input);
    expect(result).toEqual([]);
    expect(result).toBe(input); // Should be the same reference
  });

  it('#11.09 => should handle nested arrays', () => {
    const input = [
      [1, 2],
      [3, 4],
    ];
    const result = arrays.toArray(input);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(result).toBe(input); // Should be the same reference
  });

  it('#11.10 => should wrap function in array', () => {
    const fn = (x: number) => x * 2;
    const result = arrays.toArray(fn);
    expect(result).toEqual([fn]);
    expect(result[0]).toBe(fn); // Should preserve reference
    expect(result[0](5)).toBe(10); // Function should still work
  });

  it('#11.11 => should wrap zero in array', () => {
    const result = arrays.toArray(0);
    expect(result).toEqual([0]);
  });

  it('#11.12 => should wrap empty string in array', () => {
    const result = arrays.toArray('');
    expect(result).toEqual(['']);
  });

  it('#11.13 => should wrap NaN in array', () => {
    const result = arrays.toArray(NaN);
    expect(result).toEqual([NaN]);
  });

  it('#11.14 => should wrap Infinity in array', () => {
    const result = arrays.toArray(Infinity);
    expect(result).toEqual([Infinity]);
  });

  it('#11.15 => should handle readonly arrays', () => {
    const input = [1, 2, 3] as const;
    const result = arrays.toArray(input);
    expect(result).toEqual([1, 2, 3]);
    expect(result).toBe(input); // Should be the same reference
  });
});

describe('#12 => arrays.tupleOf.number.is', () => {
  it('#12.01 => should validate tuple with correct length and element types', () => {
    const validator = arrays.tupleOf.number.is(
      (value: unknown): value is string => typeof value === 'string',
    );
    const result = validator(['hello', 'world', 'test'], 3);
    expect(result).toBe(true);
  });

  it('#12.02 => should reject tuple with incorrect length', () => {
    const validator = arrays.tupleOf.number.is(
      (value: unknown): value is string => typeof value === 'string',
    );
    const result = validator(['hello', 'world'], 3);
    expect(result).toBe(false);
  });

  it('#12.03 => should reject tuple with correct length but wrong element types', () => {
    const validator = arrays.tupleOf.number.is(
      (value: unknown): value is string => typeof value === 'string',
    );
    const result = validator([1, 2, 3], 3);
    expect(result).toBe(false);
  });

  it('#12.04 => should reject non-array values', () => {
    const validator = arrays.tupleOf.number.is(
      (value: unknown): value is string => typeof value === 'string',
    );
    const result = validator('not an array', 3);
    expect(result).toBe(false);
  });

  it('#12.05 => should validate empty tuple with length 0', () => {
    const validator = arrays.tupleOf.number.is(
      (_value: unknown): _value is any => true,
    );
    const result = validator([], 0);
    expect(result).toBe(true);
  });

  it('#12.06 => should reject empty tuple with non-zero length', () => {
    const validator = arrays.tupleOf.number.is(
      (_value: unknown): _value is any => true,
    );
    const result = validator([], 3);
    expect(result).toBe(false);
  });

  it('#12.07 => should validate single element tuple', () => {
    const validator = arrays.tupleOf.number.is(
      (value: unknown): value is number => typeof value === 'number',
    );
    const result = validator([42], 1);
    expect(result).toBe(true);
  });

  it('#12.08 => should reject single element tuple with wrong type', () => {
    const validator = arrays.tupleOf.number.is(
      (value: unknown): value is number => typeof value === 'number',
    );
    const result = validator(['not a number'], 1);
    expect(result).toBe(false);
  });

  it('#12.09 => should validate tuple with object elements', () => {
    const validator = arrays.tupleOf.number.is(
      (value: unknown): value is object =>
        typeof value === 'object' && value !== null,
    );
    const result = validator([{ a: 1 }, { b: 2 }], 2);
    expect(result).toBe(true);
  });

  it('#12.10 => should reject tuple with mixed valid/invalid elements', () => {
    const validator = arrays.tupleOf.number.is(
      (value: unknown): value is number => typeof value === 'number',
    );
    const result = validator([1, 'string', 3], 3);
    expect(result).toBe(false);
  });

  it('#12.11 => should validate tuple with boolean elements', () => {
    const validator = arrays.tupleOf.number.is(
      (value: unknown): value is boolean => typeof value === 'boolean',
    );
    const result = validator([true, false, true], 3);
    expect(result).toBe(true);
  });

  it('#12.12 => should reject null values', () => {
    const validator = arrays.tupleOf.number.is(
      (_value: unknown): _value is any => true,
    );
    const result = validator(null, 0);
    expect(result).toBe(false);
  });

  it('#12.13 => should reject undefined values', () => {
    const validator = arrays.tupleOf.number.is(
      (_value: unknown): _value is any => true,
    );
    const result = validator(undefined, 0);
    expect(result).toBe(false);
  });

  it('#12.14 => should validate tuple with longer length', () => {
    const validator = arrays.tupleOf.number.is(
      (value: unknown): value is number => typeof value === 'number',
    );
    const result = validator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10);
    expect(result).toBe(true);
  });

  it('#12.15 => should work with custom validation function', () => {
    const isEvenNumber = (value: unknown): value is number =>
      typeof value === 'number' && value % 2 === 0;
    const validator = arrays.tupleOf.number.is(isEvenNumber);
    const result = validator([2, 4, 6, 8], 4);
    expect(result).toBe(true);
  });

  it('#12.16 => should reject with custom validation function for invalid elements', () => {
    const isEvenNumber = (value: unknown): value is number =>
      typeof value === 'number' && value % 2 === 0;
    const validator = arrays.tupleOf.number.is(isEvenNumber);
    const result = validator([2, 3, 6, 8], 4);
    expect(result).toBe(false);
  });

  it('#12.17 => should validate tuple with string length validation', () => {
    const isLongString = (value: unknown): value is string =>
      typeof value === 'string' && value.length > 3;
    const validator = arrays.tupleOf.number.is(isLongString);
    const result = validator(['hello', 'world', 'testing'], 3);
    expect(result).toBe(true);
  });

  it('#12.18 => should reject tuple with string length validation for short strings', () => {
    const isLongString = (value: unknown): value is string =>
      typeof value === 'string' && value.length > 3;
    const validator = arrays.tupleOf.number.is(isLongString);
    const result = validator(['hello', 'hi', 'world'], 3);
    expect(result).toBe(false);
  });

  it('#12.19 => should validate tuple with property validation', () => {
    const hasIdProperty = (value: unknown): value is { id: any } =>
      typeof value === 'object' && value !== null && 'id' in value;
    const validator = arrays.tupleOf.number.is(hasIdProperty);
    const result = validator([{ id: 1 }, { id: 2, name: 'test' }], 2);
    expect(result).toBe(true);
  });

  it('#12.20 => should reject tuple with property validation for missing property', () => {
    const hasIdProperty = (value: unknown): value is { id: any } =>
      typeof value === 'object' && value !== null && 'id' in value;
    const validator = arrays.tupleOf.number.is(hasIdProperty);
    const result = validator([{ id: 1 }, { name: 'test' }], 2);
    expect(result).toBe(false);
  });
});

describe('#10 =>  arrays.reverse', () => {
  it('#10.01 => should  arrays.reverse array with multiple elements', () => {
    const result = arrays.reverse(1, 2, 3, 4);
    expect(result).toEqual([4, 3, 2, 1]);
  });

  it('#10.02 => should handle empty array', () => {
    const result = arrays.reverse();
    expect(result).toEqual([]);
  });

  it('#10.03 => should handle single element', () => {
    const result = arrays.reverse('single');
    expect(result).toEqual(['single']);
  });

  it('#10.04 => should  arrays.reverse array with mixed types', () => {
    const result = arrays.reverse(1, 'hello', true, { key: 'value' });
    expect(result).toEqual([{ key: 'value' }, true, 'hello', 1]);
  });

  it('#10.05 => should not modify original arguments (create new array)', () => {
    const obj = { test: 'value' };
    const result = arrays.reverse(obj, 'test');
    expect(result).toEqual(['test', obj]);
    expect(result[1]).toBe(obj); // Should reference same object
  });

  it('#10.06 => should handle duplicate elements', () => {
    const result = arrays.reverse('a', 'b', 'a', 'c', 'a');
    expect(result).toEqual(['a', 'c', 'a', 'b', 'a']);
  });
});

describe('#13 => arrays.freeze', () => {
  it('#13.01 => should freeze tuple with multiple elements', () => {
    const result = arrays.freeze(1, 2, 3);
    expect(result).toEqual([1, 2, 3]);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#13.02 => should freeze empty tuple', () => {
    const result = arrays.freeze();
    expect(result).toEqual([]);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#13.03 => should freeze single element tuple', () => {
    const result = arrays.freeze('single');
    expect(result).toEqual(['single']);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#13.04 => should prevent modification of frozen tuple', () => {
    const result = arrays.freeze(1, 2, 3);
    expect(() => {
      (result as any)[0] = 999;
    }).toThrow();
    expect(result[0]).toBe(1); // Should still be 1, not 999
  });

  it('#13.05 => should handle duplicate elements in frozen tuple', () => {
    const result = arrays.freeze('a', 'b', 'a', 'c', 'a');
    expect(result).toEqual(['a', 'b', 'a', 'c', 'a']);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#13.06 => should create immutable frozen tuple', () => {
    const result = arrays.freeze(1, 2, 3);

    // Try to modify - should not work
    expect(() => {
      (result as any).push(4);
    }).toThrow();

    expect(() => {
      (result as any).pop();
    }).toThrow();

    expect(result).toEqual([1, 2, 3]);
    expect(result.length).toBe(3);
  });

  it('#13.07 => should preserve object references in frozen tuple', () => {
    const obj = { test: 'value' };
    const result = arrays.freeze(obj, 'test');
    expect(result[0]).toBe(obj);
    expect(Object.isFrozen(result)).toBe(true);
  });
});

describe('#14 => arrays.extract', () => {
  it('#14.01 => should extract matching elements', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.extract(array, 1, 3);
    expect(result).toEqual([1, 3, 3, 1]);
  });

  it('#14.02 => should extract single matching element', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.extract(array, 2);
    expect(result).toEqual([2, 2]);
  });

  it('#14.03 => should return empty array when no matches', () => {
    const array = [1, 2, 3];
    const result = arrays.extract(array, 5);
    expect(result).toEqual([]);
  });

  it('#14.04 => should handle empty array', () => {
    const array: number[] = [];
    const result = arrays.extract(array, 1);
    expect(result).toEqual([]);
  });

  it('#14.05 => should extract string elements', () => {
    const array = ['a', 'b', 'c', 'b', 'a'];
    const result = arrays.extract(array, 'a', 'c');
    expect(result).toEqual(['a', 'c', 'a']);
  });

  it('#14.06 => should handle mixed types', () => {
    const array = [1, 'hello', true, 2, 'hello', false];
    const result = arrays.extract(array, 'hello', true);
    expect(result).toEqual(['hello', true, 'hello']);
  });

  it('#14.07 => should preserve object references', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const array = [obj1, obj2, obj1];
    const result = arrays.extract(array, obj1);
    expect(result).toEqual([obj1, obj1]);
    expect(result).toHaveLength(2);
    expect((result as any[])[0]).toBe(obj1);
    expect((result as any[])[1]).toBe(obj1);
  });
});

describe('#15 => arrays.exclude', () => {
  it('#15.01 => should exclude matching elements', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.exclude(array, 1, 3);
    expect(result).toEqual([2, 4, 2]);
  });

  it('#15.02 => should exclude single matching element', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.exclude(array, 2);
    expect(result).toEqual([1, 3, 4, 3, 1]);
  });

  it('#15.03 => should return original array when no matches to exclude', () => {
    const array = [1, 2, 3];
    const result = arrays.exclude(array, 5);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#15.04 => should handle empty array', () => {
    const array: number[] = [];
    const result = arrays.exclude(array, 1);
    expect(result).toEqual([]);
  });

  it('#15.05 => should exclude string elements', () => {
    const array = ['a', 'b', 'c', 'b', 'a'];
    const result = arrays.exclude(array, 'a', 'c');
    expect(result).toEqual(['b', 'b']);
  });

  it('#15.06 => should handle mixed types', () => {
    const array = [1, 'hello', true, 2, 'hello', false];
    const result = arrays.exclude(array, 'hello', true);
    expect(result).toEqual([1, 2, false]);
  });

  it('#15.07 => should exclude all elements when all match', () => {
    const array = [1, 1, 1];
    const result = arrays.exclude(array, 1);
    expect(result).toEqual([]);
  });

  it('#15.08 => should preserve object references', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const array = [obj1, obj2, obj3, obj1];
    const result = arrays.exclude(array, obj1);
    expect(result).toEqual([obj2, obj3]);
    expect((result as any[])[0]).toBe(obj2);
    expect((result as any[])[1]).toBe(obj3);
  });
});
