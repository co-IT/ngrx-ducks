import { Action, combineReducers, MetaReducer } from '@ngrx/store';
import { CounterFacade, CounterState } from './counter';

export interface State {
  simple: CounterState;
}

export function reducers(state: State, action: Action) {
  return combineReducers<State>({
    simple: CounterFacade.reducer
  })(state, action);
}

export const metaReducers: MetaReducer<State>[] = [];
