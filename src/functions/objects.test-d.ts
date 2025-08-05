import { expectTypeOf } from 'vitest';
import type { DeepReadonly } from '../types/types';
import { objects } from './objects';

/**
 * Tests de types pour toutes les sous-fonctions de objects (functions)
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Objects Functions Type Tests', () => {
  describe('#T00 => trueObject types', () => {
    it('#T00.01 => should check for plain objects', () => {
      const value: unknown = { a: 1 };

      if (objects.trueObject.is(value)) {
        expectTypeOf(value).toExtend<object>();
      }

      expectTypeOf(objects.trueObject.is).toExtend<
        (value: unknown) => value is object
      >();
    });

    it('#T00.02 => should work with different types', () => {
      const objectValue = { a: 1 };
      const stringValue = 'hello';

      const objectCheck = objects.trueObject.is(objectValue);
      expectTypeOf(objectCheck).toExtend<boolean>();

      const stringCheck = objects.trueObject.is(stringValue);
      expectTypeOf(stringCheck).toExtend<boolean>();
    });
  });

  describe('#T01 => type constructor', () => {
    it('#T01.01 => should reference Object constructor', () => {
      expectTypeOf(objects.type).toExtend<ObjectConstructor>();
    });
  });

  describe('#T02 => keysOf types', () => {
    it('#T02.01 => should return correct key types', () => {
      const obj = { a: 1, b: 'test' };
      const result = objects.keysOf(obj);
      expectTypeOf(result).toExtend<('a' | 'b')[]>();
    });

    it('#T02.02 => should work with const objects', () => {
      const constObj = { a: 1, b: 'test' } as const;
      const result = objects.keysOf(constObj);
      expectTypeOf(result).toExtend<('a' | 'b')[]>();
    });
  });

  describe('#T03 => values types', () => {
    it('#T03.01 => should return correct value types', () => {
      const obj = { a: 1, b: 'test' };
      const result = objects.values(obj);
      expectTypeOf(result).toExtend<(number | string)[]>();
    });

    it('#T03.02 => should work with const objects', () => {
      const constObj = { a: 1, b: 'test' } as const;
      const result = objects.values(constObj);
      expectTypeOf(result).toExtend<(1 | 'test')[]>();
    });
  });

  describe('#T04 => entries types', () => {
    it('#T04.01 => should return correct entry types', () => {
      const obj = { a: 1, b: 'test' };
      const result = objects.entries(obj);
      expectTypeOf(result).toExtend<['a' | 'b', number | string][]>();
    });

    it('#T04.02 => should work with const objects', () => {
      const constObj = { a: 1, b: 'test' } as const;
      const result = objects.entries(constObj);
      expectTypeOf(result).toExtend<['a' | 'b', 1 | 'test'][]>();
    });
  });

  describe('#T05 => byKey types', () => {
    it('#T05.01 => should return correct property type', () => {
      const obj = { a: 1, b: 'test' };
      const result = objects.byKey(obj, 'a');
      expectTypeOf(result).toExtend<number>();

      const result2 = objects.byKey(obj, 'b');
      expectTypeOf(result2).toExtend<string>();
    });
  });

  describe('#T06 => hasKeys types', () => {
    it('#T06.01 => should act as a type guard for required keys', () => {
      const obj = { a: 1, b: 'test' };

      if (objects.hasKeys(obj, 'a')) {
        expectTypeOf(obj).toExtend<{ a: unknown }>();
      }

      if (objects.hasKeys(obj, 'a', 'b')) {
        expectTypeOf(obj).toExtend<{ a: unknown; b: unknown }>();
      }
    });

    it('#T06.02 => should work with schema validation', () => {
      const obj = { a: 1, b: 'test' };
      const schema = { a: 'number' as const, b: 'string' as const };

      const checker = objects.hasKeys.typings(obj, schema);
      expectTypeOf(checker).toExtend<boolean>();
    });
  });

  describe('#T07 => pick types', () => {
    it('#T07.01 => should pick specific keys', () => {
      const obj = { a: 1, b: 'test', c: true };
      const result = objects.pick(obj, 'a', 'c');
      expectTypeOf(result).toExtend<Pick<typeof obj, 'a' | 'c'>>();
    });

    it('#T07.02 => should work with deep pick', () => {
      const obj = { a: { nested: 'value' }, b: 'test' };
      const result = objects.pick.deep(obj, 'a');
      expectTypeOf(result).toExtend<object>();
    });
  });

  describe('#T08 => omit types', () => {
    it('#T08.01 => should omit specific keys', () => {
      const obj = { a: 1, b: 'test', c: true };
      const result = objects.omit(obj, 'b');
      expectTypeOf(result).toExtend<object>();
    });

    it('#T08.02 => should work with strict mode', () => {
      const obj = { a: 1, b: 'test' };
      const result = objects.omit.strict(obj, 'a');
      expectTypeOf(result).toExtend<object>();
    });
  });

  describe('#T09 => required types', () => {
    it('#T09.01 => should make properties required', () => {
      const obj = { a: 1, b: 'test' };
      const requires = { c: true };
      const result = objects.require(obj, requires);
      expectTypeOf(result).toExtend<object>();
    });

    it('#T09.02 => should work with strict mode', () => {
      const obj = { a: 1, b: 'test' };
      const requires = { c: true };
      const result = objects.require.strict(obj, requires);
      expectTypeOf(result).toExtend<object>();
    });
  });

  describe('#T10 => readonly types', () => {
    it('#T10.01 => should make properties readonly', () => {
      const obj = { a: 1, b: 'test' };
      const result = objects.readonly(obj);
      expectTypeOf(result).toExtend<Readonly<{ a: number; b: string }>>();
    });

    it('#T10.02 => should work with deep readonly', () => {
      const obj = { a: { nested: 'value' }, b: 'test' };
      const result = objects.readonly.deep(obj);
      expectTypeOf(result).toExtend<
        DeepReadonly<{ a: { nested: string }; b: string }>
      >();
    });
  });

  describe('#T11 => freeze types', () => {
    it('#T11.01 => should freeze objects', () => {
      const obj = { a: 1, b: 'test' };
      const result = objects.freeze(obj);
      expectTypeOf(result).toExtend<Readonly<{ a: number; b: string }>>();
    });

    it('#T11.02 => should work with const objects', () => {
      const constObj = { a: 1, b: 'test' } as const;
      const result = objects.freeze(constObj);
      expectTypeOf(result).toExtend<Readonly<{ a: 1; b: 'test' }>>();
    });
  });

  describe('#T12 => reverse types', () => {
    it('#T12.01 => should reverse key-value pairs', () => {
      const obj = { a: 'x', b: 'y' } as const;
      const result = objects.reverse(obj);
      expectTypeOf(result).toExtend<{ x: 'a'; y: 'b' }>();
    });
  });

  describe('#T13 => primitive types', () => {
    it('#T13.01 => should check for primitive object maps', () => {
      const value: unknown = { a: 1, b: 'test' };

      if (objects.primitive.is(value)) {
        expectTypeOf(value).toBeObject();
      }

      expectTypeOf(objects.primitive.is).toBeFunction();
    });
  });

  describe('#T14 => complex scenarios', () => {
    it('#T14.01 => should handle complex object manipulations', () => {
      const complexObj = {
        id: 1,
        name: 'test',
        data: { nested: 'value' },
        flag: true,
        metadata: { version: 1 },
      };

      const keys = objects.keysOf(complexObj);
      expectTypeOf(keys).toExtend<
        ('id' | 'name' | 'data' | 'flag' | 'metadata')[]
      >();

      const picked = objects.pick(complexObj, 'data', 'flag');
      expectTypeOf(picked).toExtend<object>();

      const omitted = objects.omit(complexObj, 'id', 'name', 'metadata');
      expectTypeOf(omitted).toExtend<object>();
    });

    it('#T14.02 => should handle edge cases', () => {
      const empty = {};
      const emptyKeys = objects.keysOf(empty);
      expectTypeOf(emptyKeys).toExtend<never[]>();

      const single = { only: 'one' };
      const singleKeys = objects.keysOf(single);
      expectTypeOf(singleKeys).toExtend<'only'[]>();
    });
  });

  describe('#T15 => type guards and assertions', () => {
    it('#T15.01 => should provide proper type guards', () => {
      const unknownValue: unknown = { a: 1 };

      if (objects.trueObject.is(unknownValue)) {
        expectTypeOf(unknownValue).toExtend<object>();
      }

      expectTypeOf(objects.trueObject.is).toExtend<
        (value: unknown) => value is object
      >();
    });

    it('#T15.02 => should handle function types correctly', () => {
      expectTypeOf(objects.keysOf).toBeFunction();
      expectTypeOf(objects.values).toBeFunction();
      expectTypeOf(objects.entries).toBeFunction();
      expectTypeOf(objects.pick).toBeFunction();
      expectTypeOf(objects.omit).toBeFunction();
      expectTypeOf(objects.require).toBeFunction();
      expectTypeOf(objects.readonly).toBeFunction();
      expectTypeOf(objects.freeze).toBeFunction();
    });
  });
});
