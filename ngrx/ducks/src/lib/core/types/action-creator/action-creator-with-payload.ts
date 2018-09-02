export type ActionCreatorWithPayload<TPayload> = (
  payload: TPayload
) => {
  type: string;
  payload: TPayload;
};
