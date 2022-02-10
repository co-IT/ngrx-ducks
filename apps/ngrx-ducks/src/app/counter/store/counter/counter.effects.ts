import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs/operators';
import { CounterStore } from './counter.store';

@Injectable()
export class CounterEffects {
  setCounter = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterStore.actions.loadCount),
      delay(2000),
      map(({ payload }) => CounterStore.actions.override(payload))
    )
  );

  constructor(private actions$: Actions) {}
}
