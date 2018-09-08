import { CaseReducerWithPayload } from '../case-reducer/case-reducer-with-payload';
import { CaseReducerWithoutPayload } from '../case-reducer/case-reducer-without-payload';
import { DuckForEffect } from './duck-for-effect';
import { DuckWithPayload } from './self-dispatching-action-with-payload';
import { DuckWithoutPayload } from './self-dispatching-action-without-payload';

export type Duck<T> = T extends string
  ? DuckForEffect
  : T extends CaseReducerWithPayload<infer TSlice, infer TPayload>
    ? DuckWithPayload<TPayload>
    : T extends CaseReducerWithoutPayload<infer TSlice>
      ? DuckWithoutPayload
      : never;
