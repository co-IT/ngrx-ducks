export type ReducerPayload<TSlice, TPayload> = (
  slice: TSlice,
  payload: TPayload
) => TSlice;
