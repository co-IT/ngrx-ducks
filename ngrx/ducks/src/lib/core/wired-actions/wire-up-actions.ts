import { WiredAction } from '../types';
import { createWiredAction } from './create-wired-action';
import { throwIf } from '../validation';

export type WiredActionCandidates = { [key: string]: Function };

export type WiredActions<T> = { [K in keyof T]: WiredAction<T[K]> };

export type Constructable<T> = new () => T;

export function wireUpActions<T>(
  token: Constructable<T>,
  configure: (instance: T) => WiredActionCandidates
): WiredAction<any>[] {
  ensureValidParameters(token, configure);

  const instance = new token();
  const candidates = configure(instance);

  return Object.entries(candidates).map(([key, caseReducer]) =>
    createWiredAction(key, caseReducer)
  );
}

function ensureValidParameters(token: any, configure: Function | undefined) {
  throwIf(!token, 'Cannot create an instance of "undefined".');
  throwIf(
    !configure,
    'Please configure at least one action having one case reducer.'
  );
}
