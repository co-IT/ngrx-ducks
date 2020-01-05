import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

export function StoreFacade() {
  return function(Token: new () => InstanceType<any>) {
    return Injectable({
      providedIn: 'root',
      useFactory: (store: Store<unknown>) => connectFacadeToStore(Token, store),
      deps: [Store]
    })(Token);
  };
}

function connectFacadeToStore(
  Token: new () => InstanceType<any>,
  store: Store<unknown>
) {
  const instance = new Token();

  Object.keys(instance).forEach(property => {
    const { type, dispatch } = instance[property];
    if (!dispatch) {
      return;
    }

    instance[property].dispatch = (payload?: any) =>
      !payload ? store.dispatch({ type }) : store.dispatch({ type, payload });
  });

  return instance;
}
