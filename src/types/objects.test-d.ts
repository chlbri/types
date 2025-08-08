import { expectTypeOf } from 'vitest';
import type { KeyTypes } from './commons.types';
import { objects } from './objects';
import type { DeepRequiredLow, RequiredLow } from './objects.types';

/**
 * Tests de types pour toutes les sous-fonctions de objects (types)
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Objects Types Type Tests', () => {
  describe('#T00 => objects main function types', () => {
    it('#T00.01 => should cast to object type', () => {
      const value = objects({ a: 1, b: 'test' });
      expectTypeOf(value).toEqualTypeOf<object>();

      const emptyValue = objects({});
      expectTypeOf(emptyValue).toEqualTypeOf<object>();
    });

    it('#T00.02 => should work with forceCast', () => {
      const forceCasted = objects.forceCast('not an object');
      expectTypeOf(forceCasted).toEqualTypeOf<object>();

      const numberCasted = objects.forceCast(123);
      expectTypeOf(numberCasted).toEqualTypeOf<object>();
    });

    it('#T00.03 => should work with dynamic', () => {
      const dynamic = objects.dynamic({ test: 'value' });
      expectTypeOf(dynamic).toExtend<object>();
    });
  });

  describe('#T01 => objects.is types', () => {
    it('#T01.01 => should return type check result', () => {
      const objectValue = { a: 1 };
      const stringValue = 'test';

      const objectCheck = objects.is(objectValue);
      expectTypeOf(objectCheck).toEqualTypeOf<true>();

      const stringCheck = objects.is(stringValue);
      expectTypeOf(stringCheck).toEqualTypeOf<false>();
    });
  });

  describe('#T02 => objects.type', () => {
    it('#T02.01 => should be object type reference', () => {
      expectTypeOf(objects.type).toEqualTypeOf<object>();
    });
  });

  describe('#T03 => objects.trueObject types', () => {
    it('#T03.01 => should cast to true object type', () => {
      const value = objects.trueObject({ a: 1, b: 'test' });
      expectTypeOf(value).toExtend<object>();
    });

    it('#T03.02 => should work with forceCast', () => {
      const forceCasted = objects.trueObject.forceCast('not an object');
      expectTypeOf(forceCasted).toExtend<object>();
    });

    it('#T03.03 => should work with dynamic', () => {
      const dynamic = objects.trueObject.dynamic({ test: 'value' });
      expectTypeOf(dynamic).toExtend<object>();
    });

    it('#T03.04 => should return type check result', () => {
      const objectValue = { a: 1 };
      const arrayValue = [1, 2, 3];

      const objectCheck = objects.trueObject.is(objectValue);
      expectTypeOf(objectCheck).toExtend<boolean>();

      const arrayCheck = objects.trueObject.is(arrayValue);
      expectTypeOf(arrayCheck).toEqualTypeOf<false>();
    });
  });

  describe('#T04 => objects.keysOf types', () => {
    it('#T04.01 => should return array of keys', () => {
      const obj = { a: 1, b: 'test', c: true } as const;
      const result = objects.keysOf(obj);
      expectTypeOf(result).toEqualTypeOf<('a' | 'b' | 'c')[]>();
    });

    it('#T04.02 => should work with dynamic objects', () => {
      const dynamicObj = { a: 1, b: 2 } as { [key: string]: number };
      const result = objects.keysOf(dynamicObj);
      expectTypeOf(result).toExtend<unknown[]>();
    });

    it('#T04.03 => objects.keysOf.union should return union of keys', () => {
      const obj = { a: 1, b: 'test', c: true } as const;
      const result = objects.keysOf.union(obj);
      expectTypeOf(result).toEqualTypeOf<'a' | 'b' | 'c'>();
    });
  });

  describe('#T05 => objects.values types', () => {
    it('#T05.01 => should return array of values', () => {
      const obj = { a: 1, b: 'test', c: true } as const;
      const result = objects.values(obj);
      expectTypeOf(result).toEqualTypeOf<(1 | 'test' | true)[]>();
    });

    it('#T05.02 => should work with dynamic objects', () => {
      const dynamicObj = { a: 1, b: 2 } as { [key: string]: number };
      const result = objects.values(dynamicObj);
      expectTypeOf(result).toExtend<number[]>();
    });

    it('#T05.03 => objects.values.union should return union of values', () => {
      const obj = { a: 1, b: 'test', c: true } as const;
      const result = objects.values.union(obj);
      expectTypeOf(result).toEqualTypeOf<1 | 'test' | true>();
    });
  });

  describe('#T06 => objects.entries types', () => {
    it('#T06.01 => should return array of key-value pairs', () => {
      const obj = { a: 1, b: 'test' } as const;
      const result = objects.entries(obj);
      expectTypeOf(result).toExtend<['a' | 'b', 1 | 'test'][]>();
    });

    it('#T06.02 => should work with dynamic objects', () => {
      const dynamicObj = { a: 1, b: 2 } as { [key: string]: number };
      const result = objects.entries(dynamicObj);
      expectTypeOf(result).toExtend<unknown[]>();
    });
  });

  describe('#T07 => objects.byKey types', () => {
    it('#T07.01 => should return value type for specific key', () => {
      const obj = { a: 1, b: 'test', c: true } as const;
      const aValue = objects.byKey(obj, 'a');
      expectTypeOf(aValue).toEqualTypeOf<1>();

      const bValue = objects.byKey(obj, 'b');
      expectTypeOf(bValue).toEqualTypeOf<'test'>();
    });

    it('#T07.02 => should work with dynamic objects', () => {
      const dynamicObj = { a: 1, b: 2 } as { [key: string]: number };
      const value = objects.byKey(dynamicObj, 'a');
      expectTypeOf(value).toExtend<number>();
    });
  });

  describe('#T08 => objects.keyTypes types', () => {
    it('#T08.01 => should cast to KeyTypes', () => {
      const keyTypes = { a: 'string', b: 'number' } as const;
      const result = objects.keyTypes(keyTypes);
      expectTypeOf(result).toEqualTypeOf<KeyTypes>();
    });

    it('#T08.02 => should work with forceCast', () => {
      const forceCasted = objects.keyTypes.forceCast({
        invalid: 'schema',
      });
      expectTypeOf(forceCasted).toEqualTypeOf<KeyTypes>();
    });

    it('#T08.03 => objects.keyTypes.from should create type from schema', () => {
      const schema = { a: 'string', b: 'number' } as const;
      const result = objects.keyTypes.from(schema);
      expectTypeOf(result).toExtend<object>();
    });
  });

  describe('#T09 => objects.hasKeys types', () => {
    it('#T09.01 => should return type check for keys existence', () => {
      const obj = { a: 1, b: 'test', c: true } as const;
      const result = objects.hasKeys(obj, 'a', 'b');
      expectTypeOf(result).toEqualTypeOf<true>();

      const falseResult = objects.hasKeys(obj, 'a', 'nonexistent');
      expectTypeOf(falseResult).toEqualTypeOf<false>();
    });

    it('#T09.02 => objects.hasKeys.typings should return type checker function', () => {
      const schema = { a: 'string', b: 'number' } as const;
      const checker = objects.hasKeys.typings(schema);
      expectTypeOf(checker).toBeFunction();

      // Test the returned function
      const result = checker({ a: 'test', b: 42 });
      expectTypeOf(result).toExtend<boolean>();
    });

    it('#T09.03 => objects.hasKeys.all should check exact key match', () => {
      const obj = { a: 1, b: 'test' } as const;
      const result = objects.hasKeys.all(obj, 'a', 'b');
      expectTypeOf(result).toExtend<boolean>();
    });
  });

  describe('#T10 => objects.omit types', () => {
    it('#T10.01 => should omit specified keys', () => {
      const obj = { a: 1, b: 'test', c: true } as const;
      const result = objects.omit(obj, 'a', 'c');
      expectTypeOf(result).toEqualTypeOf<Omit<typeof obj, 'a' | 'c'>>();
    });

    it('#T10.02 => objects.omit.const should work with const assertions', () => {
      const obj = { a: 1, b: 'test', c: true } as const;
      const result = objects.omit.const(obj, 'a');
      expectTypeOf(result).toEqualTypeOf<Omit<typeof obj, 'a'>>();
    });

    it('#T10.03 => objects.omit.is should return type checker function', () => {
      const obj = { a: 1, b: 'test', c: true } as const;
      const checker = objects.omit.is(obj, 'a');
      expectTypeOf(checker).toBeFunction();

      // Test the returned function
      const result = checker({ b: 'test', c: true });
      expectTypeOf(result).toExtend<boolean>();
    });

    it('#T10.04 => objects.omit.const.is should return const type checker', () => {
      const obj = { a: 1, b: 'test', c: true } as const;
      const checker = objects.omit.const.is(obj, 'a');
      expectTypeOf(checker).toBeFunction();
    });
  });

  describe('#T11 => Combined type tests', () => {
    it('#T11.01 => should work with complex object operations', () => {
      const complexObj = {
        data: { nested: 'value' },
        array: [1, 2, 3],
        flag: true,
      } as const;

      const keys = objects.keysOf(complexObj);
      expectTypeOf(keys).toEqualTypeOf<('data' | 'array' | 'flag')[]>();

      const values = objects.values(complexObj);
      expectTypeOf(values).toExtend<unknown[]>();

      const dataValue = objects.byKey(complexObj, 'data');
      expectTypeOf(dataValue).toEqualTypeOf<{
        readonly nested: 'value';
      }>();
    });

    it('#T11.02 => should handle edge cases', () => {
      // Test with empty object
      const empty = {} as const;
      const emptyKeys = objects.keysOf(empty);
      expectTypeOf(emptyKeys).toEqualTypeOf<never[]>();

      // Test with single property
      const single = { only: 'prop' } as const;
      const singleKeys = objects.keysOf(single);
      expectTypeOf(singleKeys).toEqualTypeOf<'only'[]>();
    });
  });

  describe('#T12 => Function signatures', () => {
    it('#T12.01 => should have correct method signatures', () => {
      expectTypeOf(objects).toExtend<(value: object) => object>();

      expectTypeOf(objects.forceCast).toExtend<
        (value: unknown) => object
      >();

      expectTypeOf(objects.is).toExtend<(value: unknown) => boolean>();

      expectTypeOf(objects.keysOf).toBeFunction();
      expectTypeOf(objects.values).toBeFunction();
      expectTypeOf(objects.entries).toBeFunction();
      expectTypeOf(objects.byKey).toBeFunction();
      expectTypeOf(objects.hasKeys).toBeFunction();
      expectTypeOf(objects.omit).toBeFunction();
    });
  });
});

describe('Types', () => {
  type _RL1 = {
    a: string;
    b: number;
    data?: {
      name: string;
      age?: number;
    };
  };

  type RL1 = RequiredLow<_RL1>;

  expectTypeOf<keyof RL1>().toEqualTypeOf<
    'a' | 'b' | 'data' | undefined
  >();

  expectTypeOf<RL1>().toEqualTypeOf<{
    a: string;
    b: number;
    data:
      | {
          name: string;
          age?: number;
        }
      | undefined;
  }>();

  type DRL1 = DeepRequiredLow<_RL1>;

  expectTypeOf<keyof DRL1>().toEqualTypeOf<
    'a' | 'b' | 'data' | undefined
  >();

  expectTypeOf<DRL1>().toEqualTypeOf<{
    data: {
      age: number | undefined;
      name: string;
    };
    a: string;
    b: number;
  }>();

  //_RL2 a type with deep nested optional object, deeper for 4 levels
  type _RL2 = {
    a: string;
    b: number;
    data?: {
      name: string;
      age?: number;
      address?: {
        street?: string;
        city: string;
        zip?: string;
      };
    };
  };

  type RL2 = RequiredLow<_RL2>;

  expectTypeOf<keyof RL2>().toEqualTypeOf<
    'a' | 'b' | 'data' | undefined
  >();

  expectTypeOf<RL2>().toEqualTypeOf<{
    data:
      | {
          name: string;
          age?: number;
          address?: {
            street?: string;
            city: string;
            zip?: string;
          };
        }
      | undefined;
    a: string;
    b: number;
  }>();

  type DRL2 = DeepRequiredLow<_RL2>;

  expectTypeOf<keyof DRL2>().toEqualTypeOf<
    'a' | 'b' | 'data' | undefined
  >();

  expectTypeOf<DRL2>().toEqualTypeOf<{
    data: {
      age: number | undefined;
      address: {
        street: string | undefined;
        city: string;
        zip: string | undefined;
      };
      name: string;
    };
    a: string;
    b: number;
  }>();
});
