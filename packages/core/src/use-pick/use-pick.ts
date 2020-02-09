import { DucksIdentifier } from '../create-duck/create-duck';
import { NgRxDucksNotConnectedError } from '../create-duck/create-duck-not-connected.error';
import { PickFunction } from '../decorator-api/typings';

export function usePick(): PickFunction {
  const pickFacade = () => {
    throw new NgRxDucksNotConnectedError();
  };

  pickFacade.__ngrx_ducks__id = DucksIdentifier.DuckPickFunction;

  return pickFacade;
}
