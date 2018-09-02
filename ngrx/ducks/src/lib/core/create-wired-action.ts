import { NgrxDucksError } from './ngrx-ducks-error';
import { CaseReducer, WiredAction } from './types';

/**
 * Connect an action the corresponding case reducer.
 *
 * @param actionType the name of the action
 * @param caseReducer the method that is executed if the corresponding action is raised
 */
export function createWiredAction<Fn extends CaseReducer<CR>, CR>(
  actionType: string,
  caseReducer: CR
): WiredAction<Fn> {
  ensureValideParameters(actionType, caseReducer);

  const wiredAction: any = (payload: any) => ({
    type: actionType,
    payload
  });

  wiredAction.type = actionType;
  wiredAction.caseReducer = caseReducer;

  return wiredAction;
}

function ensureValideParameters(actionType: string, caseReducer: any) {
  throwIf(!actionType, `"${actionType}" is no valid action type.`);
  throwIf(
    !caseReducer,
    `Please provide a case reducer for action "${actionType}". ` +
      `Expected a function but found "${caseReducer}".`
  );
}

function throwIf(condition: boolean, message: string) {
  if (condition) {
    throw new NgrxDucksError(message);
  }
}
