import { ActionThatMayHaveAPayload } from './action-that-may-have-a-payload';
export interface ReducerFunction<TState = unknown> {
  (state: TState, action: ActionThatMayHaveAPayload): TState;
}
