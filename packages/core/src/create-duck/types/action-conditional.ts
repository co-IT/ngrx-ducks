import { ActionLoaded } from './action-loaded';
import { ActionPlain } from './action-plain';
import { DispatchLoaded } from './dispatch-loaded';
import { DispatchPlain } from './dispatch-plain';

export type ActionConditional<TType extends string, TPayload> = [
  TPayload
] extends [undefined]
  ? ActionPlain<TType> & DispatchPlain
  : ActionLoaded<TType, TPayload> & DispatchLoaded<TPayload>;
