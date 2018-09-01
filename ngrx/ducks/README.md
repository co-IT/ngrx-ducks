# ngrx-ducks

> Make Redux serving the Open Closed Principle

## Usage

```ts
// counter.ducks
export const counterActions = wireUpActions(Counter, counter => {
  '[Counter] Set to certain value': counter.set,
  '[Counter] Increment count': counter.increment,
  '[Counter] Decrement count': counter.decrement
});

export class Counter {
  set(state: State, payload: number): State {
    return {
      ...state,
      count: payload
    };
  }

  increment(state: State): State {
    return {
      ...state,
      count: ++state.count
    };
  }

  decrement(state: State): State {
    return {
      ...state,
      count: --state.count
    };
  }
}
```

```ts
// counter.reducer.ts

import { counterActions } from './counter.ducks';

export function reducer(state: State, action: Action) {
  return createReducerFrom(counterActions);
}
```

```ts
// counter.module.ts
import { counterActions, Counter } from './counter.ducks';

@NgModule({})
export class CounterModule {
  imports: [
    NgrxDucks.register([{
      duck: Counter, use: counterActions
    }])
  ]
}
```

```ts
// counter.component.ts

import { Counter } from 'counter.ducks';

@Component({})
export class CounterComponent {
  constructor(@Inject(Counter) private actions: Ducks<Counter>) {}

  initializeCount(count: number) {
    this.actions.increment(count);
  }
}
```
