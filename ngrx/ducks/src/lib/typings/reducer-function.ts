import { DucksifiedAction } from './action-that-may-have-a-payload';

/**
 * Represents signature of a reducer function.
 */
export interface ReducerFunction<TState = any> {
  (state: TState, action: DucksifiedAction): TState;
}
