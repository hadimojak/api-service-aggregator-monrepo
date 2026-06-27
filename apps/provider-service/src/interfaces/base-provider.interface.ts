export interface BaseProvider<TRequest = any, TResponse = any> {
  execute(payload: TRequest): Promise<TResponse>;
}
