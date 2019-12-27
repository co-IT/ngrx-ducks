import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export type CaseReducer = (slice: any) => any;
export type CaseReducerPayload = (slice: any, payload: any) => any;

export type ActionCreatorWithCaseReducerOptional<
  TDeclaredPayload,
  TActionType extends string,
  TCaseReducer
> = TCaseReducer extends undefined
  ? ActionCreatorConditional<TDeclaredPayload, TActionType>
  : ActionCreatorConditional<TDeclaredPayload, TActionType> & {
      runCaseReducer: TCaseReducer;
    };

export type ActionCreatorConditional<
  TPayload,
  TActionType extends string
> = TPayload extends void
  ? ActionCreator<TActionType, () => TypedAction<TActionType>>
  : ActionCreator<
      TActionType,
      (
        props: { payload: TPayload }
      ) => { payload: TPayload } & TypedAction<TActionType>
    >;

export function createDuck<
  TPayload = void,
  TActionType extends string = string,
  TCaseReducer extends CaseReducer | CaseReducerPayload | undefined = undefined
>(
  type: TActionType,
  caseReducer?: TCaseReducer
): ActionCreatorWithCaseReducerOptional<TPayload, TActionType, TCaseReducer> {
  const creator = createAction(
    type,
    props<{ payload: TPayload }>()
  ) as ActionCreatorConditional<TPayload, TActionType>;

  // @ts-ignore
  return !caseReducer
    ? creator
    : Object.assign(creator, { runCaseReducer: caseReducer });
}
