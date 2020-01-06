import { DucksIdentifier } from '../create-duck/create-duck';
import { ActionCreators } from './action-creators';
import { Constructable } from './constructable';

export function getActions<T extends Constructable>(
  Token: T
): ActionCreators<T> {
  const instance = new Token();
  const properties = Object.keys(instance);

  return properties.reduce((actions, property) => {
    return instance[property].__ngrx_ducks__id === DucksIdentifier.Duck
      ? { ...actions, [property]: instance[property] }
      : actions;
  }, {}) as any;
}
