import { NgrxDucksError, throwIf } from '../../errors';
import { WiredAction, WiredActions } from '../types';
import { createWiredAction } from './create-wired-action';

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

export type WiredActionCandidates<T> = {
  [K in keyof FunctionProperties<T>]: string
};
export type Constructable = new (...args: any[]) => any;

export function wireUpActions<T extends Constructable>(
  token: T,
  candidates: WiredActionCandidates<InstanceType<T>>
): WiredActions<InstanceType<T>> {
  ensureValidParameters(token, candidates);

  const instance = new token();
  const caseReducers = ducksify(instance, candidates);

  return Object.assign(instance, caseReducers) as any;
}

function ensureValidParameters<T>(
  token: any,
  configure: WiredActionCandidates<T>
) {
  throwIf(
    !token,
    new NgrxDucksError('Cannot create an instance of "undefined".')
  );
  throwIf(
    !configure,
    new NgrxDucksError(
      'Please configure at least one action having one case reducer.'
    )
  );
}

function ducksify<T>(instance: T, candidates: WiredActionCandidates<T>) {
  return Object.entries(candidates).reduce(
    (wiredActions: Partial<WiredAction<T>>, [caseReducerKey, actionType]) => ({
      ...(wiredActions as object),
      [caseReducerKey]: createWiredAction(
        actionType as string,
        (instance as any)[caseReducerKey]
      )
    }),
    {}
  );
}
