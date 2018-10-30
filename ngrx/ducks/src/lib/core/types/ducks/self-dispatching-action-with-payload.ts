export interface DuckWithPayload<TPayload> {
  (payload: TPayload): void;
  plain(
    payload: TPayload
  ): {
    type: string;
    payload: TPayload;
  };
}
