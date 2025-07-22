# @bemedev/types

A comprehensive collection of utility TypeScript types and functions for
advanced type manipulation and runtime validation in modern TypeScript
applications.

<br/>

## Installation

```bash
npm install @bemedev/types
# or
yarn add @bemedev/types
# or
pnpm add @bemedev/types
```

<br/>

## Features

- **Castings**: Runtime functions for type casting, validation, and
  manipulation
- **Transform**: Schema-based object transformation with custom and partial
  support
- **Typings**: Compile-time type utilities for type-level operations
- **Types**: Advanced TypeScript utility types for complex type
  manipulations

- Complete support for arrays, objects, strings, numbers, booleans, and
  nullable values
- Deep readonly, partial, and required type transformations
- Union and intersection type utilities

<br/>

## Usage

### Basic Import

```typescript
import { castings, transform, typings, types } from '@bemedev/types';
```

### Castings Module

The `castings` module provides runtime functions for type validation and
manipulation:

#### Arrays

```typescript
import { castings } from '@bemedev/types';

// Array validation and casting
const isArray = castings.arrays.is([1, 2, 3]); // true
const arrayLength = castings.arrays.lengthOf(1, 2, 3); // 3
const reversed = castings.arrays.reverse(1, 2, 3); // [3, 2, 1]

// Tuple operations
const tuple = castings.arrays.tupleOf('a', 'b', 'c'); // ['a', 'b', 'c']
const fixedTuple = castings.arrays.tupleOf.number('item', 3); // ['item', 'item', 'item']

// Array filtering
const extracted = castings.arrays.extract([1, 2, 3, 4], 2, 4); // [2, 4]
const excluded = castings.arrays.exclude([1, 2, 3, 4], 2, 4); // [1, 3]
```

#### Objects

```typescript
// Object validation and manipulation
const isObject = castings.objects.is({ key: 'value' }); // true
const frozenObj = castings.objects.readonly({ mutable: true }); // Readonly<{mutable: true}>

// Deep operations
const deepReadonly = castings.objects.readonly.deep({
  nested: { value: 'test' },
}); // DeepReadonly<...>

// Object filtering
const picked = castings.objects.pick({ a: 1, b: 2, c: 3 }, 'a', 'c'); // { a: 1, c: 3 }
const omitted = castings.objects.omit({ a: 1, b: 2, c: 3 }, 'b'); // { a: 1, c: 3 }
```

#### Strings

```typescript
// String validation and manipulation
const isString = castings.strings.is('hello'); // true
const length = castings.strings.getLength('hello'); // 5
const uppercase = castings.strings.toUpperCase('hello'); // 'HELLO'
const lowercase = castings.strings.toLowerCase('WORLD'); // 'world'

// String composition
const joined = castings.strings.join(' ', 'hello', 'world'); // 'hello world'
const split = castings.strings.splitBy('a.b.c', '.'); // ['a', 'b', 'c']

// Letter validation
const isLetters = castings.strings.letters.is('abc'); // true
const isLowerLetters = castings.strings.letters.lower.is('abc'); // true
```

#### Numbers and Booleans

```typescript
// Number operations
const isNumber = castings.numbers.is(42); // true
const isDigit = castings.numbers.digit.is(5); // true
const numberString = castings.numbers.getString(123); // '123'

// Boolean operations
const isBoolean = castings.booleans.is(true); // true
const isTrue = castings.booleans.true.is(true); // true
const isFalse = castings.booleans.false.is(false); // true
```

#### Common Utilities

```typescript
// Type checking and casting
const isDefined = castings.commons.isDefined(value); // boolean
const isFunction = castings.commons.function.is(fn); // boolean

// Deep cloning
const cloned = castings.commons.clone(complexObject);

// Const assertion
const readonly = castings.commons.const({ key: 'value' }); // { readonly key: 'value' }

// Partial and required
const partial = castings.commons.partial.deep(obj); // DeepPartial<typeof obj>
const required = castings.commons.required.deep(obj); // DeepRequired<typeof obj>
```

### Transform Module

The `transform` module provides schema-based object transformation:

```typescript
import { transform } from '@bemedev/types';

// Basic schema transformation
const userSchema = {
  name: 'string',
  age: 'number',
  active: 'boolean',
};

const result = transform(userSchema);
// Returns: { name: undefined, age: undefined, active: undefined }

// Nested object transformation
const nestedSchema = {
  user: {
    profile: {
      name: 'string',
      settings: {
        theme: 'string',
        notifications: 'boolean',
      },
    },
  },
};

const nestedResult = transform(nestedSchema);
// Returns nested structure with undefined values

// Array transformation
const arraySchema = [
  { id: 'number', name: 'string' },
  { active: 'boolean', config: 'object' },
];

const arrayResult = transform(arraySchema as any);
// Returns array with transformed objects

// Custom values with transform.custom
const customSchema = {
  id: 'number',
  user: transform.custom({
    name: 'John',
    email: 'john@example.com',
  }),
  settings: transform.custom(['option1', 'option2']),
};

const customResult = transform(customSchema as any);
// Custom values are wrapped but preserved

// Partial transformation with transform.partial
const partialSchema = transform.partial({
  name: 'string',
  age: 'number',
  preferences: transform.custom(['dark', 'light']),
});

const partialResult = transform(partialSchema);
// Maintains original schema structure
```

### Typings Module

The `typings` module provides compile-time type utilities: All functions
return "undefined" or object with props undefined. Just use it for typings.

