import { Action } from '../../../src/decorator-api/decorators/action.decorator';

export const validActionType = '[Counter] Set Number';

export class WithValidActionType {
  @Action(validActionType)
  increase(state: number, payload: number) {
    return state + payload;
  }
}
