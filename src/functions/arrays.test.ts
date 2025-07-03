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

describe('#04 => arrays', () => {
  it('#04.01 => should create array with given arguments', () => {
    const result = arrays(1, 2, 3);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#04.02 => should create empty array when no arguments provided', () => {
    const result = arrays();
    expect(result).toEqual([]);
  });

  it('#04.03 => should create array with mixed types', () => {
    const result = arrays.low(1, 'hello', true, { key: 'value' });
    expect(result).toEqual([1, 'hello', true, { key: 'value' }]);
  });

  it('#04.04 => should create array with single argument', () => {
    const result = arrays('single');
    expect(result).toEqual(['single']);
  });

  it('#04.05 => should preserve object references', () => {
    const obj = { test: 'value' };
    const result = arrays(obj, obj);
    expect(result[0]).toBe(result[1]);
    expect(result[0]).toBe(obj);
  });
});

describe('#05 => arrays.tupleOf', () => {
  it('#05.01 => should create readonly tuple with given arguments', () => {
    const result = arrays.tupleOf(1, 2, 3);
    expect(result).toEqual([1, 2, 3]);
    expect(Object.isFrozen(result)).toBe(false); // arrays.tupleOf returns readonly but not frozen
  });

  it('#05.02 => should create empty readonly tuple when no arguments provided', () => {
    const result = arrays.tupleOf();
    expect(result).toEqual([]);
  });

  it('#05.03 => should create readonly tuple with mixed types', () => {
    const result = arrays.tupleOf(1, 'hello', true, { key: 'value' });
    expect(result).toEqual([1, 'hello', true, { key: 'value' }]);
  });

  it('#05.04 => should create readonly tuple with single argument', () => {
    const result = arrays.tupleOf('single');
    expect(result).toEqual(['single']);
  });

  it('#05.05 => should preserve object references', () => {
    const obj = { test: 'value' };
    const result = arrays.tupleOf(obj, obj);
    expect(result[0]).toBe(result[1]);
    expect(result[0]).toBe(obj);
  });
});

describe('#06 =>  arrays.reduce', () => {
  it('#06.01 => should return first element of array', () => {
    const result = arrays.reduce([1, 2, 3]);
    expect(result).toBe(1);
  });

  it('#06.02 => should return value itself if not an array', () => {
    const result = arrays.reduce(42);
    expect(result).toBe(42);
  });

  it('#06.03 => should return first element of readonly array', () => {
    const result = arrays.reduce.const([1, 2, 3]);
    expect(result).toBe(1);
  });

  it('#06.04 => should handle string values', () => {
    const result = arrays.reduce('not an array');
    expect(result).toBe('not an array');
  });

  it('#06.05 => should handle empty array', () => {
    const result = arrays.reduce([]);
    expect(result).toBeUndefined();
  });

  it('#06.06 => should handle array with single element', () => {
    const result = arrays.reduce(['single']);
    expect(result).toBe('single');
  });

  it('#06.07 => should handle object values', () => {
    const obj = { key: 'value' };
    const result = arrays.reduce(obj);
    expect(result).toBe(obj);
  });

  it('#06.08 => should handle null and undefined', () => {
    const nullResult = arrays.reduce(null);
    expect(nullResult).toBeNull();

    const undefinedResult = arrays.reduce(undefined);
    expect(undefinedResult).toBeUndefined();
  });
});

describe('#07 =>  arrays.reverse', () => {
  it('#07.01 => should  arrays.reverse array with multiple elements', () => {
    const result = arrays.reverse(1, 2, 3, 4);
    expect(result).toEqual([4, 3, 2, 1]);
  });

  it('#07.02 => should handle empty array', () => {
    const result = arrays.reverse();
    expect(result).toEqual([]);
  });

  it('#07.03 => should handle single element', () => {
    const result = arrays.reverse('single');
    expect(result).toEqual(['single']);
  });

  it('#07.04 => should  arrays.reverse array with mixed types', () => {
    const result = arrays.reverse(1, 'hello', true, { key: 'value' });
    expect(result).toEqual([{ key: 'value' }, true, 'hello', 1]);
  });

  it('#07.05 => should not modify original arguments (create new array)', () => {
    const obj = { test: 'value' };
    const result = arrays.reverse(obj, 'test');
    expect(result).toEqual(['test', obj]);
    expect(result[1]).toBe(obj); // Should reference same object
  });

  it('#07.06 => should handle duplicate elements', () => {
    const result = arrays.reverse('a', 'b', 'a', 'c', 'a');
    expect(result).toEqual(['a', 'c', 'a', 'b', 'a']);
  });
});

