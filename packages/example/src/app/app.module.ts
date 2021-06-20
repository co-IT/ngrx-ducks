import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { ReducerManager, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReducerManagerOpened } from '../../../core/src/store-facade/reducer-manager-opened';
import { AppComponent } from './app.component';
import { CounterModule } from './counter/counter.module';

@NgModule({
  imports: [
    BrowserModule,
    CounterModule,

    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([])
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: ReducerManager, useClass: ReducerManagerOpened }]
})
export class AppModule {}
