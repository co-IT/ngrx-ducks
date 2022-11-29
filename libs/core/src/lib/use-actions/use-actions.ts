import { inferTypePrefixFromFeatureName, isDuck } from '../store-chunk/connect';
import { ActionCreators } from './action-creators';
import { Constructable } from './constructable';
import { NgRxDucksUseActionsCannotInitializeStaticFieldsError } from './ngrx-ducks-use-actions-cannot-initialize-static-class-fields.error';

interface UseActionsConfiguration {
  /**
   * Prefix being set before the action type.
   */
  prefix: string;
}

export function useActions<T extends Constructable>(
  Token: T,
  configuration?: UseActionsConfiguration
): ActionCreators<T> {
  if (!Token) {
    throw new NgRxDucksUseActionsCannotInitializeStaticFieldsError();
  }

  const instance = new Token();
  const prefix = inferTypePrefixFromFeatureName({
    feature: configuration?.prefix || '',
    enableActionTypePrefixing: !!configuration?.prefix
  });

  const properties = Object.keys(instance);

  return properties.reduce(
    (actions, property) =>
      aggregateActionCreators(instance, property, prefix, actions),
    {}
  ) as any;
}

function buildActionCreator(actionCreator: any, prefix: string) {
  if (!prefix) return actionCreator;

  const action = actionCreator();
  const type = `${prefix}${action.type}`;
  const actionCreatorPrefixed = (payload: any) => ({
    type,
    payload
  });

  actionCreatorPrefixed.type = type;

  return actionCreatorPrefixed;
}

function aggregateActionCreators(
  instance: any,
  property: string,
  prefix: string,
  actionCreators: {}
): any {
  if (isDuck(instance, property)) {
    const actionCreator = buildActionCreator(instance[property], prefix);
    return { ...actionCreators, [property]: actionCreator };
  } else if (Object.keys(instance[property]).length > 0) {
    return {
      ...actionCreators,
      [property]: Object.keys(instance[property]).reduce(
        (nestedActions, key) =>
          aggregateActionCreators(
            instance[property],
            key,
            prefix,
            nestedActions
          ),
        {}
      )
    };
  } else {
    return actionCreators;
  }
}
