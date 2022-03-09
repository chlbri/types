import { expectType } from 'tsd';
import { IndexOfArray, NArrayOmit, Reverse, TuplifyUnion } from './arrays';

declare const indexOfArray1: IndexOfArray<['index1', 'index 2', 3]>;
declare const indexOfArray2: IndexOfArray<['index1', 'retr']>;
declare const arrayReverse1: Reverse<['index1', 'index2', 3]>;
declare const arrayReverse2: Reverse<['index1', 'retr']>;
declare const arrayOmit: NArrayOmit<
  [
    { value: 3; name: '3' },
    { value: 5; name: '5' },
    { value: 7; name: '7' },
  ],
  'value'
>;
declare const union1: TuplifyUnion<'index1' | 'index 2' | 'retr'>;
declare const union2: TuplifyUnion<'index1' | 'retr'>;

expectType<0 | 1 | 2>(indexOfArray1);
expectType<0 | 1>(indexOfArray2);

expectType<[3, 'index2', 'index1']>(arrayReverse1);
expectType<['retr', 'index1']>(arrayReverse2);

expectType<({ name: '3' } | { name: '5' } | { name: '7' })[]>(arrayOmit);

expectType<['index1', 'index 2', 'retr']>(union1);
expectType<['index1', 'retr']>(union2);
