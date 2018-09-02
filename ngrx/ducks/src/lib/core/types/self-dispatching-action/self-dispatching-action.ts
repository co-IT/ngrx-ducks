import { ActionCreatorWithPayload } from '../mutator/mutator-with-payload';
import { ActionCreatorWithoutPayload } from '../mutator/mutator-without-payload';
import { SelfDispatchingActionWithPayload } from './self-dispatching-action-with-payload';
import { SelfDispatchingActionWithoutPayload } from './self-dispatching-action-without-payload';

export type SelfDispatchingAction<T> = T extends ActionCreatorWithoutPayload<
  infer TSlice
>
  ? SelfDispatchingActionWithoutPayload
  : T extends ActionCreatorWithPayload<infer TSlice2, infer TPayload>
    ? SelfDispatchingActionWithPayload<TPayload>
    : never;
