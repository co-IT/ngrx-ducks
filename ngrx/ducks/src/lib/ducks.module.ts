import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { createDucks } from './core/ducks/create-ducks';
import { WiredActions } from './core/types';

export type DucksRegistration = {
  duck: any;
  use: () => WiredActions<any>;
};

@NgModule()
export class DucksModule {
  static register(ducksRegistration: DucksRegistration[]): ModuleWithProviders {
    return {
      ngModule: DucksModule,
      providers: DucksModule.buildDuckProviders(ducksRegistration)
    };
  }

  private static buildDuckProviders(
    ducksRegistration: DucksRegistration[]
  ): Provider[] {
    return ducksRegistration.map(DucksModule.buildSingleDucksProvider);
  }

  private static buildSingleDucksProvider(candidate: DucksRegistration) {
    return {
      provide: candidate.duck,
      useFactory(store: Store<any>) {
        return createDucks(candidate.use(), store);
      },
      deps: [Store]
    };
  }
}
