import { MemoizedSelector } from '@ngrx/store';
import { Observable } from 'rxjs';

// const feature = createFeatureSelector<number>('counter');
// const selectorPlain = createSelector(
//   feature,
//   state => state
// );
// const selectorProperty = createSelector(
//   selectorPlain,
//   (state: number, props: { value: number }) => state + props.value
// );

// const selectorProperty1 = createSelector(selectorPlain, (s, { s: number }) => 1);

export type SelectorConditional<
  T extends MemoizedSelector<any, any>
> = T extends MemoizedSelector<any, infer TResult>
  ? Observable<TResult>
  : never;

export type Selectors<
  T extends { [key: string]: MemoizedSelector<any, any> }
> = { [K in keyof T]: SelectorConditional<T[K]> };

export function bindSelectors<
  T extends { [key: string]: MemoizedSelector<any, any> }
>(selectors: T): Selectors<T> {
  return { __ngrx_ducks__selectors_original: selectors } as any;
}
