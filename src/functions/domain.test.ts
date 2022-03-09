import { createDomain } from './domain';

// #region Configuration
const useCase1 = {
  call: (arg1: number, arg2: number) => arg1 + arg2,
  __name: 'useCase1',
} as const;
const useCase2 = {
  call: (arg1: boolean, arg2: boolean) => arg1 && arg2,
  __name: 'useCase2',
} as const;

const domain = createDomain(useCase1, useCase2);
// #endregion

describe('Creates the domain', () => {
  it.concurrent('Domain is defined', () => {
    expect(domain).toBeDefined();
  });
  it.concurrent('Domain is of type object', () => {
    expect(domain).toBeObject();
  });
  it.concurrent('Number of keys are same', () => {
    expect(Object.keys(domain).length).toBe(2);
  });
  it.concurrent('Keys are same', () => {
    expect(Object.keys(domain)).toStrictEqual(['useCase1', 'useCase2']);
  });
  describe('Composed by functions', () => {
    it.concurrent('Function 1', () => {
      expect(domain.useCase1).toBeFunction();
    });
    it.concurrent('Function 2', () => {
      expect(domain.useCase2).toBeFunction();
    });
  });
});

describe('Working', () => {
  it.concurrent('Number Addition', () => {
    const actual = domain.useCase1(1, 2);
    expect(actual).toBe(3);
  });
  it.concurrent('Boolean Assertion', () => {
    const actual = domain.useCase2(true, false);
    expect(actual).toBe(false);
  });
});
