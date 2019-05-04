import { Action, InitialState } from '../../../src/decorators';

@InitialState(0)
export class WithInitialState {
  @Action('increment count')
  increment(state: number) {
    return ++state;
  }
}
