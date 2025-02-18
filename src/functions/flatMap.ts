import { DEFAULT_DELIMITER } from '~constants';
import type { FlatMapByKeys, PickKeysBy, TrueO } from '../types';
import { t } from './common';

type SimpleOptions = [
  params: {
    config: TrueO;
    withChildren?: boolean;
    delimiter?: string;
    omit: string;
  },
  path?: string,
];

type Options<
  T extends TrueO,
  _omit extends PickKeysBy<T, object>,
  WithC extends boolean = true,
  Delimiter extends string = '.',
> = [
  params: {
    config: T;
    omit: _omit;
    withChildren?: WithC;
    delimiter?: Delimiter;
  },
  path?: string,
];

export type FlatMapByKey_F = <
  const T extends TrueO,
  _omit extends PickKeysBy<T, object>,
  WithC extends boolean = true,
  Delimiter extends string = '.',
>(
  ...args: Options<T, _omit, WithC, Delimiter>
) => FlatMapByKeys<T, _omit, { with: WithC; delimiter: Delimiter }>;

type SimpleFlatMap = (...args: SimpleOptions) => any;

export interface FlaMatByKey {
  (...args: SimpleOptions): any;

  low: SimpleFlatMap;
  typed: FlatMapByKey_F;
}

const _simpleFlatMap: SimpleFlatMap = (
  { config, omit, withChildren, delimiter = DEFAULT_DELIMITER },
  path = '',
) => {
  const _key = omit as unknown as keyof typeof config;
  const { [_key]: _omit, ...rest } = config;
  const check = withChildren === undefined || withChildren === true;

  let out: any = {};
  out[path === '' ? delimiter : path] = check ? config : rest;
  if (_omit) {
    for (const key in t.any(_omit)) {
      if (Object.prototype.hasOwnProperty.call(_omit, key)) {
        const config = t.any(_omit[key]);
        const inner = t.any(
          _simpleFlatMap(
            {
              config,
              omit,
              withChildren,
              delimiter,
            },
            `${path}${delimiter}${key}`,
          ),
        );

        out = { ...out, ...inner };
      }
    }
  }

  return out;
};

/**
 *
 * @param param0
 * @param path never use it, just for recursion
 * @returns flat Object
 */
export const flatMapByKey: FlaMatByKey = (...args) => {
  return _simpleFlatMap(...args);
};

flatMapByKey.typed = t.unknown<FlatMapByKey_F>(_simpleFlatMap);

flatMapByKey.low = _simpleFlatMap;
