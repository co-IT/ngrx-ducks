export type CaseReducerWithPayload<TSlice, TPayload> = (
  state: TSlice,
  payload: TPayload
) => TSlice;