```typescript
import { typings } from '@bemedev/types';

// Array type operations (returns undefined but provides type information)
const arrayType = typings.arrays('a', 'b', 'c'); // Type: string[]
const tupleType = typings.arrays.tupleOf('a', 'b', 'c'); // Type: ['a', 'b', 'c']
const indexesType = typings.arrays.indexes('a', 'b', 'c'); // Type: [0, 1, 2]
const lengthType = typings.arrays.lengthOf(['a', 'b', 'c']); // Type: 3

// Object type operations
const objectType = typings.objects({ key: 'value' }); // Type: {key: string}
const keysType = typings.objects.keys({ a: 1, b: 2 }); // Type: ('a' | 'b')[]
const valuesType = typings.objects.values({ a: 1, b: 'test' }); // Type: (number | string)[]

// String type operations
const stringType = typings.strings('hello'); // Type: string
const lengthStringType = typings.strings.getLength('hello'); // Type: 5
const uppercaseType = typings.strings.toUpperCase('hello'); // Type: 'HELLO'

// Common type utilities
const partialType = typings.commons.partial({ a: 1, b: 'test' }); // Type: Partial<{a: number, b: string}>
const readonlyType = typings.commons.readonly({ mutable: true }); // Type: Readonly<{mutable: boolean}>
const requiredType = typings.commons.required({ optional?: string }); // Type: Required<{optional?: string}>
```

### Types Module

The `types` module exports advanced TypeScript utility types:

```typescript
import type { types } from '@bemedev/types';

// Array utility types
type Indices = types.IndexesOfArray<['a', 'b', 'c']>; // 0 | 1 | 2
type Reversed = types.ReverseArray<['a', 'b', 'c']>; // ['c', 'b', 'a']
type TupleLength = types.LengthOfArray<[1, 2, 3]>; // 3
type ArrayElement = types.ElementOfArray<string[]>; // string

// Object utility types
type ObjectKeys = types.KeysOfObject<{ a: 1; b: 2 }>; // 'a' | 'b'
type ObjectValues = types.ValuesOfObject<{ a: 1; b: 'test' }>; // 1 | 'test'
type DeepReadonly = types.DeepReadonly<{ nested: { value: string } }>;
type DeepPartial = types.DeepPartial<{ required: { field: string } }>;

// String utility types
type StringLength = types.LengthOfString<'hello'>; // 5
type Uppercase = types.Uppercase<'hello'>; // 'HELLO'
type Lowercase = types.Lowercase<'WORLD'>; // 'world'
type Split = types.Split<'a.b.c', '.'>; // ['a', 'b', 'c']

// Union and intersection types
type UnionToTuple = types.UnionToTuple<'a' | 'b' | 'c'>; // ['a', 'b', 'c']
type TupleToUnion = types.TupleToUnion<['a', 'b', 'c']>; // 'a' | 'b' | 'c'

// Utility types for complex operations
type Primitive = types.Primitive; // string | number | boolean | null | undefined
type NonNullable = types.NonNullable<string | null>; // string
type Defaulted = types.Defaulted<string | undefined, 'default'>; // string | 'default'

// Function types
type Checker<T> = types.Checker<T>; // (value: unknown) => value is T
type AsyncFunction = types.Fn<[string, number], Promise<boolean>>; // (arg1: string, arg2: number) => Promise<boolean>
```

### Complete Example

```typescript
import { castings, transform, typings, types } from '@bemedev/types';

// Define a user schema for transformation
const userSchema = {
  id: 'number',
  profile: {
    name: 'string',
    email: 'string',
    preferences: transform.custom({
      theme: 'dark',
      language: 'en',
    }),
  },
  roles: ['string'],
  metadata: transform.partial({
    createdAt: 'date',
    updatedAt: 'date',
  }),
};

// Transform the schema to get default structure
const defaultUser = transform(userSchema as any);

// Use castings for runtime validation
const validateUser = (data: unknown) => {
  if (!castings.objects.is(data)) return false;

  const obj = data as Record<string, any>;
  return (
    castings.numbers.is(obj.id) &&
    castings.objects.is(obj.profile) &&
    castings.strings.is(obj.profile.name) &&
    castings.arrays.is(obj.roles)
  );
};

// Use typings for type-level operations
type UserType = typeof userSchema;
type UserKeys = types.KeysOfObject<UserType>; // 'id' | 'profile' | 'roles' | 'metadata'

// Create a strongly typed user object
const createUser = (data: Partial<UserType>): UserType => {
  return castings.commons.defaulted(data, defaultUser) as UserType;
};
```

<br/>

## CHANGE_LOG

<details>

<summary>
...
</summary>

[CHANGE_LOG.md](https://github.com/chlbri/types/blob/master/CHANGE_LOG.md)

</details>

## License

MIT

<br/>

## Author

**chlbri** (bri_lvi@icloud.com)

[<img src="https://github.com/chlbri.png" width="50" height="50" style="border-radius: 50%;">](https://github.com/chlbri?tab=repositories)
[GitHub Profile](https://github.com/chlbri?tab=repositories)

## Links

- [NPM Package](https://www.npmjs.com/package/@bemedev/permissions)
- [GitHub Repository](https://github.com/chlbri/permissions)
- [Documentation](https://github.com/chlbri/permissions#readme)
- [Issues](https://github.com/chlbri/permissions/issues)

---

Made with ❤️ by [bemedev](https://bemedev.vercel.app)
