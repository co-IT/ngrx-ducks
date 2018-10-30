import { CaseReducerWithPayload } from '../case-reducer/case-reducer-with-payload';
import { CaseReducerWithoutPayload } from '../case-reducer/case-reducer-without-payload';
import { DuckForEffect } from './duck-for-effect';
import { DuckWithPayload } from './duck-with-payload';
import { DuckWithoutPayload } from './self-dispatching-action-without-payload';

export type Duck<T> = T extends ActionForEffect
  ? DuckForEffect<T>
  : T extends CaseReducerWithPayload<infer _TSlice, infer TPayload>
    ? DuckWithPayload<TPayload>
    : T extends CaseReducerWithoutPayload<infer _TSlice>
      ? DuckWithoutPayload
      : never;

export type ActionForEffect = { type: string; };
