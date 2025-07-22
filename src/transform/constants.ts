export const PRIMITIVES = [
  'string',
  'number',
  'boolean',
  'bigint',
  'symbol',
  'undefined',
  'null',
] as const;

export const PRIMITIVE_OBJECTS = ['object', 'date', 'primitive'] as const;

export const CUSTOM = '$$app-ts => custom$$' as const;
export const PARTIAL = '$$app-ts => partial$$' as const;
