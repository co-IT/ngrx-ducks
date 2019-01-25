import { Action } from '../../../src/lib/decorators/action.decorator';

export class WithEmptyActionType {
  @Action('')
  emptyIsNotValid(state: number, payload: number) {
    return state + payload;
  }
}
