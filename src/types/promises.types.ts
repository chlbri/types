export type PromisifyMethod<T> = T extends (...args: infer P) => infer R
  ? R extends Promise<any>
    ? T
    : (...args: P) => Promise<R>
  : never;

export type PromisifyObject<T extends Record<string, unknown>> = T & {
  [P in keyof T as PromisifyMethod<T[P]> extends never
    ? never
    : `${string & P}Async`]: PromisifyMethod<T[P]>;
};
