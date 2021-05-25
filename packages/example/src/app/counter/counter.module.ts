import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CounterComponent } from './counter.component';
import { reducers } from './store';
import { CounterEffects } from './store/counter';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('counter', reducers),
    EffectsModule.forFeature([CounterEffects])
  ],
  declarations: [CounterComponent],
  exports: [CounterComponent]
})
export class CounterModule {}
