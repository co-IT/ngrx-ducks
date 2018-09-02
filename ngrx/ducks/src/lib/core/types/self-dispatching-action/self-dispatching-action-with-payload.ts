export interface SelfDispatchingActionWithPayload<TPayload> {
  (payload: TPayload): void;
  plain(
    payload: TPayload
  ): {
    type: string;
    payload: TPayload;
  };
}
