import { Injectable } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  ReducerManager
} from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class ReducerRegistrator {
  constructor(private reducerManager: ReducerManager) {}

  register(
    targetFeature: string,
    reducer: ActionReducer<any, any> | ActionReducerMap<any, any>
  ) {
    const reducersOfFeature = this.reducerManager.currentReducers[
      targetFeature
    ];

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
