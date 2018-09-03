import { CaseReducerWithPayload } from '../case-reducer/case-reducer-with-payload';
import { CaseReducerWithoutPayload } from '../case-reducer/case-reducer-without-payload';
import { DuckWithPayload } from './self-dispatching-action-with-payload';
import { DuckWithoutPayload } from './self-dispatching-action-without-payload';

export type Duck<T> = T extends string
  ? string
  : T extends CaseReducerWithPayload<infer TSlice, infer TPayload>
    ? DuckWithPayload<TPayload>
    : T extends CaseReducerWithoutPayload<infer TSlice>
      ? DuckWithoutPayload
      : never;
