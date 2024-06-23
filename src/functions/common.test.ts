import { createTests } from '@bemedev/vitest-extended';
import type { TestArgs } from '@bemedev/vitest-extended/lib/types';
import { t } from './common';

describe('#1 => t.anify & t.identity & notUndefined & constants', () => {
  const useTests = createTests(t.anify);
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

  const cTests = CONSTANTS.map(c => [
    `CONSTANTS => ${c}`,
    [],
    t[c],
  ]) as TestArgs<(arg?: any) => any>;

  useTests(
    ['undefined', [undefined], t.undefined],
    ['string', ['string'], t.identity('string')],
    ['boolean', [true], t.notUndefined(true)],
    [
      'object',
      [{ a: 1, b: { c: 'str' } }],
      t.identity({ a: 1, b: { c: 'str' } }),
    ],
    ...cTests,
  );
});

describe('#2 => t.buildObject & t.deepReadonly & t.deepNotReadOnly & t.notReadOnly & t.readonly', () => {
  const tests = [
    ['simple object', [{ a: 1 }], { a: 1 }],
    [
      'complex object',
      [{ a: 1, b: { c: 'str' } }],
      { a: 1, b: { c: 'str' } },
    ],
  ] satisfies TestArgs<(arg: any) => any>;

  const eachs = t.tuple('notReadOnly', 'readonly', 'buildObject');

  describe.each(eachs)('#%# => t.%s', type => {
    const useTests = createTests(t[type]);
    useTests(...tests);
  });
});

describe('#3 => t.array & t.readonlyArray & t.tuple', () => {
  const arr1 = [1, 2, 3, { a: 1, b: { c: 'str' } }];
  const tests = [
    ['simple array', [1], [1]],
    ['complex array', arr1, arr1],
  ] satisfies TestArgs<(...args: any) => any>;

  describe('#1 => t.array', () => {
    const useTests = createTests(t.array);
    useTests(...tests);
  });

  describe('#2 => t.readonlyArray', () => {
    const useTests = createTests(t.readonlyArray);
    useTests(...tests);
  });

  describe('#3 => t.tuple', () => {
    const useTests = createTests(t.tuple);
    useTests(...tests);
  });
});

describe('#4 => t.union', () => {
  const tests = [
    ['simple union', [1], 1],
    ['complex union', [1, 'str', 45], 1],
    ['union with object', [{ a: 1 }, 45, true], { a: 1 }],
  ] satisfies TestArgs<(...args: any) => any>;

  const useTests = createTests(t.union);
  useTests(...tests);
});
