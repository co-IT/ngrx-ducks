import { duckIdentifierPropertyKey, DucksIdentifier } from '../create-duck';
import { NgRxDucksNotConnectedError } from '../create-duck/ngrx-ducks-not-connected.error';
import { SelectFunction } from './use-select-container';

interface PickCoat {
  (): never;
  [duckIdentifierPropertyKey]?: DucksIdentifier;
}

export function useSelect(): SelectFunction {
  const pickFacade: PickCoat = () => {
    throw new NgRxDucksNotConnectedError();
  };

  pickFacade[duckIdentifierPropertyKey] = DucksIdentifier.DuckPickFunction;

  return pickFacade;
}
