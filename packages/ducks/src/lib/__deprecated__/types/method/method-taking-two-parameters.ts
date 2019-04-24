export type MethodTakingTwoParameters<TSlice, TPayload> = (
  slice: TSlice,
  payload: TPayload
) => TSlice;
