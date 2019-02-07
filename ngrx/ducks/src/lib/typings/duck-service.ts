import { PickSelector } from '../__deprecated__/types';
import { DuckActionDispatcher } from './duck-action-dispatcher';

export type Duck<T> = { [K in keyof T]: DuckActionDispatcher<T[K]> } &
  PickSelector;
