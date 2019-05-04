import { MemoizedSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActionHandlerWithPayload } from './action-handler-with-payload';
import { ActionHandlerWithoutPayload } from './action-handler-without-payload';
import { DispatcherForEffect } from './dispatcher-for-effect';
import { EffectActionCreator } from './effect-action-creator';
import { LoadedAction } from './loaded-action';
import { PlainAction } from './plain-action';

export type DuckActionDispatcher<T> = T extends DispatcherForEffect
  ? EffectActionCreator<T>
  : T extends MemoizedSelector<infer _TState, infer TResult>
  ? Observable<TResult>
  : T extends ActionHandlerWithoutPayload<infer _TSlice>
  ? (() => void) & PlainAction & { type: string }
  : T extends ActionHandlerWithPayload<infer _TSlice, infer TPayload>
  ? ((payload: TPayload) => void) & LoadedAction<TPayload> & { type: string }
  : never;
