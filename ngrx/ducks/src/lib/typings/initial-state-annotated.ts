/**
 * Indicate that a class is expected that is annotated with
 * InitialState decorator.
 */
export interface InitialStateAnnotated<T = unknown> {
  initialState?: T;
}
