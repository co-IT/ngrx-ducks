import { MutableReducerPayload } from './mutable-reducer-payload';
import { MutableReducerPlain } from './mutable-reducer-plain';

export type MutableReducer<TSlice, TPayload> = TPayload extends undefined
  ? MutableReducerPlain<TSlice>
  : MutableReducerPayload<TSlice, TPayload>;
