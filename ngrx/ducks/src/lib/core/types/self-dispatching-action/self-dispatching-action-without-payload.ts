export interface SelfDispatchingActionWithoutPayload {
  (): void;
  plain(): {
    type: string;
  };
}
