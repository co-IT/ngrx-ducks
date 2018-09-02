export type PayloadOf<T> = T extends (
  state: any,
  payload: infer TPayload
) => any
  ? TPayload
  : never;
