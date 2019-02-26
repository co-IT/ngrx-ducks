import { ActionCreatorForEffect } from '.';

export type extractPayload<T> = T extends ActionCreatorForEffect<infer TPayload>
  ? TPayload
  : never;

export interface ActionFromEffectDispatcher<T> {
  type: string;
  payload: extractPayload<T>;
}
