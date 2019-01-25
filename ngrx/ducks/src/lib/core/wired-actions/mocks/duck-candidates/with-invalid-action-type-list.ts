import { Action } from '../../../../decorators/action.decorator';

export class WithInvalidActionTypeList {
  @Action([undefined, null, ''] as any)
  undefinedIsNotValid(state: number, payload: number) {
    return state + payload;
  }
}
