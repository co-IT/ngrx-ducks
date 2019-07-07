/**
 * Enhances each method of a class instance to have the property
 * wiredAction.
 */
export type ClassWithActionAnnotations<T> = {
  [key: string]: T[keyof T] & {
    wiredAction: { type: string; caseReducer: T[keyof T] };
  };
};
