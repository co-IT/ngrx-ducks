import { PickSelector } from '../../../typings/pick-selector';
import { Duck } from './duck';

export type DuckCandidates<TDucks> = {
  [TDuck in keyof TDucks]: Duck<TDucks[TDuck]>
};

/**
 * @deprecated
 * This type will be removed in the next major release.
 * Please use [Duck]{@link ../../typings/duck.ts} instead
 */
export type Ducks<TDucks> = DuckCandidates<TDucks> & PickSelector;
