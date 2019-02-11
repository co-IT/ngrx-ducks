import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ducksify } from '../ducks';
import { DucksifyConfig } from '../typings';
import { InitialState } from './initial-state.decorator';

export function Ducksify<T>(config: DucksifyConfig<T>) {
  return function(target: any) {
    const targetWithInitialState = InitialState(config.initialState)(target);
    return Injectable({
      providedIn: 'root',
      useFactory: (store: Store<unknown>) => ducksify(target, store),
      deps: [Store]
    })(targetWithInitialState);
  };
}
