import { IndexOfArray, NArrayOmit, Reverse } from './arrays';

declare const indexOfArray1: IndexOfArray<['index1', 'index 2', 3]>;
declare const indexOfArray2: IndexOfArray<['index1', 'retr']>;
declare const arrayReverse1: Reverse<['index1', 'index2', 3]>;
declare const arrayReverse2: Reverse<['index1', 'retr']>;
declare const arrayOmit: NArrayOmit<
  [
    { value: 3; name: '3'; data: true },
    { value: 5; name: '5'; data: false },
    { value: 7; name: '7'; data: true },
  ],
  'value'
>;

expectTypeOf<0 | 1 | 2>(indexOfArray1);
expectTypeOf<0 | 1>(indexOfArray2);

expectTypeOf<[3, 'index2', 'index1']>(arrayReverse1);
expectTypeOf<['retr', 'index1']>(arrayReverse2);

expectTypeOf<
  [
    { name: '3'; data: true },
    { name: '5'; data: false },
    { name: '7'; data: true },
  ]
>(arrayOmit);
