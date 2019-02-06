import { ActionHandlerWithoutPayload } from './ActionHandlerWithoutPayload';
import { ActionHandlerWithPayload } from './ActionHandlerWithPayload';
import { LoadedAction } from './LoadedAction';
import { PlainAction } from './PlainAction';
export type DuckActionDispatcher<T> = T extends ActionHandlerWithoutPayload<
  infer _TSlice
>
  ? (() => void) & PlainAction
  : T extends ActionHandlerWithPayload<infer _TSlice, infer TPayload>
  ? ((payload: TPayload) => void) & LoadedAction<TPayload>
  : never;
