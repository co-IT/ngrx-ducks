import { WiredAction, WiredActions } from '../types';
import { throwIf } from '../validation';
import { createWiredAction } from './create-wired-action';

export type WiredActionCandidates<T> = { [K in keyof T]: string };
export type Constructable<T> = new () => T;

export function wireUpActions<T>(
  token: Constructable<T>,
  candidates: WiredActionCandidates<T>
): WiredActions<T> {
  ensureValidParameters(token, candidates);

  const instance = new token();

  return Object.entries(candidates).reduce(
    (wiredActions: Partial<WiredAction<T>>, [caseReducerKey, actionType]) => ({
      ...(wiredActions as object),
      [caseReducerKey]: createWiredAction(
        actionType as string,
        (instance as any)[caseReducerKey]
      )
    }),
    {}
  ) as WiredActions<T>;
}

function ensureValidParameters<T>(
  token: any,
  configure: WiredActionCandidates<T>
) {
  throwIf(!token, 'Cannot create an instance of "undefined".');
  throwIf(
    !configure,
    'Please configure at least one action having one case reducer.'
  );
}
