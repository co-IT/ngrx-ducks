import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReducerManager } from '@ngrx/store';
import { ReducerManagerOpened } from './reducer-manager-opened';

@NgModule({})
export class StoreDuckModule {
  static forRoot(): ModuleWithProviders<StoreDuckModule> {
    return {
      ngModule: StoreDuckModule,
      providers: [{ provide: ReducerManager, useClass: ReducerManagerOpened }]
    };
  }
}
