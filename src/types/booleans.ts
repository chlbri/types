/* eslint-disable @typescript-eslint/no-unused-vars */
import { expandFn } from '~utils';
import { _unknown } from '../functions/commons';
import { typeFn } from './commons';

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
