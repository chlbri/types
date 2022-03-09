export interface IUseCase<
  N extends string = string,
  F extends (...args: any[]) => any = any,
> {
  call: F;
  readonly __name: N;
}
