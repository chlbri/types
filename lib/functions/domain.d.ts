import { Domain, IUseCase } from '../types';
export declare function createDomain<T extends IUseCase<any, any>[] = IUseCase<any, any>[]>(...useCases: T): Domain<T>;
