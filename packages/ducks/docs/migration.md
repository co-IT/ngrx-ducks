## Migrate to Decorator API

### Duck Class

**BEFORE**

```ts
export class Counter {
  add(state: number, payload: number): number {
    return state + payload;
  }
}

export const counterAction = wireUpActions(Counter, {
  add: '[Counter] Add value'
});
```

**AFTER**

```ts
@Ducksify<number>({
  initialState: 0
})
export class Counter {
  @Action('[Counter] Add value')
  add(state: number, payload: number): number {
    return state + payload;
  }
}
```

#### Provider

**BEFORE**

```ts
import { createDucks } from '@co-it/ngrx-ducks';

@NgModule({
  providers: [
    {
      provide: Counter,
      useFactory: function(store) {
        return createDucks(counterActions, store);
      },
      deps: [Store]
    }
  ]
})
export class SomeModule {}
```

**AFTER**

```ts
// Not needed anymore 🚀
```

### Generate Reducer

**BEFORE**

```ts
import { createReducerFrom } from '@co-it/ngrx-ducks';
import { counterActions } from './counter.ducks';

export function reducer(state = initialState, action: Action): CounterSlice {
  return createReducerFrom(counterActions)(state, action);
}
```

**AFTER**

```ts
import { reducerFrom } from '@co-it/ngrx-ducks';
import { Counter } from './counter.duck';

// ⚠ No need for initialState since @InitialState already provides it.
export function reducer(state, action: Action): CounterSlice {
  return reducerFrom(Counter)(state, action);
}
```

### Inject a Duck

**BEFORE**

```ts
@Component({
  /* ... */
})
export class CounterComponent {
  constructor(@Inject(Counter) private counter: Ducks<Counter>) {}
}
```

**AFTER**

```ts
@Component({
  /* ... */
})
export class CounterComponent {
  // "Duck<T>" naming has change to singular.
  constructor(@Inject(Counter) private counter: Duck<Counter>) {
    // DEPRECATED
    counter.add.plain(1);

    // REPLACEMENT
    counter.add.action(1);
  }
}
```

## Deprecations

| Deprecated Function/Method | Replacement             |
| -------------------------- | ----------------------- |
| wireUpActions              | @Action & @InitialState |
| createDucks                | ducksify                |
| createReducerFrom          | reducerFrom             |
| Ducks                      | Duck                    |
| **Duck**                   |                         |
| [method].plain()           | [method].action()       |
