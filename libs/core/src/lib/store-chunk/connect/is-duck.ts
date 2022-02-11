import { duckIdentifierPropertyKey } from '../../create-duck';
import { DucksIdentifier } from '../../create-duck/ducks-identifier';

export function isDuck(instance: any, property: string): boolean {
  return (
    isImmutableDuck(instance, property) || isMutableDuck(instance, property)
  );
}

export function isImmutableDuck(instance: any, property: string): boolean {
  return instance[property][duckIdentifierPropertyKey] === DucksIdentifier.Duck;
}

export function isMutableDuck(instance: any, property: string): boolean {
  return (
    instance[property][duckIdentifierPropertyKey] ===
    DucksIdentifier.DuckMutable
  );
}
