import { Action } from '../../action.decorator';

export const actionType = '[Counter] Set Number';

export class WithValidActionType {
  @Action(actionType)
  increase(state: number, payload: number) {
    return state + payload;
  }
}
