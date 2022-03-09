import { Domain, IUseCase } from '../types';

export function createDomain<
  T extends IUseCase<any, any>[] = IUseCase<any, any>[],
>(...useCases: T) {
  return useCases.reduce(
    (prev, curr) => Object.assign(prev, { [curr.__name]: curr.call }),
    {},
  ) as Domain<T>;
}
