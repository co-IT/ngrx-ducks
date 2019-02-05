export type ClassWithActionAnnotations<T> = {
  [key: string]: T[keyof T] & {
    wiredAction: { type: string; caseReducer: T[keyof T] };
  };
};
