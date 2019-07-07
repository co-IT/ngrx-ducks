import { DuckActionDispatcher } from './duck-action-dispatcher';
import { PickSelector } from '../selectors/pick-selector';

export type Duck<T> = { [K in keyof T]: DuckActionDispatcher<T[K]> } &
  PickSelector;
