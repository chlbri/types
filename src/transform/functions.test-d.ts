import type { PrimitiveObject } from '../types/commons.types';
import { transform } from './functions';
import type { ObjectS } from './types.types';

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
