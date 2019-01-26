@InitialState(0)
export class WithInitialState {
  @Action(incrementActionType)
  increment(state: number) {
    return ++state;
  }
}
