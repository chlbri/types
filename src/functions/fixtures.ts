import { createTests } from '@bemedev/vitest-extended';
import type { TestArgs } from '@bemedev/vitest-extended/lib/types';
import type { Fn } from '../types';

type Args = {
  fn: Fn;
  array: readonly any[] | any[];
  notIn: any[];
};

const invite = (index: number) => {
  const log = Math.log10(index);
  if (log > 1) return `${index}`;
  return `0${index}`;
};

export const buildBooleanTests = ({ fn, array, notIn }: Args) => {
  const { success } = createTests(fn);
  const tests = [
    ...array.map((parameters, index) => ({
      invite: `${invite(index)} => value ${parameters} -> true`,
      parameters,
      expected: true,
    })),
    ...notIn.map((parameters, index) => ({
      invite: `${invite(index)} => value ${parameters} -> false`,
      parameters,
      expected: false,
    })),
  ] as TestArgs<Fn>;

  success(...tests)();
};
