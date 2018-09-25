# ngrx-ducks

> A plugin for [ngrx] automating creation and dispatch of actions.

[ngrx]: https://github.com/ngrx/platform

## Benefits

- ⚙️ Create Reducer Automatically
- 🤫 Get rid of verbose action declarations
- ️️️⤵️ Reduce imports of Action Types and Action Creators
- 💉 Use typed Services instead of dispatching Actions
- 🙅‍ No code generation that needs ot be maintained manually

## What is a Duck?

A Duck bundles the tasks of

- [Action Creator][1]
- [Dispatching Function][2]
- [Case Reducer][3]

As user you only need to declare witch method needs to be executed when a certain
action is dispatched.

Multiple Ducks are used to generate the [Reducer](4) automatically.

You end up writing a class containing pure functions.
Leave the rest to `ngrx-ducks`.

[1]: https://redux.js.org/glossary#dispatching-function
[2]: https://redux.js.org/glossary#action-creator
[3]: https://redux.js.org/recipes/structuringreducers/refactoringreducersexample#extracting-case-reducers
[4]: https://redux.js.org/glossary#reducer

## Demo

You find a demo using `ngrx-ducks` at [ngrx-ducks-demo](https://github.com/GregOnNet/ngrx-ducks-demo).

## Start with Ducks

### Implement State Mutations

First create a file where the mutation logic for a certain state slice
should live.
Add a class that implements the needed `Case Reducers`.

```ts
// counter.ducks.ts

export class Counter {
  set(state: State, payload: number) {
    return { ...state, count: payload };
  }
}
```

> _Please note_ that the type `State` just contains one property `count`.

### Wire up Actions

Now you need to bind your Logic to an action type.
Therefore you need to use the factory `wireUpActions`.

```ts
// counter.ducks.ts
import { wireUpActions } from '@co-it/ngrx-ducks';

/* ... */

export const counterActions = wireUpActions(Counter, {
  set: '[Counter] Set initial value'
});
```

### Create Reducer automatically

If you use Ducks there is no need to maintain switch-case statements.
Now you can create the Reducer based on the `wiredActions`.

```ts
// counter.reducer.ts
import { createReducerFrom } from '@co-it/ngrx-ducks';

import { counterActions } from './counter.ducks';

export function reducer(state = initialState, action: Action): CounterSlice {
  return createReducerFrom(counterActions)(state, action);
}
```

### Provide the Ducks Service

The last step is to generate the dispatchers for your actions.
With `ngrx-ducks` you can provide those as a Service.

As seen before you need to pass the `counterActions` to a factory.
You just use another helper here called `createDucks`.

```ts
@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([CounterEffects])
    /// ...
  ],
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
export class AppModule {}
```

You see that `createDucks` transforms `counterActions` to be able to dispatch actions.

🎉 Congratulations you have set up your wird Ducks service.
From now on you only need to edit or enhance `counter.ducks.ts`.
`ngrx-ducks` takes care to set up the infrastructure for you.

### Inject the Ducks Service

To use your Ducks you need to inject them into you component.

```ts
/// counter.component.ts

@Component({
  /* ... */
})
export class CounterComponent {
  constructor(@Inject(Counter) private counter: Ducks<Counter>) {}
}
```

Since `createDucks` adds Action Creators to `Counter` we receive an
enhanced version of that class having the type `Ducks<Counter>`.

You will see that you can call each method of the class taking the payload.

> 🙏 Thanks to TypeScript each method is strictly typed and the whole process of creating or dispatching Actions is transparent 👓.

```ts
// counter.component.ts

@Component({
  /* ... */
})
export class CounterComponent implements OnInit {
  /* ... */

  ngOnInit() {
    this.counter.set(5000);
    //               ^ only type number is allowed 🎉
  }
}
```

#### What if I don't want to dispatch the action directly

No worries, `ngrx-ducks` gets you covered in this question.
Each dispatching method provides an Action Creator.

```ts
  ngOnInit() {
    // Yields Action
    this.counter.set.plain(5000);
    // {
    //   type: '[Counter] Set initial value',
    //   payload: 5000
    // }

    // Dispatches an action
    this.counter.set(5000);

  }
```

You see each dispatching method has a further property called `plain`
which is a method as well. 🤯
This addition is very useful if you need to produce actions being return by an
Effect.

### Effects

You may wonder if `ngrx-ducks` can help you with actions being dispatched to an Effect.
Short answer: **Yes, it can**.

#### Setup

Therefore you can enhance the existing class providing the type
of the triggering action.
That type is passed to a helper called `effect`.
This allows you to declare actions with or without payload being
processed by the `Effect`.
I call them effect properties.

```ts
// counter.ducks.ts

export class Counter {
  readonly load = effect('[Counter] Load Counter Value');
  readonly delayedCounterSet = effect<number>('[Counter] Set counter after a while');
```

#### Triggering an Effect

Since the effect properties are members of `Counter` you can use them
without any further setup in you component.
You will see that each effect property now has a typed method called `dispatch`.

```ts
// counter.component.ts

@Component({
  /* ... */
})
export class CounterComponent implements OnInit {
  /* ... */

  ngOnInit() {
    this.counter.load.dispatch();
    //                        ^ does not take a parameter

    this.counter.delayedCounterSet.dispatch(5000);
    //                                     ^ expects a number
  }
}
```

#### Inside Effects

The last question is how an Effect itself handles actions with `ngrx-ducks`.
An Effect filters the action type first.
First you need to inject `Ducks<Counter>` as we did before.
Luckily, the `effect property` provides the `type` directly.

```ts
/// counter.effects.ts
@Injectable()
export class CounterEffects {
  @Effect()
  load = this.actions$.pipe(
    ofType(this.counter.load.type),
    map(() => this.counter.set.plain(100000))
  );

  constructor(
    private actions$: Actions,
    @Inject(Counter) private counter: Ducks<Counter>
  ) {}
}
```

As mentioned before you can make use of the generated, typed action creators to
create an action that is handled by the Effect.

> You see the only API you have to work with is the Ducks-API.
> It does not change anything in [ngrx] but automates the process dealing with
> actions.
