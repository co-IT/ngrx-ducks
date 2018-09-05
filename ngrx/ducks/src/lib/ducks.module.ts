import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { Store } from '@ngrx/store';

import { createSelfDispatchingActions } from './core/self-dispatching-actions/create-self-dispatching-actions';
import { WiredActions } from './core/types';

export type DucksRegistration = {
  duck: any;
  use: WiredActions<any>;
}[];

@NgModule()
export class DucksModule {
  static register(ducksRegistration: DucksRegistration): ModuleWithProviders {
    return {
      ngModule: DucksModule,
      providers: DucksModule.buildDuckProviders(ducksRegistration)
    };
  }

  private static buildDuckProviders(
    ducksRegistration: DucksRegistration
  ): Provider[] {
    return ducksRegistration.map(candidate => ({
      provide: candidate.duck,
      useFactory(store: Store<any>) {
        return createSelfDispatchingActions(candidate.use, store);
      },
      deps: [Store]
    }));
  }
}
