import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../counter.feature';

const visitCounter = createFeatureSelector<State>('counter');

export const currentCount = createSelector(
  visitCounter,
  counter => counter.counterImmutable.count
);

export const currentCountWithOffset = (offset: number) =>
  createSelector(
    visitCounter,
    counter => counter.counterImmutable.count + offset
  );

export const isLoading = createSelector(
  visitCounter,
  counter => counter.counterImmutable.isLoading
);
