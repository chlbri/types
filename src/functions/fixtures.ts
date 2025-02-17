import { createTests } from '@bemedev/vitest-extended';
import type { TestArgs } from '@bemedev/vitest-extended/lib/types';
import type { Fn } from '../types';

type Args = {
  fn: Fn;
  array: readonly any[] | any[];
  notIn: any;
};

export const buildTests = ({ fn, array, notIn }: Args) => {
  const { success } = createTests(fn);
  const tests = [
    ...array.map((color: any) => ({
      invite: `color ${color}`,
      parameters: color,
      expected: true,
    })),
    {
      invite: 'not in',
      parameters: notIn,
      expected: false,
    },
  ] as TestArgs<Fn>;

  success(...tests)();
};
