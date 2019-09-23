import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export type ActionCreatorWithCaseReducerOptional<
  TDeclaredPayload,
  TCaseReducer
> = TCaseReducer extends Function
  ? ActionCreatorConditional<TDeclaredPayload> & {
      runCaseReducer: TCaseReducer;
    }
  : ActionCreatorConditional<TDeclaredPayload>;

export type ActionCreatorConditional<TPayload> = TPayload extends void
  ? ActionCreator<string, () => TypedAction<string>>
  : ActionCreator<
      string,
      (
        props: { payload: TPayload }
      ) => { payload: TPayload } & TypedAction<string>
    >;

export function bindAction<TDeclaredPayload = void, TCaseReducer = unknown>(
  type: string,
  caseReducer?: TCaseReducer
): ActionCreatorWithCaseReducerOptional<TDeclaredPayload, TCaseReducer> {
  const creator = createAction(
    type,
    props<{ payload: TDeclaredPayload }>()
  ) as ActionCreatorConditional<TDeclaredPayload>;

  if (!caseReducer) {
    // @ts-ignore
    return creator;
  }

  // @ts-ignore
  return Object.assign(creator, {
    runCaseReducer: caseReducer
  });
}
