import { UnionToTuple } from './unions';

declare const union1: UnionToTuple<'index1' | 'index 2' | 'retr'>;
declare const union2: UnionToTuple<'index1' | 'retr'>;

expectTypeOf<['index1', 'index 2', 'retr']>(union1);
expectTypeOf<['index1', 'retr']>(union2);
