import { Action, InitialState } from '../../../src/lib/decorators';

@InitialState(0)
export class WithInitialState {
  @Action('increment counts')
  increment(state: number) {
    return ++state;
  }
}
