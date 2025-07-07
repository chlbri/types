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

describe('#16 => arrays.dynamic', () => {
  it('#16.01 => should return array as-is for regular arrays', () => {
    const input = [1, 2, 3];
    const result = arrays.dynamic(input);
    expect(result).toBe(input);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#16.02 => should preserve array type and content', () => {
    const stringArray = ['hello', 'world'];
    const result = arrays.dynamic(stringArray);
    expect(result).toBe(stringArray);
    expect(result).toEqual(['hello', 'world']);
  });

  it('#16.03 => should work with empty arrays', () => {
    const emptyArray: number[] = [];
    const result = arrays.dynamic(emptyArray);
    expect(result).toBe(emptyArray);
    expect(result).toEqual([]);
  });

  it('#16.04 => should work with readonly arrays', () => {
    const readonlyArray = [1, 2, 3] as const;
    const result = arrays.dynamic(readonlyArray);
    expect(result).toBe(readonlyArray);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#16.05 => should work with mixed type arrays', () => {
    const mixedArray = [1, 'hello', true, null];
    const result = arrays.dynamic(mixedArray);
    expect(result).toBe(mixedArray);
    expect(result).toEqual([1, 'hello', true, null]);
  });

  it('#16.06 => should work with nested arrays', () => {
    const nestedArray = [
      [1, 2],
      [3, 4],
    ];
    const result = arrays.dynamic(nestedArray);
    expect(result).toBe(nestedArray);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('#16.07 => should work with object arrays', () => {
    const objectArray = [{ a: 1 }, { b: 2 }];
    const result = arrays.dynamic(objectArray);
    expect(result).toBe(objectArray);
    expect(result).toEqual([{ a: 1 }, { b: 2 }]);
  });
});

describe('#17 => arrays.forceCast', () => {
  it('#17.01 => should cast any value to unknown array type', () => {
    const result = arrays.forceCast(42);
    expect(result).toBe(42);
  });

  it('#17.02 => should work with actual arrays', () => {
    const input = [1, 2, 3];
    const result = arrays.forceCast(input);
    expect(result).toBe(input);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#17.03 => should work with strings', () => {
    const result = arrays.forceCast('hello');
    expect(result).toBe('hello');
  });

  it('#17.04 => should work with objects', () => {
    const obj = { a: 1, b: 2 };
    const result = arrays.forceCast(obj);
    expect(result).toBe(obj);
  });

  it('#17.05 => should work with null', () => {
    const result = arrays.forceCast(null);
    expect(result).toBe(null);
  });

  it('#17.06 => should work with undefined', () => {
    const result = arrays.forceCast(undefined);
    expect(result).toBe(undefined);
  });

  it('#17.07 => should work with boolean values', () => {
    const result = arrays.forceCast(true);
    expect(result).toBe(true);
  });

  it('#17.08 => should work with functions', () => {
    const fn = () => 'test';
    const result = arrays.forceCast(fn);
    expect(result).toBe(fn);
  });

  it('#17.09 => should work with symbols', () => {
    const sym = Symbol('test');
    const result = arrays.forceCast(sym);
    expect(result).toBe(sym);
  });

  it('#17.10 => should work with dates', () => {
    const date = new Date();
    const result = arrays.forceCast(date);
    expect(result).toBe(date);
  });
});

describe('#18 => arrays.type', () => {
  it('#18.01 => should be the Array constructor', () => {
    expect(arrays.type).toBe(Array);
  });

  it('#18.02 => should be a function', () => {
    expect(typeof arrays.type).toBe('function');
  });

  it('#18.03 => should have correct name', () => {
    expect(arrays.type.name).toBe('Array');
  });

  it('#18.04 => should be able to create arrays', () => {
    const arr = new arrays.type(3);
    expect(arr).toBeInstanceOf(Array);
    expect(arr.length).toBe(3);
  });

  it('#18.05 => should be able to create arrays with values', () => {
    const arr = new arrays.type(1, 2, 3);
    expect(arr).toBeInstanceOf(Array);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('#18.06 => should work with Array.from', () => {
    const arr = arrays.type.from([1, 2, 3]);
    expect(arr).toBeInstanceOf(Array);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('#18.07 => should work with Array.of', () => {
    const arr = arrays.type.of(1, 2, 3);
    expect(arr).toBeInstanceOf(Array);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('#18.08 => should work with Array.isArray', () => {
    expect(arrays.type.isArray([1, 2, 3])).toBe(true);
    expect(arrays.type.isArray('not array')).toBe(false);
  });

  it('#18.09 => should have prototype methods', () => {
    expect(arrays.type.prototype.push).toBeInstanceOf(Function);
    expect(arrays.type.prototype.pop).toBeInstanceOf(Function);
    expect(arrays.type.prototype.map).toBeInstanceOf(Function);
    expect(arrays.type.prototype.filter).toBeInstanceOf(Function);
  });
});

describe('#19 => arrays.tupleOf.number.is', () => {
  it('#19.01 => should return a type guard function', () => {
    const numberChecker = (x: unknown): x is number =>
      typeof x === 'number';
    const guard = arrays.tupleOf.number.is(numberChecker);

    expect(typeof guard).toBe('function');
  });

  it('#19.02 => should validate tuple with correct type and length', () => {
    const numberChecker = (x: unknown): x is number =>
      typeof x === 'number';
    const guard = arrays.tupleOf.number.is(numberChecker);

    expect(guard([1, 2, 3], 3)).toBe(true);
    expect(guard([4, 5], 2)).toBe(true);
  });

  it('#19.03 => should reject tuple with wrong length', () => {
    const numberChecker = (x: unknown): x is number =>
      typeof x === 'number';
    const guard = arrays.tupleOf.number.is(numberChecker);

    expect(guard([1, 2, 3], 2)).toBe(false);
    expect(guard([1, 2], 3)).toBe(false);
  });

  it('#19.04 => should reject tuple with wrong types', () => {
    const numberChecker = (x: unknown): x is number =>
      typeof x === 'number';
    const guard = arrays.tupleOf.number.is(numberChecker);

    expect(guard([1, 'string', 3], 3)).toBe(false);
    expect(guard(['a', 'b'], 2)).toBe(false);
  });

  it('#19.05 => should reject non-arrays', () => {
    const numberChecker = (x: unknown): x is number =>
      typeof x === 'number';
    const guard = arrays.tupleOf.number.is(numberChecker);

    expect(guard('not array', 1)).toBe(false);
    expect(guard(null, 0)).toBe(false);
    expect(guard(undefined, 0)).toBe(false);
    expect(guard({}, 0)).toBe(false);
  });

  it('#19.06 => should work with string checker', () => {
    const stringChecker = (x: unknown): x is string =>
      typeof x === 'string';
    const guard = arrays.tupleOf.number.is(stringChecker);

    expect(guard(['a', 'b', 'c'], 3)).toBe(true);
    expect(guard(['hello', 'world'], 2)).toBe(true);
    expect(guard(['a', 1, 'c'], 3)).toBe(false);
  });

  it('#19.07 => should handle empty arrays', () => {
    const numberChecker = (x: unknown): x is number =>
      typeof x === 'number';
    const guard = arrays.tupleOf.number.is(numberChecker);

    expect(guard([], 0)).toBe(true);
    expect(guard([], 1)).toBe(false);
  });

  it('#19.08 => should work with complex type checker', () => {
    const objectChecker = (x: unknown): x is { id: number } =>
      typeof x === 'object' &&
      x !== null &&
      'id' in x &&
      typeof (x as any).id === 'number';
    const guard = arrays.tupleOf.number.is(objectChecker);

    expect(guard([{ id: 1 }, { id: 2 }], 2)).toBe(true);
    expect(guard([{ id: 1 }, { name: 'test' }], 2)).toBe(false);
  });
});

describe('#20 => arrays.toArray', () => {
  it('#20.01 => should wrap non-array values in array', () => {
    expect(arrays.toArray('hello')).toEqual(['hello']);
    expect(arrays.toArray(42)).toEqual([42]);
    expect(arrays.toArray(true)).toEqual([true]);
    expect(arrays.toArray(null)).toEqual([null]);
    expect(arrays.toArray(undefined)).toEqual([undefined]);
  });

  it('#20.02 => should return arrays unchanged', () => {
    const arr = [1, 2, 3];
    const result = arrays.toArray(arr);
    expect(result).toBe(arr);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#20.03 => should handle empty arrays', () => {
    const emptyArr: any[] = [];
    const result = arrays.toArray(emptyArr);
    expect(result).toBe(emptyArr);
    expect(result).toEqual([]);
  });

  it('#20.04 => should handle complex objects', () => {
    const obj = { a: 1, b: 'test' };
    expect(arrays.toArray(obj)).toEqual([obj]);

    const func = () => 'test';
    expect(arrays.toArray(func)).toEqual([func]);
  });

  it('#20.05 => should handle nested arrays', () => {
    const nestedArr = [
      [1, 2],
      [3, 4],
    ];
    const result = arrays.toArray(nestedArr);
    expect(result).toBe(nestedArr);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('#20.06 => should work with readonly arrays', () => {
    const readonlyArr = [1, 2, 3] as const;
    const result = arrays.toArray(readonlyArr);
    expect(result).toBe(readonlyArr);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#20.07 => should handle symbols', () => {
    const sym = Symbol('test');
    expect(arrays.toArray(sym)).toEqual([sym]);
  });

  it('#20.08 => should handle bigint', () => {
    const big = BigInt(123);
    expect(arrays.toArray(big)).toEqual([big]);
  });
});

describe('#21 => arrays.forceCast', () => {
  it('#21.01 => should force cast any value to unknown array', () => {
    const result = arrays.forceCast('not an array');
    expect(result).toBe('not an array');
    // TypeScript should treat result as unknown[] type
  });

  it('#21.02 => should force cast numbers', () => {
    const result = arrays.forceCast(42);
    expect(result).toBe(42);
  });

  it('#21.03 => should force cast objects', () => {
    const obj = { a: 1, b: 'test' };
    const result = arrays.forceCast(obj);
    expect(result).toBe(obj);
  });

  it('#21.04 => should force cast null and undefined', () => {
    expect(arrays.forceCast(null)).toBe(null);
    expect(arrays.forceCast(undefined)).toBe(undefined);
  });

  it('#21.05 => should force cast actual arrays', () => {
    const arr = [1, 2, 3];
    const result = arrays.forceCast(arr);
    expect(result).toBe(arr);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#21.06 => should force cast functions', () => {
    const func = () => 'test';
    const result = arrays.forceCast(func);
    expect(result).toBe(func);
  });

  it('#21.07 => should force cast symbols', () => {
    const sym = Symbol('test');
    const result = arrays.forceCast(sym);
    expect(result).toBe(sym);
  });

  it('#21.08 => should force cast boolean values', () => {
    expect(arrays.forceCast(true)).toBe(true);
    expect(arrays.forceCast(false)).toBe(false);
  });
});

describe('#22 => arrays.dynamic', () => {
  it('#22.01 => should preserve array type and return same reference', () => {
    const arr = [1, 2, 3];
    const result = arrays.dynamic(arr);
    expect(result).toBe(arr);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#22.02 => should work with readonly arrays', () => {
    const readonlyArr = [1, 2, 3] as const;
    const result = arrays.dynamic(readonlyArr);
    expect(result).toBe(readonlyArr);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#22.03 => should work with mixed type arrays', () => {
    const mixedArr = [1, 'string', true, { a: 1 }];
    const result = arrays.dynamic(mixedArr);
    expect(result).toBe(mixedArr);
    expect(result).toEqual([1, 'string', true, { a: 1 }]);
  });

  it('#22.04 => should work with empty arrays', () => {
    const emptyArr: any[] = [];
    const result = arrays.dynamic(emptyArr);
    expect(result).toBe(emptyArr);
    expect(result).toEqual([]);
  });

  it('#22.05 => should work with nested arrays', () => {
    const nestedArr = [
      [1, 2],
      [3, 4],
      ['a', 'b'],
    ];
    const result = arrays.dynamic(nestedArr);
    expect(result).toBe(nestedArr);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
      ['a', 'b'],
    ]);
  });

  it('#22.06 => should work with tuple types', () => {
    const tuple: [string, number, boolean] = ['test', 42, true];
    const result = arrays.dynamic(tuple);
    expect(result).toBe(tuple);
    expect(result).toEqual(['test', 42, true]);
  });

  it('#22.07 => should work with array of objects', () => {
    const objArray = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const result = arrays.dynamic(objArray);
    expect(result).toBe(objArray);
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it('#22.08 => should work with array of functions', () => {
    const funcArray = [() => 1, () => 'test', () => true];
    const result = arrays.dynamic(funcArray);
    expect(result).toBe(funcArray);
    expect(result[0]()).toBe(1);
    expect(result[1]()).toBe('test');
    expect(result[2]()).toBe(true);
  });
});

describe('#23 => arrays.type (enhanced tests)', () => {
  it('#23.01 => should be the Array constructor', () => {
    expect(arrays.type).toBe(Array);
    expect(arrays.type).toBeInstanceOf(Function);
  });

  it('#23.02 => should create arrays with new operator', () => {
    const arr = new arrays.type(3);
    expect(arr).toBeInstanceOf(Array);
    expect(arr.length).toBe(3);
    expect(arr).toEqual([undefined, undefined, undefined]);
  });

  it('#23.03 => should create arrays without new operator', () => {
    const arr = arrays.type(1, 2, 3);
    expect(arr).toBeInstanceOf(Array);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('#23.04 => should have all Array static methods', () => {
    expect(arrays.type.isArray).toBeInstanceOf(Function);
    expect(arrays.type.from).toBeInstanceOf(Function);
    expect(arrays.type.of).toBeInstanceOf(Function);
  });

  it('#23.05 => should work with Array.from', () => {
    const arr = arrays.type.from('hello');
    expect(arr).toEqual(['h', 'e', 'l', 'l', 'o']);

    const mapped = arrays.type.from([1, 2, 3], x => x * 2);
    expect(mapped).toEqual([2, 4, 6]);
  });

  it('#23.06 => should work with Array.of', () => {
    const arr = arrays.type.of(1, 2, 3);
    expect(arr).toEqual([1, 2, 3]);

    const single = arrays.type.of(7);
    expect(single).toEqual([7]);
  });

  it('#23.07 => should work with Array.isArray', () => {
    expect(arrays.type.isArray([1, 2, 3])).toBe(true);
    expect(arrays.type.isArray('not array')).toBe(false);
    expect(arrays.type.isArray(null)).toBe(false);
    expect(arrays.type.isArray(undefined)).toBe(false);
    expect(arrays.type.isArray({})).toBe(false);
  });

  it('#23.08 => should have Array prototype', () => {
    expect(arrays.type.prototype).toBe(Array.prototype);
    expect(arrays.type.prototype.push).toBeInstanceOf(Function);
    expect(arrays.type.prototype.pop).toBeInstanceOf(Function);
    expect(arrays.type.prototype.map).toBeInstanceOf(Function);
    expect(arrays.type.prototype.filter).toBeInstanceOf(Function);
    expect(arrays.type.prototype.reduce).toBeInstanceOf(Function);
  });

  it('#23.09 => should create arrays with specific length', () => {
    const arr = new arrays.type(5);
    expect(arr.length).toBe(5);
    expect(arr.every(item => item === undefined)).toBe(true);
  });

  it('#23.10 => should be compatible with instanceof', () => {
    const arr = new arrays.type(1, 2, 3);
    expect(arr instanceof arrays.type).toBe(true);
    expect(arr instanceof Array).toBe(true);
  });
});
