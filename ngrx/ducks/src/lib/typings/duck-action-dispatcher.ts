import { ActionHandlerWithPayload } from './action-handler-with-payload';
import { ActionHandlerWithoutPayload } from './action-handler-without-payload';
import { LoadedAction } from './loaded-action';
import { PlainAction } from './plain-action';
export type DuckActionDispatcher<T> = T extends ActionHandlerWithoutPayload<
  infer _TSlice
>
  ? (() => void) & PlainAction
  : T extends ActionHandlerWithPayload<infer _TSlice, infer TPayload>
  ? ((payload: TPayload) => void) & LoadedAction<TPayload>
  : never;
