import { NgRxDucksNotConnectedError } from '../create-duck/create-duck-not-connected.error';
import { DucksIdentifier } from '../create-duck';
import { SelectFunction } from './use-select-container';

/**
 * @deprecated since version 13. Use useSelect instead.
 */
export const usePick = useSelect;

export function useSelect(): SelectFunction {
  const pickFacade = () => {
    throw new NgRxDucksNotConnectedError();
  };

  pickFacade.__ngrx_ducks__id = DucksIdentifier.DuckPickFunction;

  return pickFacade;
}
