export declare type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export declare type PromisifyMethod<T> = T extends (...args: infer P) => infer R ? R extends Promise<any> ? T : (...args: P) => Promise<R> : never;
export declare type PromisifyObject<T extends Record<string, unknown>> = T & {
    [P in keyof T as PromisifyMethod<T[P]> extends never ? never : `${string & P}Async`]: PromisifyMethod<T[P]>;
};
