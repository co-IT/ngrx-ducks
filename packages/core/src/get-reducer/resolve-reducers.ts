type CaseReducerByAction = {
  [actionType: string]: Function;
};

/**
 * Iterates through properties of a class and bundling all case reducer functions together.
 * It also looks up nested case-reducers recursively.
 *
 * @param instance Facade class
 * @param collectedReducers properties that can contain case reducers
 * @returns key-value pairs of action-type and case-reducer
 */
export function resolveReducers(
  instance: any,
  collectedReducers: { [key: string]: Function } = {}
): CaseReducerByAction {
  return Object.keys(instance).reduce((reducers, property) => {
    if (instance[property].reducer) {
      return {
        ...reducers,
        [instance[property].type]: instance[property].reducer
      };
    } else if (
      isNoNgRxDuckPatchInternal(instance[property]) &&
      Object.keys(instance[property]).length > 0
    ) {
      return resolveReducers(instance[property], reducers);
    } else {
      return reducers;
    }
  }, collectedReducers);
}

function isNoNgRxDuckPatchInternal(object: any) {
  return Object.keys(object).every(
    property => !property.match(/__ngrx_ducks__/)
  );
}
