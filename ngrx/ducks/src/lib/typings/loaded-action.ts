export interface LoadedAction<TPayload> {
  action(
    payload: TPayload
  ): {
    type: string;
    payload: TPayload;
  };
}
