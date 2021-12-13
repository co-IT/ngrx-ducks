export type StoreChunkConfiguration<TState = any> =
  | StoreChunkConfigurationWithPlainReducer<TState>
  | StoreChunkConfigurationWithSlice<TState>;

export interface StoreChunkConfigurationWithPlainReducer<TState = any> {
  feature: string;
  defaults: TState;
}

export interface StoreChunkConfigurationWithSlice<TState = any> {
  feature: string;
  slice: keyof TState;
  defaults: TState[keyof TState];
}
