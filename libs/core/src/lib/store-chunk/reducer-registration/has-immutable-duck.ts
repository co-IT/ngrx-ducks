import { DucksIdentifier } from '../../create-duck';
import { isImmutableDuck } from '../connect';
import { hasOwnProperty } from './has-own-property';

export function hasImmutableDuck(instance: any): boolean {
  return Object.keys(instance)
    .filter(property => ignoreDispatcherAndSelector(instance[property]))
    .some(
      property =>
        isImmutableDuck(instance, property) ||
        (Object.keys(instance[property]).length > 0 &&
          hasImmutableDuck(instance[property]))
    );
}

function ignoreDispatcherAndSelector(property: unknown): boolean {
  if (!property) return false;
  if (typeof property !== 'object') return false;

  // A property representing a collection of bound selectors contains a
  // property named "__ngrx_ducks__selectors_original".
  if (hasOwnProperty(property, '__ngrx_ducks__selectors_original')) {
    return false;
  }

  // We also want to exclude other building blocks that are no duck.
  if (hasOwnProperty(property, '__ngrx_ducks__id')) {
    return [
      DucksIdentifier.DuckDispatcherPlain,
      DucksIdentifier.DuckDispatcherPayload,
      DucksIdentifier.DuckPickFunction
    ].some(ducksIdentifier => property.__ngrx_ducks__id === ducksIdentifier);
  }

  return true;
}
