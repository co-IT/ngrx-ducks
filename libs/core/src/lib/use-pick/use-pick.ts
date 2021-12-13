import { NgRxDucksNotConnectedError } from '../create-duck/create-duck-not-connected.error';
import { DucksIdentifier } from '../create-duck/ducks-identifier';
import { PickFunction } from './pick-selector';

export function usePick(): PickFunction {
  const pickFacade = () => {
    throw new NgRxDucksNotConnectedError();
  };

  pickFacade.__ngrx_ducks__id = DucksIdentifier.DuckPickFunction;

  return pickFacade;
}
