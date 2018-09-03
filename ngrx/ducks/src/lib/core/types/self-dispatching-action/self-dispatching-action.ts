import { SelfDispatchingActionWithPayload } from './self-dispatching-action-with-payload';
import { SelfDispatchingActionWithoutPayload } from './self-dispatching-action-without-payload';
import { ActionCreatorWithoutPayload } from '../action-creator/action-creator-without-payload';
import { ActionCreatorWithPayload } from '../action-creator/action-creator-with-payload';

export type SelfDispatchingAction<T> = T extends ActionCreatorWithoutPayload
  ? SelfDispatchingActionWithoutPayload
  : T extends ActionCreatorWithPayload<infer TPayload>
    ? SelfDispatchingActionWithPayload<TPayload>
    : never;
