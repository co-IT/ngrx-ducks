import { DucksifiedAction } from './duck/ducksified-action';

/**
 * Represents signature of a reducer function.
 */
export interface ReducerFunction<TState = any> {
  (state: TState, action: DucksifiedAction): TState;
}
