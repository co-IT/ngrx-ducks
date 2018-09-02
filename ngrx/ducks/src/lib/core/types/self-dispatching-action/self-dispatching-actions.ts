import { SelfDispatchingAction } from './self-dispatching-action';

export type SelfDispatchingActions<TDucks> = {
  [TDuck in keyof TDucks]: SelfDispatchingAction<TDucks[TDuck]>
};
