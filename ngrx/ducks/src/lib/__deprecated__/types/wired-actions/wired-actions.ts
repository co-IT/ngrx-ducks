import { WiredAction } from './wired-action';

export type WiredActions<T> = {
  [K in keyof T]: T[K] extends Function ? WiredAction<T[K]> : T[K]
};
