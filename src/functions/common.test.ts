import { createTests } from '@bemedev/vitest-extended';
import type { TestArgs } from '@bemedev/vitest-extended/lib/types';
import { t } from './common';

describe('#1 => t.anify & t.identity & notUndefined & constants', () => {
  const { success } = createTests(t.unknown);
  const CONSTANTS = [
    'string',
    'number',
    'date',
    'boolean',
    'null',
    'symbol',
    'bigint',
    'function',
    'object',
  ] as const;

  const cTests = CONSTANTS.map(c => ({
    invite: `CONSTANTS => ${c}`,
    parameters: [],
    expected: t[c],
  })) as TestArgs<(arg?: any) => any>;

  describe(
    'success',
    success(
      {
        invite: 'undefined',
        parameters: [undefined],
        expected: t.undefined,
      },
      {
        invite: 'string',
        parameters: ['string'],
        expected: t.identity('string'),
      },
      {
        invite: 'boolean',
        parameters: [true],
        expected: t.notUndefined(true),
      },
      {
        invite: 'object',
        parameters: [{ a: 1, b: { c: 'str' } }],
        expected: t.identity({ a: 1, b: { c: 'str' } }),
      },
      ...cTests,
    ),
  );
});

describe('#2 => t.buildObject & t.undefiny & t.notReadOnly & t.notUndifined & t.readonly', () => {
  const tests = [
    {
      invite: 'simple object',
      parameters: [{ a: 1 }],
      expected: { a: 1 },
    },
    {
      invite: 'complex object',
      parameters: [{ a: 1, b: { c: 'str' } }],
      expected: { a: 1, b: { c: 'str' } },
    },
  ] satisfies TestArgs<(arg: any) => any>;

  const eachs = t.tuple(
    'notReadOnly',
    'readonly',
    'buildObject',
    'partial',
    'notUndefined',
    'deepPartial',
    'neverify',
    'deepNotUndefined',
    'identity',
  );

  describe.each(eachs)('#%# => t.%s', type => {
    const { success } = createTests(t[type]);
    success(...tests)();
  });
});

describe('#3 => t.array & t.readonlyArray & t.tuple', () => {
  const arr1 = [1, 2, 3, { a: 1, b: { c: 'str' } }];
  const tests = [
    { invite: 'simple array', parameters: [1], expected: [1] },
    { invite: 'complex array', parameters: arr1, expected: arr1 },
  ] satisfies TestArgs<(...args: any) => any>;

  describe('#1 => t.array', () => {
    const { success } = createTests(t.array);
    success(...tests)();
  });

  describe('#2 => t.readonlyArray', () => {
    const { success } = createTests(t.readonlyArray);
    success(...tests)();
  });

  describe('#3 => t.tuple', () => {
    const { success } = createTests(t.tuple);
    success(...tests)();
  });
});

describe('#4 => t.union', () => {
  const tests = [
    { invite: 'simple union', parameters: [1], expected: 1 },
    { invite: 'complex union', parameters: [1, 'str', 45], expected: 1 },
    {
      invite: 'union with object',
      parameters: [{ a: 1 }, 45, true],
      expected: { a: 1 },
    },
  ] satisfies TestArgs<(...args: any) => any>;

  const { success } = createTests(t.union);
  success(...tests)();
});
