import { NgrxDucksError } from '../../errors';
import { CaseReducer, WiredAction } from '../types';
import { throwIf } from '../validation';

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
  ensureValidParameters(actionType, caseReducer);

  const wiredAction: any = (payload: any) => ({
    type: actionType,
    payload
  });

  wiredAction.type = actionType;
  wiredAction.caseReducer = caseReducer;

  return wiredAction;
}

function ensureValidParameters(actionType: string, caseReducer: any) {
  throwIf(
    !actionType,
    new NgrxDucksError(`"${actionType}" is no valid action type.`)
  );
  throwIf(
    !caseReducer,
    new NgrxDucksError(
      `Please provide a case reducer for action "${actionType}". ` +
        `Expected a function but found "${caseReducer}".`
    )
  );
}
