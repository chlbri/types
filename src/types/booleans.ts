/* eslint-disable @typescript-eslint/no-unused-vars */
import { _unknown } from '../functions/commons';
import { typeFn } from './commons';

export const t_boolean = <T extends boolean>(_: T) => _unknown<T>();
t_boolean.forceCast = <T extends boolean>(_: unknown) => _unknown<T>();
t_boolean.is = <T>(_: T) => _unknown<T extends boolean ? true : false>();
t_boolean.type = _unknown<boolean>();
t_boolean.true = typeFn<true>()();
t_boolean.false = typeFn<false>()();
