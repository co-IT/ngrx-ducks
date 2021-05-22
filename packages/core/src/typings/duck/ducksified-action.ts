export interface DucksifiedAction<TPayload = unknown> {
  type: string;
  payload?: TPayload;
}
