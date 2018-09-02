import { Action } from '@ngrx/store';

export interface Store {
  dispatch: (action: Action) => void;
}
