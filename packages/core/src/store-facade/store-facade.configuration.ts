export interface StoreFacadeConfiguration<TState = any> {
  registerInStore:
    | [string, keyof TState, TState[keyof TState]]
    | [string, TState[keyof TState]];
}
