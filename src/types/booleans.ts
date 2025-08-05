/* eslint-disable @typescript-eslint/no-unused-vars */
import { _unknown, expandFn, typeFn } from '~utils';

export const booleans = expandFn(
  <T extends boolean>(_: T) => _unknown<T>(),
  {
    forceCast: <T extends boolean>(_: unknown) => _unknown<T>(),

    is: <T>(_: T) => _unknown<T extends boolean ? true : false>(),

    type: _unknown<boolean>(),

    true: typeFn<true>()(),

    false: typeFn<false>()(),
  },
);
