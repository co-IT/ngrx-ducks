import { ActionThatMayHaveAPayload } from './action-that-may-have-a-payload';
export interface ReducerFunction<TState = any> {
  (state: TState, action: ActionThatMayHaveAPayload): TState;
}
