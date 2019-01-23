import { Action } from '../../action.decorator';

export class WithMultipleActionTypes {
  @Action(['0', '1'])
  multiple(state: number, payload: number) {
    return state + payload;
  }
}
