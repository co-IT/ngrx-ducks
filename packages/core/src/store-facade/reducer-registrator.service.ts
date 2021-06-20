import { Injectable } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  ReducerManager
} from '@ngrx/store';
import { ReducerManagerOpened } from './reducer-manager-opened';

@Injectable({ providedIn: 'root' })
export class ReducerRegistrator {
  get reducers() {
    return (this.reducerManager as ReducerManagerOpened).actionReducerMap;
  }

  constructor(private reducerManager: ReducerManager) {}

  register(
    targetFeature: string,
    reducer: ActionReducer<any, any> | ActionReducerMap<any, any>
  ) {
    const reducersOfFeature = this.reducers[targetFeature];

    // TODO: refine if a feature has no reducers set there is no need to combineReducers
    const reducersOfFeatureNext =
      reducersOfFeature !== undefined
        ? combineReducers({ reducersOfFeature, ...reducer })
        : typeof reducer === 'function'
        ? reducer
        : combineReducers({ ...reducer });

    this.reducerManager.addReducer(targetFeature, reducersOfFeatureNext);
  }
}
