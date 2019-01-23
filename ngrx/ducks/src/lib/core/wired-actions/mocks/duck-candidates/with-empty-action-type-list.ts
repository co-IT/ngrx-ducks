import { Action } from '../../action.decorator';

export class WithEmptyActionTypeList {
  @Action([] as any)
  undefinedIsNotValid(state: number, payload: number) {
    return state + payload;
  }
}
