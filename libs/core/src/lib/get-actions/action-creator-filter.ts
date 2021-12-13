import { ActionCreator } from '@ngrx/store';

export type ActionCreatorFilter<T> = {
  [P in keyof T]: T[P] extends ActionCreator
    ? P
    : T[P] extends LiteralContainingActionCreator<T[P]>
    ? P
    : never;
}[keyof T];

export type LiteralContainingActionCreator<T> = {
  [P in keyof T]: T[P] extends ActionCreator ? T : never;
}[keyof T];