describe('#08 =>  arrays.reverse.tuple', () => {
  it('#08.01 => should  arrays.reverse tuple with multiple elements', () => {
    const result = arrays.reverse.tuple(1, 2, 3, 4);
    expect(result).toEqual([4, 3, 2, 1]);
  });

  it('#08.02 => should handle empty tuple', () => {
    const result = arrays.reverse.tuple();
    expect(result).toEqual([]);
  });

  it('#08.03 => should handle single element', () => {
    const result = arrays.reverse.tuple('single');
    expect(result).toEqual(['single']);
  });

  it('#08.04 => should  arrays.reverse tuple with mixed types', () => {
    const result = arrays.reverse.tuple(1, 'hello', true, {
      key: 'value',
    });
    expect(result).toEqual([{ key: 'value' }, true, 'hello', 1]);
  });

  it('#08.05 => should preserve object references', () => {
    const obj = { test: 'value' };
    const result = arrays.reverse.tuple(obj, 'test');
    expect(result[1]).toBe(obj);
  });
});

describe('#09 => arrays.freeze', () => {
  it('#09.02 => should freeze empty tuple', () => {
    const result = arrays.freeze();
    expect(result).toEqual([]);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#09.03 => should freeze single element tuple', () => {
    const result = arrays.freeze('single');
    expect(result).toEqual(['single']);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#09.06 => should prevent modification of frozen tuple', () => {
    const result = arrays.freeze(1, 2, 3);
    expect(() => {
      (result as any)[0] = 999;
    }).toThrow();
    expect(result[0]).toBe(1); // Should still be 1, not 999
  });

  it('#09.07 => should handle duplicate elements in frozen tuple', () => {
    const result = arrays.freeze('a', 'b', 'a', 'c', 'a');
    expect(result).toEqual(['a', 'b', 'a', 'c', 'a']);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('#09.08 => should create immutable frozen tuple', () => {
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
});

describe('#10 => extract', () => {
  it('#10.01 => should extract matching elements', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.extract(array, 1, 3);
    expect(result).toEqual([1, 3, 3, 1]);
  });

  it('#10.02 => should extract single matching element', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.extract(array, 2);
    expect(result).toEqual([2, 2]);
  });

  it('#10.03 => should return empty array when no matches', () => {
    const array = [1, 2, 3];
    const result = arrays.extract(array, 5);
    expect(result).toEqual([]);
  });

  it('#10.04 => should handle empty array', () => {
    const array: number[] = [];
    const result = arrays.extract(array, 1);
    expect(result).toEqual([]);
  });

  it('#10.05 => should extract string elements', () => {
    const array = ['a', 'b', 'c', 'b', 'a'];
    const result = arrays.extract(array, 'a', 'c');
    expect(result).toEqual(['a', 'c', 'a']);
  });

  it('#10.06 => should handle mixed types', () => {
    const array = [1, 'hello', true, 2, 'hello', false];
    const result = arrays.extract(array, 'hello', true);
    expect(result).toEqual(['hello', true, 'hello']);
  });

  it('#10.07 => should preserve object references', () => {
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

describe('#11 => arrays.exclude', () => {
  it('#11.01 => should exclude matching elements', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.exclude(array, 1, 3);
    expect(result).toEqual([2, 4, 2]);
  });

  it('#11.02 => should exclude single matching element', () => {
    const array = [1, 2, 3, 4, 2, 3, 1];
    const result = arrays.exclude(array, 2);
    expect(result).toEqual([1, 3, 4, 3, 1]);
  });

  it('#11.03 => should return original array when no matches to exclude', () => {
    const array = [1, 2, 3];
    const result = arrays.exclude(array, 5);
    expect(result).toEqual([1, 2, 3]);
  });

  it('#11.04 => should handle empty array', () => {
    const array: number[] = [];
    const result = arrays.exclude(array, 1);
    expect(result).toEqual([]);
  });

  it('#11.05 => should exclude string elements', () => {
    const array = ['a', 'b', 'c', 'b', 'a'];
    const result = arrays.exclude(array, 'a', 'c');
    expect(result).toEqual(['b', 'b']);
  });

  it('#11.06 => should handle mixed types', () => {
    const array = [1, 'hello', true, 2, 'hello', false];
    const result = arrays.exclude(array, 'hello', true);
    expect(result).toEqual([1, 2, false]);
  });

  it('#11.07 => should exclude all elements when all match', () => {
    const array = [1, 1, 1];
    const result = arrays.exclude(array, 1);
    expect(result).toEqual([]);
  });

  it('#11.08 => should preserve object references', () => {
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
