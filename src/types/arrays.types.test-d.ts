import { IndexesOfArray, NArrayOmit, ReverseArray } from './arrays.types';

declare const indexOfArray1: IndexesOfArray<['index1', 'index 2', 3]>;
declare const indexOfArray2: IndexesOfArray<['index1', 'retr']>;
declare const arrayReverse1: ReverseArray<['index1', 'index2', 3]>;
declare const arrayReverse2: ReverseArray<['index1', 'retr']>;
declare const arrayOmit: NArrayOmit<
  [
    { value: 3; name: '3'; data: true },
    { value: 5; name: '5'; data: false },
    { value: 7; name: '7'; data: true },
  ],
  'value'
>;

expectTypeOf(indexOfArray1).toEqualTypeOf<0 | 1 | 2>();
expectTypeOf<0 | 1>(indexOfArray2).toEqualTypeOf<0 | 1>();

expectTypeOf(arrayReverse1).toEqualTypeOf<[3, 'index2', 'index1']>();
expectTypeOf(arrayReverse2).toEqualTypeOf<['retr', 'index1']>();

expectTypeOf(arrayOmit).toEqualTypeOf<
  [
    { name: '3'; data: true },
    { name: '5'; data: false },
    { name: '7'; data: true },
  ]
>();
