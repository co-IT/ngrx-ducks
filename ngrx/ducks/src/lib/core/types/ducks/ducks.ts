import { Duck } from './duck';
import { PickSelector } from './pick-selector';

export type DuckCandidates<TDucks> = {
  [TDuck in keyof TDucks]: Duck<TDucks[TDuck]>
};

export type Ducks<TDucks> = DuckCandidates<TDucks> & PickSelector;
