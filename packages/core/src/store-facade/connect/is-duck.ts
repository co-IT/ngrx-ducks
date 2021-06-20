import { DucksIdentifier } from '../../create-duck/ducks-identifier';

export function isDuck(instance: any, property: string): boolean {
  return (
    isImmutableDuck(instance, property) || isMutableDuck(instance, property)
  );
}

export function isImmutableDuck(instance: any, property: string): boolean {
  return instance[property]['__ngrx_ducks__id'] === DucksIdentifier.Duck;
}

export function isMutableDuck(instance: any, property: string): boolean {
  return instance[property]['__ngrx_ducks__id'] === DucksIdentifier.DuckMutable;
}
