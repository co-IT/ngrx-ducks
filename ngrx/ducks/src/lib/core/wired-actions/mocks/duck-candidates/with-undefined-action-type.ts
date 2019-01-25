import { Action } from '../../../../decorators/action.decorator';

export class WithUndefinedActionType {
  @Action(undefined as any)
  undefinedIsNotValid(state: number, payload: number) {
    return state + payload;
  }
}
