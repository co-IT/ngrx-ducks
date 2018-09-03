import { Action } from './action';

export interface ActionDispatcher {
  dispatch: (action: Action) => void;
}
