import { ObservableSelector } from './observable-selector';

export type ObservableSelectors<T> = {
  [M in keyof T]: ObservableSelector<T[M]>
};
