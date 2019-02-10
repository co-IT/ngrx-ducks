/**
 * Helps in @Effect to declares the type of a payload.
 */
export interface ActionOf<T> {
  type: string;
  payload: T;
}
