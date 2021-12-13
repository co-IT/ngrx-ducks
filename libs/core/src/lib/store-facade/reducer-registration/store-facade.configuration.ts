export type StoreFacadeConfiguration<TState = any> =
  | StoreFacadeConfigurationWithPlainReducer<TState>
  | StoreFacadeConfigurationWithSlice<TState>;

export interface StoreFacadeConfigurationWithPlainReducer<TState = any> {
  feature: string;
  defaults: TState;
}

export interface StoreFacadeConfigurationWithSlice<TState = any> {
  feature: string;
  slice: keyof TState;
  defaults: TState[keyof TState];
}
