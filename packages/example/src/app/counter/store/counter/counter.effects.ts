import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs/operators';
import { CounterFacade } from './counter.facade';

@Injectable()
export class CounterEffects {
  setCounter = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterFacade.actions.loadCount),
      delay(2000),
      map(({ payload }) => CounterFacade.actions.override(payload))
    )
  );

  constructor(private actions$: Actions) {}
}
