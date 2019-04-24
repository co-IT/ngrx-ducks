export class WithoutActionDecorator {
  increase(state: number, payload: number) {
    return state + payload;
  }
}
