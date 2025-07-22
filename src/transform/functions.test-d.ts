import type { PrimitiveObject } from '../types/commons.types';
import { transform } from './functions';
import type { Custom, ObjectS } from './types.types';

// Test des types primitifs
const stringSchema = 'string' as const;
const numberSchema = 'number' as const;
const booleanSchema = 'boolean' as const;
const bigintSchema = 'bigint' as const;
const symbolSchema = 'symbol' as const;
const undefinedSchema = 'undefined' as const;
const nullSchema = 'null' as const;

// Tests pour les primitifs
expectTypeOf(transform(stringSchema)).toEqualTypeOf<string>();
expectTypeOf(transform(numberSchema)).toEqualTypeOf<number>();
expectTypeOf(transform(booleanSchema)).toEqualTypeOf<boolean>();
expectTypeOf(transform(bigintSchema)).toEqualTypeOf<bigint>();
expectTypeOf(transform(symbolSchema)).toEqualTypeOf<symbol>();
expectTypeOf(transform(undefinedSchema)).toEqualTypeOf<undefined>();
expectTypeOf(transform(nullSchema)).toEqualTypeOf<null>();

// Test des objets primitifs spéciaux
const objectSchema = 'object' as const;
const dateSchema = 'date' as const;
const primitiveSchema = 'primitive' as const;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
expectTypeOf(transform(objectSchema)).toEqualTypeOf<{}>();
expectTypeOf(transform(dateSchema)).toEqualTypeOf<Date>();
expectTypeOf(transform(primitiveSchema)).toEqualTypeOf<PrimitiveObject>();

// Test d'objets complexes

type ExpectedComplexType = {
  name: string;
  age: number;
  isActive: boolean;
  details: {
    height: number;
    weight: number;
    hobbies: {
      hobby1: string;
      hobby2: string;
    };
  };
  metadata: {
    createdAt: Date;
    updatedAt: string;
  };
};

expectTypeOf(
  transform({
    name: 'string',
    age: 'number',
    isActive: 'boolean',
    details: {
      height: 'number',
      weight: 'number',
      hobbies: {
        hobby1: 'string',
        hobby2: 'string',
      },
    },
    metadata: {
      createdAt: 'date',
      updatedAt: 'string',
    },
  }),
).toExtend<ExpectedComplexType>();

// Test que la fonction accepte les types ObjectS
const validSchema: ObjectS = {
  test: 'string',
} as const;

expectTypeOf(validSchema).toExtend<ObjectS>();
const transformedSchema = transform(validSchema);
expectTypeOf(transformedSchema).not.toBeAny();

// Test avec des objets imbriqués plus complexes
type ExpectedNestedType = {
  user: {
    profile: {
      personal: {
        name: string;
        age: number;
      };
      professional: {
        title: string;
        company: string;
        startDate: Date;
      };
    };
    preferences: {
      theme: string;
      notifications: boolean;
    };
  };
  settings: {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    privacy: {};
    security: PrimitiveObject;
  };
};

expectTypeOf(
  transform({
    user: {
      profile: {
        personal: {
          name: 'string',
          age: 'number',
        },
        professional: {
          title: 'string',
          company: 'string',
          startDate: 'date',
        },
      },
      preferences: {
        theme: 'string',
        notifications: 'boolean',
      },
    },
    settings: {
      privacy: 'object',
      security: 'primitive',
    },
  }),
).toEqualTypeOf<ExpectedNestedType>();

// Test de typage générique const
const constSchema = {
  status: 'string',
  count: 'number',
} as const;

// Vérifier que le type const est préservé
expectTypeOf(constSchema).toMatchTypeOf<ObjectS>();
expectTypeOf(transform(constSchema)).toMatchTypeOf<{
  status: string;
  count: number;
}>();

// Test avec des types mixtes simples
expectTypeOf(
  transform({
    id: 'number',
    name: 'string',
    active: 'boolean',
    created: 'date',
    config: 'object',
    data: 'primitive',
  }),
).toEqualTypeOf<{
  id: number;
  name: string;
  active: boolean;
  created: Date;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  config: {};
  data: PrimitiveObject;
}>();

expectTypeOf(
  transform.const({
    id: 'number',
    name: 'string',
    active: 'boolean',
    created: 'date',
    config: 'object',
    data: 'primitive',
  }),
).toEqualTypeOf<{
  readonly id: number;
  readonly name: string;
  readonly active: boolean;
  readonly created: Date;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  readonly config: {};
  readonly data: PrimitiveObject;
}>();

// Tests pour transform.tuple
// transform.tuple retourne un tableau transformé
expectTypeOf(transform.tuple('string', 'number', 'boolean')).toEqualTypeOf<
  (string | number | boolean)[]
>();

expectTypeOf(
  transform.tuple({ name: 'string', age: 'number' }, 'boolean', {
    test: 'number',
  }),
).toEqualTypeOf<
  ({ name: string; age: number } | boolean | { test: number })[]
>();

expectTypeOf(transform.tuple('string')).toEqualTypeOf<string[]>();

expectTypeOf(
  transform.tuple({ nested: { value: 'string' } }, ['string']),
).toEqualTypeOf<({ nested: { value: string } } | string[])[]>();

// Tests additionnels pour transform.tuple avec des tableaux
expectTypeOf(
  transform.tuple(['string'], ['number'], { items: ['boolean'] }),
).toEqualTypeOf<(string[] | number[] | { items: boolean[] })[]>();

// Tests additionnels pour transform.tuple avec des primitifs
expectTypeOf(transform.tuple('string', 'number', 'boolean')).toEqualTypeOf<
  (string | number | boolean)[]
>();

// Tests pour transform.union
// transform.union retourne un objet Custom avec le type union

expectTypeOf(transform.union('string', 'number')).toEqualTypeOf<
  Custom<string | number>
>();

expectTypeOf(
  transform.union({ name: 'string' }, { age: 'number' }, 'boolean'),
).toEqualTypeOf<Custom<{ name: string } | { age: number } | boolean>>();

expectTypeOf(transform.union('string')).toEqualTypeOf<Custom<string>>();

expectTypeOf(
  transform.union({ user: { name: 'string' } }, ['string'], 'date'),
).toEqualTypeOf<Custom<{ user: { name: string } } | string[] | Date>>();

// Tests additionnels pour transform.union avec des tableaux
expectTypeOf(
  transform.union(['string'], ['number'], { items: ['boolean'] }),
).toEqualTypeOf<Custom<string[] | number[] | { items: boolean[] }>>();

// Tests additionnels pour transform.union avec des primitifs
expectTypeOf(transform.union('string', 'number', 'boolean')).toEqualTypeOf<
  Custom<string | number | boolean>
>();

// Tests pour transform.union avec types spéciaux
expectTypeOf(
  transform.union('object', 'primitive', 'date'),
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
).toEqualTypeOf<Custom<{} | PrimitiveObject | Date>>();

// Tests pour transform.tuple avec cas mixtes primitifs/objets
expectTypeOf(
  transform.tuple('string', { name: 'string' }, 'date', ['number']),
).toEqualTypeOf<(string | { name: string } | Date | number[])[]>();

// Tests pour transform.tuple avec types complexes
expectTypeOf(
  transform.tuple(
    {
      metadata: { created: 'date', updated: 'string' },
      data: { values: ['number'] },
    },
    'primitive',
    { status: 'boolean' },
  ),
).toEqualTypeOf<
  (
    | {
        metadata: { created: Date; updated: string };
        data: { values: number[] };
      }
    | PrimitiveObject
    | { status: boolean }
  )[]
>();
