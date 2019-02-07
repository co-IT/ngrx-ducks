export type ActionCreatorForEffect<T> = T extends void
  ? { type: string; action: () => { type: string } }
  : { type: string; action: (payload: T) => { type: string; payload: T } };
