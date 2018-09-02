export type ActionCreatorWithoutPayload<T> = (
  state: T
) => {
  type: string;
};
