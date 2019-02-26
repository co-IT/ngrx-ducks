import { RealEffectDispatcher } from '../operators/where-type';

export type extractPayload<T> = T extends RealEffectDispatcher<infer TPayload>
  ? TPayload
  : never;

export interface ActionFromRealEffectDispatcher<T> {
  type: string;
  payload: extractPayload<T>;
}
