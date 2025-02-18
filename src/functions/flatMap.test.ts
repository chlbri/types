import { DEFAULT_DELIMITER as D } from '~constants';
import { flatMapByKey } from './flatMap';

describe.concurrent('flatMap', () => {
  const omit = 'children';

  it('should handle simple object with no nesting', () => {
    const config = { name: 'John', age: 30 };
    const result = flatMapByKey.low({
      config,
      omit,
    });
    expect(result).toStrictEqual({
      [D]: { name: 'John', age: 30 },
    });
  });

  it('should handle nested objects', () => {
    const config = {
      name: 'John',
      children: {
        alice: { age: 10 },
        bob: { age: 8 },
      },
    };
    const result = flatMapByKey({ config, omit });
    expect(result).toStrictEqual({
      [D]: {
        name: 'John',
        children: {
          alice: { age: 10 },
          bob: { age: 8 },
        },
      },
      [`${D}alice`]: { age: 10 },
      [`${D}bob`]: { age: 8 },
    });
  });

  it('should respect withChildren=false', () => {
    const config = {
      name: 'John',
      children: {
        alice: { age: 10 },
        bob: { age: 8 },
      },
    };
    const result = flatMapByKey({
      config,
      omit,
      withChildren: false,
    });
    expect(result).toStrictEqual({
      [D]: {
        name: 'John',
      },
      [`${D}alice`]: { age: 10 },
      [`${D}bob`]: { age: 8 },
    });
  });

  it('should handle custom delimiter', () => {
    const config = {
      name: 'John',
      children: {
        alice: { age: 10 },
      },
    };
    const result = flatMapByKey.typed({
      config,
      omit: 'children',
      delimiter: '/',
    });
    expect(result).toStrictEqual({
      '/': {
        name: 'John',
        children: {
          alice: { age: 10 },
        },
      },
      [`/alice`]: { age: 10 },
    });
  });

  it('should handle deeply nested objects', () => {
    const config = {
      name: 'John',
      children: {
        alice: {
          age: 10,
          children: {
            charlie: { age: 2 },
          },
        },
      },
    };

    const result = flatMapByKey.typed({ config, omit: 'children' });
    expect(result).toStrictEqual({
      [D]: {
        name: 'John',
        children: {
          alice: {
            age: 10,
            children: {
              charlie: { age: 2 },
            },
          },
        },
      },
      [`${D}alice`]: {
        age: 10,
        children: {
          charlie: { age: 2 },
        },
      },
      [`${D}alice${D}charlie`]: { age: 2 },
    });
  });
});
