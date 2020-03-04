import { Action, Ducksify } from '../../../src/decorator-api/decorators';

@Ducksify({ initialState: 0 })
export class WithDucksify {
  @Action('increment count')
  increment(state: number) {
    return ++state;
  }
}
