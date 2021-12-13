export type MutableReducerPayload<TSlice, TPayload> = (
  slice: TSlice,
  payload: TPayload
) => void;
