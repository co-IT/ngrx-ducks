import { ObservableSelectorFactory } from '../../../typings';

export function isSelectorGroup(
  candidate: ObservableSelectorFactory<unknown>
): boolean {
  return (
    !!candidate.__ngrxDucks__isSelectorGroup &&
    candidate.__ngrxDucks__isSelectorGroup === true
  );
}
