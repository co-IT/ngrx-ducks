import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export type ActionCreatorWithCaseReducerOptional<
  TPayload,
  TCaseReducer
> = TCaseReducer extends Function
  ? ActionCreatorConditional<TPayload> & { runCaseReducer: TCaseReducer }
  : ActionCreatorConditional<TPayload>;

export type ActionCreatorConditional<TPayload> = TPayload extends void
  ? ActionCreator<string, () => TypedAction<string>>
  : ActionCreator<
      string,
      (
        props: { payload: TPayload }
      ) => { payload: TPayload } & TypedAction<string>
    >;

export function bindAction<TPayload = void, TCaseReducer = unknown>(
  type: string,
  caseReducer?: TCaseReducer
): ActionCreatorWithCaseReducerOptional<TPayload, TCaseReducer> {
  const creator = createAction(
    type,
    props<{ payload: TPayload }>()
  ) as ActionCreatorConditional<TPayload>;

  if (!caseReducer) {
    // @ts-ignore
    return creator;
  }

  // @ts-ignore
  return Object.assign(creator, {
    runCaseReducer: caseReducer
  });
}
