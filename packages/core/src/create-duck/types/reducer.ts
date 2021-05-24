import { ReducerPayload } from './reducer-payload';
import { ReducerPlain } from './reducer-plain';

export type Reducer<TSlice, TPayload> = TPayload extends undefined
  ? ReducerPlain<TSlice>
  : ReducerPayload<TSlice, TPayload>;
