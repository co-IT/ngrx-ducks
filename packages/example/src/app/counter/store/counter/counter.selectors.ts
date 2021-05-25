import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '..';

const visitCounter = createFeatureSelector<State>('counter');

export const currentCount = createSelector(
  visitCounter,
  counter => counter.simple.count
);

export const currentCountWithOffset = (offset: number) =>
  createSelector(visitCounter, counter => counter.simple.count + offset);

export const isLoading = createSelector(
  visitCounter,
  counter => counter.simple.isLoading
);
