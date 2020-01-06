import { ActionCreator } from '@ngrx/store';

export type ActionCreatorFilter<T> = ({
  [P in keyof T]: T[P] extends ActionCreator ? P : never
})[keyof T];
