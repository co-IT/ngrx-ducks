import { ActionHandlerWithPayload } from './action-handler-with-payload';
import { ActionHandlerWithoutPayload } from './action-handler-without-payload';
import { LoadedAction } from './loaded-action';
import { PlainAction } from './plain-action';

export type DuckActionDispatcher<T> = T extends DispatcherForEffect
  ? EffectDispatcher<T>
  : T extends ActionHandlerWithoutPayload<infer _TSlice>
  ? (() => void) & PlainAction
  : T extends ActionHandlerWithPayload<infer _TSlice, infer TPayload>
  ? ((payload: TPayload) => void) & LoadedAction<TPayload>
  : never;

export type DispatcherForEffect = { type: string };

export type EffectDispatcher<T> = T extends {
  type: string;
  action: () => void;
}
  ? {
      type: string;
      dispatch: () => void;
    }
  : T extends {
      type: string;
      action: (payload: infer TPayload) => void;
    }
  ? {
      type: string;
      dispatch: (payload: TPayload) => void;
    }
  : never;
