import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs/operators';
import { counterStoreChunkActions } from './counter.store-chunk';

@Injectable()
export class CounterEffects {
  setCounter = createEffect(() =>
    this.actions$.pipe(
      ofType(counterStoreChunkActions.loadCount),
      delay(2000),
      map(({ payload }) => counterStoreChunkActions.override(payload))
    )
  );

  constructor(private actions$: Actions) {}
}
