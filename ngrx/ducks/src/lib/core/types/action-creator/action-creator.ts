import { MethodTakingOneParameter } from '../method/method-taking-one-parameter';
import { MethodTakingTwoParameters } from '../method/method-taking-two-parameters';
import { ActionCreatorWithPayload } from './action-creator-with-payload';
import { ActionCreatorWithoutPayload } from './action-creator-without-payload';

/**
 * Lesart:
 * - Wen Fn dem Typ MethodTakingOneParameter entspricht, dann wird der Typ StatMutator<ReturnType<Fn>> erzeugt
 */
export type ActionCreator<Fn> = Fn extends MethodTakingOneParameter
  ? ActionCreatorWithoutPayload
  : Fn extends MethodTakingTwoParameters<infer TSlice, infer TPayload>
    ? ActionCreatorWithPayload<TPayload>
    : never;
