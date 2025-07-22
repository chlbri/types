import { expectTypeOf } from 'vitest';
import type {
  Checker,
  Checker2,
  DeepNotReadonly,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  Defaulted,
  Fn,
  Neverify,
  NotReadonly,
  NotUndefined,
  Primitive,
  PrimitiveObject,
} from '../types/types';
import { _unknown, castFn, commons } from './commons';

/**
 * Tests de types pour toutes les sous-fonctions de commons
 * Ces tests vérifient que les types sont correctement inférés et appliqués
 */
describe('Commons Type Tests', () => {
  describe('#T01 => castFn types', () => {
    it('#T01.01 => should return typed function with extensions', () => {
      const fn = castFn<string>()({
        validate: (x: string) => x.length > 0,
      });

      expectTypeOf(fn).toExtend<{
        (arg: string): string;
        forceCast(arg: unknown): string;
        dynamic<U extends string>(arg: U): U;
        validate: (x: string) => boolean;
      }>();
    });

    it('#T01.02 => should work without extensions', () => {
      const fn = castFn<number>()();

      expectTypeOf(fn).toExtend<{
        (arg: number): number;
        forceCast(arg: unknown): number;
        dynamic<U extends number>(arg: U): U;
      }>();
    });
  });

  describe('#T02 => _unknown types', () => {
    it('#T02.01 => should cast to specified type', () => {
      const value = _unknown<string>('test');
      expectTypeOf(value).toEqualTypeOf<string>();

      const obj = _unknown<{ a: number }>({ a: 1 });
      expectTypeOf(obj).toEqualTypeOf<{ a: number }>();
    });

    it('#T02.02 => should return undefined when no argument', () => {
      const value = _unknown<string>();
      expectTypeOf(value).toEqualTypeOf<string>();
    });
  });

  describe('#T03 => commons main function types', () => {
    it('#T03.01 => should cast to specified type', () => {
      const value = commons<string>('test');
      expectTypeOf(value).toEqualTypeOf<string>();

      const obj = commons<{ a: number }>({ a: 1 });
      expectTypeOf(obj).toEqualTypeOf<{ a: number }>();
    });
  });

  describe('#T04 => commons.partial types', () => {
    it('#T04.01 => should return Partial type', () => {
      interface User {
        name: string;
        age: number;
        email: string;
      }

      const fullUser: User = {
        name: 'John',
        age: 30,
        email: 'john@example.com',
      };

      const partialUser = commons.partial(fullUser);
      expectTypeOf(partialUser).toEqualTypeOf<Partial<User>>();
    });

    it('#T04.02 => commons.partial.deep should return DeepPartial type', () => {
      interface NestedUser {
        profile: {
          name: string;
          settings: {
            theme: string;
            notifications: boolean;
          };
        };
        metadata: {
          created: Date;
          updated: Date;
        };
      }

      const fullUser: NestedUser = {
        profile: {
          name: 'John',
          settings: {
            theme: 'dark',
            notifications: true,
          },
        },
        metadata: {
          created: new Date(),
          updated: new Date(),
        },
      };

      const deepPartial = commons.partial.deep(fullUser);
      expectTypeOf(deepPartial).toEqualTypeOf<DeepPartial<NestedUser>>();
    });
  });

  describe('#T05 => commons.const types', () => {
    it('#T05.01 => should preserve literal types', () => {
      const literalString = commons.const('hello' as const);
      expectTypeOf(literalString).toEqualTypeOf<'hello'>();

      const literalNumber = commons.const(42 as const);
      expectTypeOf(literalNumber).toEqualTypeOf<42>();

      const literalObject = commons.const({
        type: 'user',
        id: 123,
      } as const);
      expectTypeOf(literalObject).toEqualTypeOf<{
        readonly type: 'user';
        readonly id: 123;
      }>();
    });
  });

  describe('#T06 => commons.clone types', () => {
    it('#T06.01 => should return same type as input for primitive objects', () => {
      const primitiveObject = {
        id: 1,
        name: 'test',
        active: true,
        values: [1, 2, 3],
        nested: {
          prop: 'value',
        },
      };

      const cloned = commons.clone(primitiveObject);
      expectTypeOf(cloned).toEqualTypeOf<typeof primitiveObject>();
    });
  });

  describe('#T07 => commons.identity types', () => {
    it('#T07.01 => should preserve exact input type', () => {
      const string = commons.identity('test');
      expectTypeOf(string).toEqualTypeOf<string>();

      const number = commons.identity(42);
      expectTypeOf(number).toEqualTypeOf<number>();

      const obj = commons.identity({ a: 1, b: 'test' });
      expectTypeOf(obj).toEqualTypeOf<{ a: number; b: string }>();
    });
  });

  describe('#T08 => commons type guards', () => {
    it('#T08.01 => commons.isDefined should narrow types', () => {
      const value: string | null | undefined = 'test';

      if (commons.isDefined(value)) {
        expectTypeOf(value).toEqualTypeOf<string>();
      }
    });

    it('#T08.02 => commons.isUndefined should be type guard', () => {
      expectTypeOf(commons.isUndefined).toEqualTypeOf<
        (value: unknown) => value is undefined
      >();
    });

    it('#T08.03 => commons.isNull should be type guard', () => {
      expectTypeOf(commons.isNull).toEqualTypeOf<
        (value: unknown) => value is null
      >();
    });
  });

  describe('#T09 => commons.any types', () => {
    it('#T09.01 => should accept any type and return any', () => {
      const result = commons.any('anything');
      expectTypeOf(result).toEqualTypeOf<any>();

      const forceCasted = commons.any.forceCast(123);
      expectTypeOf(forceCasted).toEqualTypeOf<any>();

      // Test dynamic typing
      expectTypeOf(commons.any.dynamic).toExtend<<U>(arg: U) => U>();
    });
  });

  describe('#T10 => commons.neverify types', () => {
    it('#T10.01 => should convert type to never-based type', () => {
      interface TestType {
        a: string;
        b: number;
      }

      const neverified = commons.neverify<TestType>({ a: 'test', b: 42 });
      expectTypeOf(neverified).toEqualTypeOf<Neverify<TestType>>();
    });
  });

  describe('#T11 => commons.required types', () => {
    it('#T11.01 => should remove undefined from type', () => {
      interface OptionalUser {
        name?: string;
        age?: number;
        email: string;
      }

      const required = commons.required<OptionalUser>({
        name: 'John',
        age: 30,
        email: 'john@example.com',
      });

      expectTypeOf(required).toEqualTypeOf<NotUndefined<OptionalUser>>();
    });

    it('#T11.02 => commons.required.deep should deeply remove undefined', () => {
      interface DeepOptional {
        user?: {
          profile?: {
            name?: string;
            settings?: {
              theme?: string;
            };
          };
        };
      }

      const deepRequired = commons.required.deep<DeepOptional>({
        user: {
          profile: {
            name: 'John',
            settings: {
              theme: 'dark',
            },
          },
        },
      });

      expectTypeOf(deepRequired).toEqualTypeOf<
        DeepRequired<DeepOptional>
      >();
    });
  });

  describe('#T12 => commons.readonly types', () => {
    it('#T12.01 => should make type readonly', () => {
      interface MutableUser {
        name: string;
        age: number;
      }

      const readonly = commons.readonly<MutableUser>({
        name: 'John',
        age: 30,
      });

      expectTypeOf(readonly).toEqualTypeOf<Readonly<MutableUser>>();
    });

    it('#T12.02 => commons.readonly.deep should deeply make readonly', () => {
      interface DeepMutable {
        user: {
          profile: {
            name: string;
            settings: {
              theme: string;
            };
          };
        };
      }

      const deepReadonly = commons.readonly.deep<DeepMutable>({
        user: {
          profile: {
            name: 'John',
            settings: {
              theme: 'dark',
            },
          },
        },
      });

      expectTypeOf(deepReadonly).toEqualTypeOf<
        DeepReadonly<DeepMutable>
      >();
    });

    it('#T12.03 => commons.readonly.not should remove readonly', () => {
      interface ReadonlyUser {
        readonly name: string;
        readonly age: number;
      }

      const notReadonly = commons.readonly.not<ReadonlyUser>({
        name: 'John',
        age: 30,
      });

      expectTypeOf(notReadonly).toEqualTypeOf<NotReadonly<ReadonlyUser>>();
    });

    it('#T12.04 => commons.readonly.deep.not should deeply remove readonly', () => {
      interface DeepReadonly {
        readonly user: {
          readonly profile: {
            readonly name: string;
          };
        };
      }

      const deepNotReadonly = commons.readonly.deep.not<DeepReadonly>({
        user: {
          profile: {
            name: 'John',
          },
        },
      });

      expectTypeOf(deepNotReadonly).toEqualTypeOf<
        DeepNotReadonly<DeepReadonly>
      >();
    });
  });

  describe('#T13 => commons.primitive types', () => {
    it('#T13.01 => should work with primitive types', () => {
      const primitiveString = commons.primitive('test');
      expectTypeOf(primitiveString).toEqualTypeOf<Primitive>();

      const primitiveNumber = commons.primitive(42);
      expectTypeOf(primitiveNumber).toEqualTypeOf<Primitive>();

      const forceCasted = commons.primitive.forceCast({
        not: 'primitive',
      });
      expectTypeOf(forceCasted).toEqualTypeOf<Primitive>();

      // Test dynamic typing
      expectTypeOf(commons.primitive.dynamic).toExtend<
        <U extends Primitive>(arg: U) => U
      >();
    });

    it('#T13.02 => commons.primitive.is should be type guard', () => {
      const value: unknown = 'test';

      if (commons.primitive.is(value)) {
        expectTypeOf(value).toEqualTypeOf<Primitive>();
      }
    });
  });

  describe('#T14 => commons.primitiveObject types', () => {
    it('#T14.01 => should work with primitive object types', () => {
      const primitiveObj = commons.primitiveObject({
        name: 'John',
        age: 30,
        active: true,
      });
      expectTypeOf(primitiveObj).toEqualTypeOf<PrimitiveObject>();

      const forceCasted = commons.primitiveObject.forceCast({
        complex: new Date(),
      });
      expectTypeOf(forceCasted).toEqualTypeOf<PrimitiveObject>();

      // Test dynamic typing
      expectTypeOf(commons.primitiveObject.dynamic).toExtend<
        <U extends PrimitiveObject>(arg: U) => U
      >();
    });

    it('#T14.02 => commons.primitiveObject.is should be type guard', () => {
      const value: unknown = { a: 1, b: 'test' };

      if (commons.primitiveObject.is(value)) {
        expectTypeOf(value).toEqualTypeOf<PrimitiveObject>();
      }
    });
  });

  describe('#T15 => commons.function types', () => {
    it('#T15.01 => should return identity function with correct type', () => {
      const result = commons.function(42, 'test');
      expectTypeOf(result).toExtend<(...args: any[]) => any>();
    });

    it('#T15.02 => commons.function.is should be type guard', () => {
      const value: unknown = () => 'test';

      if (commons.function.is(value)) {
        expectTypeOf(value).toEqualTypeOf<Fn>();
      }
    });

    it('#T15.03 => commons.function.is.strict should be typed type guard', () => {
      const checker = (fn: unknown): fn is (x: string) => string =>
        typeof fn === 'function';

      const strictChecker = commons.function.is.strict(checker);
      expectTypeOf(strictChecker).toExtend<
        (value: unknown) => value is (x: string) => string
      >();
    });

    it('#T15.04 => commons.function.forceCast should type cast', () => {
      const notAFunction = 'not a function';
      const casted = commons.function.forceCast<[string], number>(
        notAFunction,
      );
      expectTypeOf(casted).toEqualTypeOf<Fn<[string], number>>();
    });

    it('#T15.05 => commons.function.dynamic should preserve function type', () => {
      const fn = (x: number, y: string) => `${x}-${y}`;
      const dynamic = commons.function.dynamic(fn);
      expectTypeOf(dynamic).toEqualTypeOf<typeof fn>();
    });
  });

  describe('#T16 => commons.function.checker types', () => {
    it('#T16.01 => should work with checker functions', () => {
      const checker = (value: unknown): value is string =>
        typeof value === 'string';

      const result = commons.function.checker(checker);
      expectTypeOf(result).toEqualTypeOf<Checker>();

      const forceCasted = commons.function.checker.forceCast(checker);
      expectTypeOf(forceCasted).toEqualTypeOf<Checker>();

      const dynamic = commons.function.checker.dynamic(checker);
      expectTypeOf(dynamic).toEqualTypeOf<typeof checker>();
    });

    it('#T16.02 => commons.function.checker.is should be type guard', () => {
      const value: unknown = (x: any) => typeof x === 'string';

      if (commons.function.checker.is(value)) {
        expectTypeOf(value).toEqualTypeOf<Checker2<unknown>>();
      }
    });

    it('#T16.03 => commons.function.checker.byType should preserve checker type', () => {
      const stringChecker = (value: unknown): value is string =>
        typeof value === 'string';

      const byType = commons.function.checker.byType(stringChecker);
      expectTypeOf(byType).toEqualTypeOf<typeof stringChecker>();

      const forceCasted =
        commons.function.checker.byType.forceCast<string>(stringChecker);
      expectTypeOf(forceCasted).toEqualTypeOf<Checker2<string>>();
    });
  });

  describe('#T17 => commons.symbol types', () => {
    it('#T17.01 => should work with symbol types', () => {
      const sym = commons.symbol(Symbol('test'));
      expectTypeOf(sym).toEqualTypeOf<symbol>();

      const forceCasted = commons.symbol.forceCast('not a symbol');
      expectTypeOf(forceCasted).toEqualTypeOf<symbol>();

      const dynamic = commons.symbol.dynamic(Symbol('dynamic'));
      expectTypeOf(dynamic).toEqualTypeOf<symbol>();
    });

    it('#T17.02 => commons.symbol.is should be type guard', () => {
      const value: unknown = Symbol('test');

      if (commons.symbol.is(value)) {
        expectTypeOf(value).toEqualTypeOf<symbol>();
      }
    });
  });

  describe('#T18 => commons.date types', () => {
    it('#T18.01 => should work with Date types', () => {
      const date = commons.date(new Date());
      expectTypeOf(date).toEqualTypeOf<Date>();

      const forceCasted = commons.date.forceCast('not a date');
      expectTypeOf(forceCasted).toEqualTypeOf<Date>();

      const dynamic = commons.date.dynamic(new Date());
      expectTypeOf(dynamic).toEqualTypeOf<Date>();
    });

    it('#T18.02 => commons.date.is should be type guard', () => {
      const value: unknown = new Date();

      if (commons.date.is(value)) {
        expectTypeOf(value).toEqualTypeOf<Date>();
      }
    });
  });

  describe('#T19 => commons.unknown types', () => {
    it('#T19.01 => should cast to specified type', () => {
      const stringValue = commons.unknown<string>('test');
      expectTypeOf(stringValue).toEqualTypeOf<string>();

      const objectValue = commons.unknown<{ a: number }>({ a: 1 });
      expectTypeOf(objectValue).toEqualTypeOf<{ a: number }>();
    });
  });

  describe('#T20 => commons.undefiny types', () => {
    it('#T20.01 => should handle optional values', () => {
      const defined = commons.undefiny('test');
      expectTypeOf(defined).toEqualTypeOf<string | undefined>();

      const undefined_val = commons.undefiny<string>();
      expectTypeOf(undefined_val).toEqualTypeOf<string | undefined>();
    });
  });

  describe('#T21 => commons.defaulted types', () => {
    it('#T21.01 => should combine value and default types correctly', () => {
      // When value is string | null, default is string
      const result1 = commons.defaulted(
        'test' as string | null,
        'default',
      );
      expectTypeOf(result1).toEqualTypeOf<
        Defaulted<string | null, 'default'>
      >();

      // When value is number | undefined, default is number
      const result2 = commons.defaulted(42 as number | undefined, 0);
      expectTypeOf(result2).toEqualTypeOf<
        Defaulted<number | undefined, 0>
      >();

      // When value is object | null | undefined, default is object
      const defaultObj = { a: 1, b: 'test' } as const;
      const result3 = commons.defaulted(
        null as { x: number } | null | undefined,
        defaultObj,
      );
      expectTypeOf(result3).toEqualTypeOf<
        Defaulted<{ x: number } | null | undefined, typeof defaultObj>
      >();
    });

    it('#T21.02 => should work with complex union types', () => {
      interface User {
        name: string;
        age: number;
      }

      interface DefaultUser {
        name: string;
        age: number;
        role: 'guest';
      }

      const defaultUser: DefaultUser = {
        name: 'Anonymous',
        age: 0,
        role: 'guest',
      };

      const result = commons.defaulted(
        null as User | null | undefined,
        defaultUser,
      );

      expectTypeOf(result).toEqualTypeOf<
        Defaulted<User | null | undefined, DefaultUser>
      >();
    });
  });

  describe('#T22 => commons constants types', () => {
    it('#T22.01 => should have correct constant types', () => {
      expectTypeOf(commons.undefined).toEqualTypeOf<undefined>();
      expectTypeOf(commons.null).toEqualTypeOf<null>();
    });
  });

  describe('#T23 => Complex type combinations', () => {
    it('#T23.01 => should work with chained type operations', () => {
      interface ComplexUser {
        profile?: {
          name?: string;
          settings?: {
            theme?: 'light' | 'dark';
            notifications?: boolean;
          };
        };
        metadata: {
          created: Date;
          updated?: Date;
        };
      }

      // Test chained operations
      const required = commons.required.deep<ComplexUser>({
        profile: {
          name: 'John',
          settings: {
            theme: 'dark',
            notifications: true,
          },
        },
        metadata: {
          created: new Date(),
          updated: new Date(),
        },
      });

      expectTypeOf(required).toEqualTypeOf<DeepRequired<ComplexUser>>();

      const readonly = commons.readonly.deep(required);
      expectTypeOf(readonly).toEqualTypeOf<
        DeepReadonly<DeepRequired<ComplexUser>>
      >();
    });

    it('#T23.02 => should work with function type combinations', () => {
      type StringChecker = (value: unknown) => value is string;
      type NumberChecker = (value: unknown) => value is number;

      const stringChecker: StringChecker = (value): value is string =>
        typeof value === 'string';
      const numberChecker: NumberChecker = (value): value is number =>
        typeof value === 'number';

      // Type combinations with function checkers
      const typedStringChecker =
        commons.function.checker.byType(stringChecker);
      expectTypeOf(typedStringChecker).toEqualTypeOf<StringChecker>();

      const forceCastedNumberChecker =
        commons.function.checker.byType.forceCast<number>(numberChecker);
      expectTypeOf(forceCastedNumberChecker).toEqualTypeOf<
        Checker2<number>
      >();
    });

    it('#T23.03 => should handle recursive type structures', () => {
      interface TreeNode {
        value: string;
        children?: TreeNode[];
        parent?: TreeNode;
      }

      const tree: TreeNode = {
        value: 'root',
        children: [
          {
            value: 'child1',
            children: [],
          },
          {
            value: 'child2',
          },
        ],
      };

      // Test partial deep with recursive structures
      const partialTree = commons.partial.deep(tree);
      expectTypeOf(partialTree).toEqualTypeOf<DeepPartial<TreeNode>>();

      // Test readonly deep with recursive structures
      const readonlyTree = commons.readonly.deep(tree);
      expectTypeOf(readonlyTree).toEqualTypeOf<DeepReadonly<TreeNode>>();
    });
  });

  describe('#T24 => Error cases and edge types', () => {
    it('#T24.01 => should handle never type', () => {
      const neverValue = commons<never>(null as never);
      expectTypeOf(neverValue).toEqualTypeOf<never>();
    });

    it('#T24.02 => should handle unknown type', () => {
      const unknownValue = commons<unknown>('anything');
      expectTypeOf(unknownValue).toEqualTypeOf<unknown>();
    });

    it('#T24.03 => should handle any type', () => {
      const anyValue = commons<any>('anything');
      expectTypeOf(anyValue).toEqualTypeOf<any>();
    });

    it('#T24.04 => should handle void type', () => {
      const voidValue = commons<void>(undefined);
      expectTypeOf(voidValue).toEqualTypeOf<void>();
    });
  });

  describe('#T25 => Generic type parameters', () => {
    it('#T25.01 => should preserve generic constraints', () => {
      interface Identifiable {
        id: string;
      }

      function processIdentifiable<T extends Identifiable>(item: T): T {
        return commons.identity(item);
      }

      const user = { id: '1', name: 'John', age: 30 };
      const processed = processIdentifiable(user);

      expectTypeOf(processed).toEqualTypeOf<typeof user>();
    });

    it('#T25.02 => should work with conditional types', () => {
      type StringOrNumber<T> = T extends string ? string : number;

      const stringResult = commons<StringOrNumber<string>>('test');
      expectTypeOf(stringResult).toEqualTypeOf<string>();

      const numberResult = commons<StringOrNumber<boolean>>(42);
      expectTypeOf(numberResult).toEqualTypeOf<number>();
    });
  });

  describe('#T26 => Additional specific methods and edge cases', () => {
    it('#T26.01 => should test specific readonly.deep.not signature', () => {
      interface DeeplyReadonlyStructure {
        readonly level1: {
          readonly level2: {
            readonly items: readonly string[];
            readonly config: {
              readonly enabled: boolean;
            };
          };
        };
      }

      const deepReadonly: DeeplyReadonlyStructure = {
        level1: {
          level2: {
            items: ['a', 'b'],
            config: {
              enabled: true,
            },
          },
        },
      };

      const notReadonly = commons.readonly.deep.not(deepReadonly);
      expectTypeOf(notReadonly).toEqualTypeOf<
        DeepNotReadonly<DeeplyReadonlyStructure>
      >();
    });

    it('#T26.02 => should test commons.function.is.strict with specific function type', () => {
      type AsyncStringProcessor = (input: string) => Promise<string>;

      const asyncChecker = (fn: unknown): fn is AsyncStringProcessor =>
        typeof fn === 'function';

      const strictAsyncChecker = commons.function.is.strict(asyncChecker);
      expectTypeOf(strictAsyncChecker).toExtend<
        (value: unknown) => value is AsyncStringProcessor
      >();
    });

    it('#T26.03 => should test commons.function.checker.byType with complex checker', () => {
      interface ComplexValidator {
        (value: unknown): value is {
          id: string;
          metadata: Record<string, any>;
        };
      }

      const complexChecker: ComplexValidator = (
        value,
      ): value is {
        id: string;
        metadata: Record<string, any>;
      } => {
        return (
          typeof value === 'object' && value !== null && 'id' in value
        );
      };

      const byTypeChecker =
        commons.function.checker.byType(complexChecker);
      expectTypeOf(byTypeChecker).toEqualTypeOf<ComplexValidator>();
    });

    it('#T26.04 => should test commons.defaulted with complex nested types', () => {
      interface ComplexConfig {
        api: {
          endpoints: {
            users: string;
            posts: string;
          };
          timeout: number;
        };
        ui: {
          theme: 'light' | 'dark';
          language: string;
        };
      }

      const defaultConfig: ComplexConfig = {
        api: {
          endpoints: {
            users: '/api/users',
            posts: '/api/posts',
          },
          timeout: 5000,
        },
        ui: {
          theme: 'light',
          language: 'en',
        },
      };

      const result = commons.defaulted(
        null as ComplexConfig | null | undefined,
        defaultConfig,
      );

      expectTypeOf(result).toEqualTypeOf<
        Defaulted<ComplexConfig | null | undefined, ComplexConfig>
      >();
    });

    it('#T26.05 => should test commons.primitive and commons.primitiveObject with union types', () => {
      type PrimitiveUnion = string | number | boolean;

      const primitiveValue = commons.primitive('test' as PrimitiveUnion);
      expectTypeOf(primitiveValue).toEqualTypeOf<Primitive>();

      // Test with valid primitive object types
      const primitiveObjValue = commons.primitiveObject({
        name: 'test',
        id: 123,
      });
      expectTypeOf(primitiveObjValue).toEqualTypeOf<PrimitiveObject>();
    });

    it('#T26.06 => should test commons.symbol with specific symbol types', () => {
      const uniqueSymbol = Symbol.for('unique');
      const symbolValue = commons.symbol(uniqueSymbol);
      expectTypeOf(symbolValue).toEqualTypeOf<symbol>();

      // Test with symbol guard
      const unknownValue: unknown = Symbol('test');
      if (commons.symbol.is(unknownValue)) {
        expectTypeOf(unknownValue).toEqualTypeOf<symbol>();
      }
    });

    it('#T26.07 => should test commons.date with various Date scenarios', () => {
      const now = new Date();
      const dateValue = commons.date(now);
      expectTypeOf(dateValue).toEqualTypeOf<Date>();

      // Test date guard with unknown value
      const unknownDate: unknown = new Date('2023-01-01');
      if (commons.date.is(unknownDate)) {
        expectTypeOf(unknownDate).toEqualTypeOf<Date>();
      }
    });

    it('#T26.08 => should test commons.undefiny with complex optional patterns', () => {
      interface OptionalNested {
        user?: {
          profile?: {
            avatar?: string;
          };
        };
      }

      const undefinedNested = commons.undefiny<OptionalNested>({
        user: {
          profile: {
            avatar: 'avatar.jpg',
          },
        },
      });

      expectTypeOf(undefinedNested).toEqualTypeOf<
        OptionalNested | undefined
      >();

      // Test without argument
      const undefinedValue = commons.undefiny<string>();
      expectTypeOf(undefinedValue).toEqualTypeOf<string | undefined>();
    });

    it('#T26.09 => should test complex type guard combinations', () => {
      // Test combined type guards
      const value: unknown = 'test';

      if (commons.isDefined(value) && commons.primitive.is(value)) {
        expectTypeOf(value).toExtend<Primitive>();
      }

      const complexValue: unknown = { name: 'John', age: 30 };
      if (
        commons.isDefined(complexValue) &&
        commons.primitiveObject.is(complexValue)
      ) {
        expectTypeOf(complexValue).toExtend<PrimitiveObject>();
      }
    });

    it('#T26.10 => should test function type combinations with generics', () => {
      const simpleProcessor = (input: string) => input.length;

      const functionResult = commons.function.dynamic(simpleProcessor);
      expectTypeOf(functionResult).toEqualTypeOf<typeof simpleProcessor>();

      // Test function force cast
      const forceCasted = commons.function.forceCast<[string], number>(
        'not a function',
      );
      expectTypeOf(forceCasted).toEqualTypeOf<Fn<[string], number>>();
    });
  });
});
