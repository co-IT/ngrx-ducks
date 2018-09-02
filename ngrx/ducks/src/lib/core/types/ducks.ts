import { WiredAction } from './wired-action';

// export interface Ducks<TState> {
//   [key: string]: Duck<TState>;
// }

export type WiredActions<T> = {
  [K in keyof T]: WiredAction<T[K]>
};
