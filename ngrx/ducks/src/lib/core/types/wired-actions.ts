import { WiredAction } from './wired-action';

export type WiredActions<T> = {
  [K in keyof T]: WiredAction<T[K]>
};
