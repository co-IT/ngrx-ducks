import { Action, ActionReducer } from '@ngrx/store';
import { resolveReducers } from './resolve-reducers';
import { AnnotationTarget } from '../store-chunk/annotation-target';
import { StoreChunkConfiguration } from '../store-chunk/reducer-registration';
import { inferTypePrefixFromFeatureName } from '../store-chunk/connect';

export function getReducer<TState>(
  initialState: TState,
  Token: AnnotationTarget,
  configuration?: StoreChunkConfiguration
): ActionReducer<TState> {
  const instance = new Token();
  const typePrefix = inferTypePrefixFromFeatureName(configuration);

  const caseReducers: {
    [key: string]: Function;
  } = resolveReducers(instance, typePrefix);

  return function (state: TState = initialState, action: Action) {
    return caseReducers[action.type]
      ? caseReducers[action.type](state, (action as any).payload)
      : state;
  };
}
