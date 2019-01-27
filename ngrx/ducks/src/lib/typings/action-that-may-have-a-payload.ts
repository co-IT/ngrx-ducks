export interface ActionThatMayHaveAPayload<TPayload = unknown> {
  type: string;
  payload?: TPayload;
}
