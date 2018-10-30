import { Duck } from './duck';
import { PickSelector } from './pick-selector';

export type Ducks<TDucks> = { [TDuck in keyof TDucks]: Duck<TDucks[TDuck]> } &
  PickSelector;
