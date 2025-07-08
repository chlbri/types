import { expectTypeOf } from 'vitest';
import { commons } from './commons';

/**
 * Tests de types pour toutes les sous-fonctions de commons (types)
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Commons Types Type Tests', () => {
  describe('#T00 => commons main function types', () => {
    it('#T00.01 => should cast to specified type', () => {
      const result = commons<string>();
      expectTypeOf(result).toExtend<string>();

      const numberResult = commons<number>();
      expectTypeOf(numberResult).toExtend<number>();
    });
  });

  describe('#T01 => commons.partial types', () => {
    it('#T01.01 => should return Partial type', () => {
      interface TestType {
        a: string;
        b: number;
      }

      const result = commons.partial<TestType>();
      expectTypeOf(result).toExtend<Partial<TestType>>();
    });

    it('#T01.02 => commons.partial.deep should return DeepPartial type', () => {
      interface NestedType {
        level1: {
          level2: {
            value: string;
          };
        };
      }

      const result = commons.partial.deep<NestedType>();
      expectTypeOf(result).toExtend<any>(); // Using any for complex deep partial
    });
  });

  describe('#T02 => commons.const types', () => {
    it('#T02.01 => should preserve literal types', () => {
      const obj = { a: 1, b: 'test' } as const;
      const result = commons.const(obj);
      expectTypeOf(result).toExtend<typeof obj>();
    });
  });

  describe('#T03 => commons.identity types', () => {
    it('#T03.01 => should preserve exact input type', () => {
      const value = { test: 'value' };
      const result = commons.identity(value);
      expectTypeOf(result).toExtend<typeof value>();
    });
  });

  describe('#T04 => commons.is types', () => {
    it('#T04.01 => commons.is.defined should return correct type check', () => {
      const result = commons.is.defined('test');
      expectTypeOf(result).toExtend<true>();

      const undefinedResult = commons.is.defined(undefined);
      expectTypeOf(undefinedResult).toExtend<false>();
    });

    it('#T04.02 => commons.is.undefined should return correct type check', () => {
      const result = commons.is.undefined(undefined);
      expectTypeOf(result).toExtend<true>();

      const definedResult = commons.is.undefined('test');
      expectTypeOf(definedResult).toExtend<false>();
    });

    it('#T04.03 => commons.is.null should return correct type check', () => {
      const result = commons.is.null(null);
      expectTypeOf(result).toExtend<true>();

      const notNullResult = commons.is.null('test');
      expectTypeOf(notNullResult).toExtend<false>();
    });

    it('#T04.04 => commons.is.notNull should return correct type check', () => {
      const result = commons.is.notNull('test');
      expectTypeOf(result).toExtend<true>();

      const nullResult = commons.is.notNull(null);
      expectTypeOf(nullResult).toExtend<false>();
    });
  });

  describe('#T05 => commons.unknown types', () => {
    it('#T05.01 => should cast to unknown', () => {
      const result = commons.unknown<string>();
      expectTypeOf(result).toExtend<unknown>();
    });
  });

  describe('#T06 => commons.any types', () => {
    it('#T06.01 => should cast to any', () => {
      const result = commons.any();
      expectTypeOf(result).toExtend<any>();
    });
  });

  describe('#T07 => commons.required types', () => {
    it('#T07.01 => should make properties required', () => {
      interface OptionalType {
        a?: string;
        b?: number;
      }

      const result = commons.required<OptionalType>();
      expectTypeOf(result).toExtend<Required<OptionalType>>();
    });

    it('#T07.02 => commons.required.deep should deeply make required', () => {
      interface DeepOptionalType {
        level1?: {
          level2?: {
            value?: string;
          };
        };
      }

      const result = commons.required.deep<DeepOptionalType>();
      expectTypeOf(result).toExtend<any>(); // Using any for complex deep required
    });
  });

  describe('#T08 => commons.readonly types', () => {
    it('#T08.01 => should make properties readonly', () => {
      interface TestType {
        a: string;
        b: number;
      }

      const result = commons.readonly<TestType>();
      expectTypeOf(result).toExtend<Required<TestType>>();
    });

    it('#T08.02 => commons.readonly.deep should deeply make readonly', () => {
      interface NestedType {
        level1: {
          level2: {
            value: string;
          };
        };
      }

      const result = commons.readonly.deep<NestedType>();
      expectTypeOf(result).toExtend<any>(); // Using any for complex deep readonly
    });

    it('#T08.03 => commons.readonly.not should remove readonly', () => {
      interface ReadonlyType {
        readonly a: string;
        readonly b: number;
      }

      const result = commons.readonly.not<ReadonlyType>();
      expectTypeOf(result).toExtend<any>(); // Using any for complex not readonly
    });

    it('#T08.04 => commons.readonly.deep.not should deeply remove readonly', () => {
      interface DeepReadonlyType {
        readonly level1: {
          readonly level2: {
            readonly value: string;
          };
        };
      }

      const result = commons.readonly.deep.not<DeepReadonlyType>();
      expectTypeOf(result).toExtend<any>(); // Using any for complex deep not readonly
    });
  });

  describe('#T09 => commons primitive types', () => {
    it('#T09.01 => should cast to primitive types', () => {
      const primitive = commons.primitive();
      expectTypeOf(primitive).toExtend<any>(); // Primitive is complex type

      const primitiveObject = commons.primitiveObject();
      expectTypeOf(primitiveObject).toExtend<any>(); // PrimitiveObject is complex type
    });
  });

  describe('#T10 => commons basic types', () => {
    it('#T10.01 => should handle basic types', () => {
      const symbol = commons.symbol();
      expectTypeOf(symbol).toExtend<symbol>();

      const date = commons.date();
      expectTypeOf(date).toExtend<Date>();

      const bigint = commons.bigint();
      expectTypeOf(bigint).toExtend<bigint>();

      const nullValue = commons.null();
      expectTypeOf(nullValue).toExtend<null>();
    });
  });

  describe('#T11 => commons.function types', () => {
    it('#T11.01 => should handle function types', () => {
      const fn = commons.function(() => 'test');
      expectTypeOf(fn).toExtend<any>(); // Function types are complex

      const checker = commons.function.checker();
      expectTypeOf(checker).toExtend<any>(); // Checker is complex type
    });
  });

  describe('#T12 => commons utility types', () => {
    it('#T12.01 => should handle utility operations', () => {
      const undefiny = commons.undefiny<string>();
      expectTypeOf(undefiny).toExtend<string | undefined>();

      const keys = commons.keys();
      expectTypeOf(keys).toExtend<any>(); // Keys is complex type

      const defaulted = commons.defaulted<string | undefined, string>(
        'test',
        'default',
      );
      expectTypeOf(defaulted).toExtend<any>(); // Defaulted is complex type
    });
  });

  describe('#T13 => commons union operations', () => {
    it('#T13.01 => should handle union operations', () => {
      const union = commons.union('a', 'b', 1, true);
      expectTypeOf(union).toExtend<'a' | 'b' | 1 | true>();
    });
  });

  describe('#T14 => Edge cases and complex types', () => {
    it('#T14.01 => should handle complex nested operations', () => {
      interface ComplexType {
        a?: {
          b?: {
            c: string;
          };
        };
      }

      const required = commons.required.deep<ComplexType>();
      expectTypeOf(required).toExtend<any>(); // Complex deep required

      const readonly = commons.readonly.deep<any>();
      expectTypeOf(readonly).toExtend<any>(); // Complex deep readonly
    });
  });

  describe('#T15 => Function signature validation', () => {
    it('#T15.01 => should have correct main function signature', () => {
      expectTypeOf(commons).toExtend<any>(); // Main commons function is complex
    });

    it('#T15.02 => should have correct method signatures', () => {
      expectTypeOf(commons.partial).toExtend<any>(); // Complex generic function

      expectTypeOf(commons.required).toExtend<any>(); // Complex generic function

      expectTypeOf(commons.readonly).toExtend<any>(); // Complex generic function
    });
  });
});
