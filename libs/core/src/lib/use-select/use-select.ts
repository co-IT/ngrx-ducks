import { duckIdentifierPropertyKey, DucksIdentifier } from '../create-duck';
import { NgRxDucksNotConnectedError } from '../create-duck/create-duck-not-connected.error';
import { SelectFunction } from './use-select-container';

interface PickCoat {
  (): never;
  [duckIdentifierPropertyKey]?: DucksIdentifier;
}

/**
 * @deprecated since version 13. Use useSelect instead.
 */
export const usePick = useSelect;

export function useSelect(): SelectFunction {
  const pickFacade: PickCoat = () => {
    throw new NgRxDucksNotConnectedError();
  };

  pickFacade[duckIdentifierPropertyKey] = DucksIdentifier.DuckPickFunction;

  return pickFacade;
}
