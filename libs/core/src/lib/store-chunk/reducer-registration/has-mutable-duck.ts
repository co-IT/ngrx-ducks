import { isMutableDuck } from '../connect';

export function hasMutableDuck(instance: any): boolean {
  return Object.keys(instance).some(property =>
    isMutableDuck(instance, property)
  );
}
