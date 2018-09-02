import { MethodTakingOneParameter } from '../method/method-taking-one-parameter';
import { MethodTakingTwoParameters } from '../method/method-taking-two-parameters';
import { CaseReducerWithPayload } from './case-reducer-with-payload';
import { CaseReducerWithoutPayload } from './case-reducer-without-payload';

export type CaseReducer<Fn> = Fn extends MethodTakingOneParameter
  ? CaseReducerWithoutPayload<ReturnType<Fn>>
  : Fn extends MethodTakingTwoParameters<infer TSlice, infer TPayload>
    ? CaseReducerWithPayload<TSlice, TPayload>
    : never;
