import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { createSelfDispatchingActions } from './core/self-dispatching-actions/create-self-dispatching-actions';

export type DucksRegistration = {
  duck: any;
  use: any;
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
