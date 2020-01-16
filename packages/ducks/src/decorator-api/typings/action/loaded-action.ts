export interface LoadedAction<TPayload> {
  action(
    payload: TPayload
  ): {
    type: string;
    payload: TPayload;
  };
  /**
   * @deprecated Use action instead
   * This function will be removed in the next major release
   */
  plain(
    payload: TPayload
  ): {
    type: string;
    payload: TPayload;
  };
}
