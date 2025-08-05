import { castFn } from '~utils';
import { commons } from './commons';

export const booleans = castFn<boolean>()({
  is: (data: unknown) => typeof data === 'boolean',

  type: Boolean,

  true: castFn<true>()({
    CONST: true,
    is: commons.function.checker.dynamic(value => value === true),
  }),

  false: castFn<false>()({
    CONST: false,
    is: commons.function.checker.dynamic(value => value === false),
  }),
});
