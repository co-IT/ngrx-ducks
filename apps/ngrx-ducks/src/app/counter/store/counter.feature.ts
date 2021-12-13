import { CounterState } from './counter';

export const counterFeatureName = 'counter';

export interface State {
  counterImmutable: CounterState;
  counterMutable: CounterState;
}
