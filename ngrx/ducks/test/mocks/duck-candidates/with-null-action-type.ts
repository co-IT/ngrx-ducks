import { Action } from '../../../src/lib/decorators/action.decorator';

export class WithNullActionType {
  @Action(null as any)
  nullIsNotValid(state: number, payload: number) {
    return state + payload;
  }
}
