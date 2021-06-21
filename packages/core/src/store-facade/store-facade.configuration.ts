export interface StoreFacadeConfiguration<TState = any> {
  feature: string;
  slice?: keyof TState;
  defaults: TState[keyof TState];
}

export interface StoreFacadeConfigurationWithSlice<TState = any>
  extends StoreFacadeConfiguration<TState> {
  slice: keyof TState;
}
