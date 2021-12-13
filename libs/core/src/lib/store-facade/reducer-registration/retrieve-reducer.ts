import { ActionReducer } from '@ngrx/store';
import { getMutableReducer } from '../../get-mutable-reducer/get-mutable-reducer';
import { getReducer } from '../../get-reducer';
import { AnnotationTarget } from '../annotation-target';
import { hasImmutableDuck } from './has-immutable-duck';
import { hasMutableDuck } from './has-mutable-duck';

export function retrieveReducer(
  initialState: unknown,
  Token: AnnotationTarget
): ActionReducer<any, any> {
  const instance = new Token();

  if (hasImmutableDuck(instance)) {
    return getReducer(initialState, Token);
  }

  if (hasMutableDuck(instance)) {
    return getMutableReducer(initialState, Token);
  }

  throw new Error(
    '[ngrx-ducks] StoreFacade: At least one Duck is required to build a reducer function. ' +
      'Please use either createDuck or createMutableDuck.'
  );
}
