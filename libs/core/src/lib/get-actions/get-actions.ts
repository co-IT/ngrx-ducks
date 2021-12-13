import { isDuck } from '../store-facade/connect';
import { ActionCreators } from './action-creators';
import { Constructable } from './constructable';

/**
 * @deprecated since version 13. Use useActions instead.
 */
export const getActions = useActions;

export function useActions<T extends Constructable>(
  Token: T
): ActionCreators<T> {
  const instance = new Token();
  const properties = Object.keys(instance);

  return properties.reduce(
    (actions, property) => aggregateActions(instance, property, actions),
    {}
  ) as any;
}

function aggregateActions(instance: any, property: string, actions: {}): any {
  if (isDuck(instance, property)) {
    return { ...actions, [property]: instance[property] };
  } else if (Object.keys(instance[property]).length > 0) {
    return {
      ...actions,
      [property]: Object.keys(instance[property]).reduce(
        (nestedActions, key) =>
          aggregateActions(instance[property], key, nestedActions),
        {}
      )
    };
  } else {
    return actions;
  }
}
