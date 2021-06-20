import { Inject, Injectable } from '@angular/core';
import {
  ActionReducerFactory,
  ActionReducerMap,
  INITIAL_REDUCERS,
  INITIAL_STATE,
  ReducerManager,
  ReducerManagerDispatcher,
  REDUCER_FACTORY
} from '@ngrx/store';

@Injectable()
export class ReducerManagerOpened extends ReducerManager {
  get actionReducerMap(): ActionReducerMap<any, any> {
    return (this as any).reducers;
  }

  constructor(
    dispatcher: ReducerManagerDispatcher,
    @Inject(INITIAL_STATE) initialState: any,
    @Inject(INITIAL_REDUCERS) initialReducers: ActionReducerMap<any, any>,
    @Inject(REDUCER_FACTORY)
    reducerFactory: ActionReducerFactory<any, any>
  ) {
    super(dispatcher, initialState, initialReducers, reducerFactory);
  }
}
