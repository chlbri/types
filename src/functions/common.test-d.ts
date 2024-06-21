import { t, typings } from './common';

expectTypeOf<1>(t.identity(1));
expectTypeOf<unknown>(typings.anify(1));

expectTypeOf<{ a: 43; b: 32 }>(t.anify<{ a: 43; b: 32 }>());
expectTypeOf<undefined>(t.undefined);
expectTypeOf<string>(t.string);
expectTypeOf<number>(t.number);
expectTypeOf<Date>(t.date);
expectTypeOf<boolean>(t.boolean);
expectTypeOf<null>(t.null);
expectTypeOf<symbol>(t.symbol);
expectTypeOf<bigint>(t.bigint);
expectTypeOf<(...args: any) => any>(t.function);
expectTypeOf<number[]>(t.array(1, 2, 3));
expectTypeOf<readonly (1 | 2 | 3)[]>(t.readonlyArray(1, 2, 3));

const tuple1 = t.tuple(1, 2, 3);
expectTypeOf<number[]>(tuple1);
expectTypeOf<[number, number, number]>(tuple1);
expectTypeOf<[1, 2, 3]>(tuple1);

expectTypeOf<1 | 2 | 3>(t.union(1, 2, 3));
expectTypeOf<{ readonly a: 43; readonly b: 32 }>(
  t.readonlyObject({ a: 43, b: 32 }),
);
expectTypeOf<{ a: 43; b: 32 }>(t.object({ a: 43, b: 32 }));

const notUn1: number | undefined = 45;
expectTypeOf<number>(t.notUndefined(notUn1));

const notUn2: string | undefined = 'hello';
expectTypeOf<string>(t.notUndefined(notUn2));

const notUnd3 = t.notUndefined(undefined);
expectTypeOf<never>(notUnd3);
