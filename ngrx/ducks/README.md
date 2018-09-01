# ngrx-ducks

> Make Redux serving the Open Closed Principle

## Usage

```ts
// counter.ducks

export class Counter implements DuckActions<Counter> {
  actions = wireUp({
    '[Counter] Set to certain value': this.set,
    '[Counter] Increment count': this.increment,
    '[Counter] Decrement count': this.decrement
  });

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

import { Counter } from 'counter.ducks';

export function reducer(state: State, action: Action) {
  return createReducerFrom(Counter);
}
```

```ts
// counter.module.ts

@NgModule({})
export class CounterModule {
  imports: [
    NgrxDucks.register([Counter, Foo, Bla])
  ],
  // providers: [
  //   {
  //     provide: Counter,
  //     useFactory(create: CreateDucks) { return create.from(Counter) },
  //     deps: [CreateDucks]
  //   }
  // ]
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
