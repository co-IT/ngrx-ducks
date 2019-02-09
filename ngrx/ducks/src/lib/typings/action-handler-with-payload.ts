export type ActionHandlerWithPayload<TSlice, TPayload> = ((
  state: TSlice,
  payload: TPayload
) => TSlice);
