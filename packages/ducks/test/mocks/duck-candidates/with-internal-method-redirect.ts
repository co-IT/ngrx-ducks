import { Action, InitialState } from '../../../src/decorators';

@InitialState(0)
export class WithInternalMethodCallRedirect {
  @Action('increment count')
  increment(state: number) {
    return ++state;
  }

  @Action('alias increment')
  incrementAlias(state: number) {
    return this.increment(state);
  }
}
