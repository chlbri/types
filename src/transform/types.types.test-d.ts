import type { ObjectS } from './types.types';

const obj = {
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
    createdAt: 'string',
    updatedAt: 'string',
  },
} as const;

expectTypeOf(obj).toExtend<ObjectS>();

expectTypeOf('string' as const).toExtend<ObjectS>();

expectTypeOf('number' as const).toExtend<ObjectS>();

expectTypeOf('boolean' as const).toExtend<ObjectS>();

expectTypeOf('bigint' as const).toExtend<ObjectS>();

expectTypeOf('symbol' as const).toExtend<ObjectS>();

expectTypeOf('undefined' as const).toExtend<ObjectS>();

expectTypeOf('null' as const).toExtend<ObjectS>();
