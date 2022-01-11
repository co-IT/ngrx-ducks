import { isImmutableDuck } from '../connect';

export function hasImmutableDuck(instance: any): boolean {
  return Object.keys(instance).some(
    (property) =>
      isImmutableDuck(instance, property) ||
      (Object.keys(instance[property]).length > 0 &&
        hasImmutableDuck(instance[property]))
  );
}
