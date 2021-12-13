import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CounterComponent } from './counter.component';
import { CounterEffects } from './store/counter';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([CounterEffects])],
  declarations: [CounterComponent],
  exports: [CounterComponent]
})
export class CounterModule {}
