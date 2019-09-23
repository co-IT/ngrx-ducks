import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export type ActionCreatorConditional<T> = T extends void
  ? ActionCreator<string, () => TypedAction<string>>
  : ActionCreator<
      string,
      (props: { payload: T }) => { payload: T } & TypedAction<string>
    >;

export function bindAction<T = void>(
  type: string
): ActionCreatorConditional<T> {
  return createAction(
    type,
    props<{ payload: T }>()
  ) as ActionCreatorConditional<T>;
}

// const incoming = bindAction<number>('Hello');
// const outgoing = bindAction<number>('Bye');
// const actions$ = of() as Actions;

// const effect$ = createEffect(() =>
//   actions$.pipe(
//     ofType(incoming),
//     map(({ payload }) => outgoing({ payload }))
//   )
// );
