import { PickSelector } from '../../use-pick/pick-selector';
import { DuckActionDispatcher } from './duck-action-dispatcher';

export type Duck<T> = { [K in keyof T]: DuckActionDispatcher<T[K]> } &
  PickSelector;
