import { Action, ActionReducer } from '@ngrx/store';
import { Draft, produce } from 'immer';
import { resolveReducers } from '../get-reducer';
import { AnnotationTarget } from '../store-chunk/annotation-target';
import { StoreChunkConfiguration } from '../store-chunk/reducer-registration';
import { inferTypePrefixFromFeatureName } from '../store-chunk/connect';

export function getMutableReducer<TState>(
  initialState: TState,
  Token: AnnotationTarget,
  configuration?: StoreChunkConfiguration
): ActionReducer<TState> {
  const instance = new Token();
  const typePrefix = inferTypePrefixFromFeatureName(configuration);
  const caseReducers = resolveReducers(instance, typePrefix);

  const reducer = (draft: Draft<TState>, action: Action) => {
    caseReducers[action.type]?.(draft, (action as any).payload);
  };

  return produce(reducer, initialState);
}
