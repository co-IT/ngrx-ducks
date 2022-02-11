import { duckIdentifierPropertyKey, DucksIdentifier } from '../../create-duck';
import { isImmutableDuck, isMutableDuck } from '../connect';
import { hasOwnProperty } from './has-own-property';

export function hasImmutableDuck(instance: any): boolean {
  return Object.keys(instance)
    .filter(property => ignoreDispatcherAndSelector(instance[property]))
    .filter(property => !isMutableDuck(instance, property))
    .some(
      property =>
        isImmutableDuck(instance, property) ||
        (Object.keys(instance[property]).length > 0 &&
          hasImmutableDuck(instance[property]))
    );
}

/**
 * To optimize the resolving process of nested ducks
 * we ignore all known building blocks of NgRx Ducks which are clearly no
 * duck
 * @param property candidate being checked for being a duck
 * @returns
 */
function ignoreDispatcherAndSelector(property: unknown): boolean {
  if (!property) return false;

  // A property representing a collection of bound selectors contains a
  // property named "__ngrx_ducks__selectors_original".
  if (hasOwnProperty(property, '__ngrx_ducks__selectors_original')) {
    return false;
  }

  // We also want to exclude other building blocks that are no duck.
  if (hasOwnProperty(property, duckIdentifierPropertyKey)) {
    return [
      DucksIdentifier.DuckDispatcherPlain,
      DucksIdentifier.DuckDispatcherPayload,
      DucksIdentifier.DuckPickFunction
    ].every(
      ducksIdentifier => property[duckIdentifierPropertyKey] !== ducksIdentifier
    );
  }

  return true;
}
