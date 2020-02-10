# Quick Start

> A plugin for [ngrx] automating creation and dispatch of actions.

## Benefits

- ⚙️ Create both Reducer and Action Automatically
- 🤫 Get rid of verbose action declarations
- ️️️⤵️ Reduce imports of Action Types and Action Creators
- 💉 Use typed Services instead of dispatching Actions
- 🙅‍ No code generation that needs ot be maintained manually

## Which version of **ngrx** is supported?

The version number of ngrx-ducks is aligned with ngrx/platform.
The major versions of both projects are compatible with each other.

## What is a Duck?

A Duck bundles the tasks of

- [Action Creator][1]
- [Dispatching Function][2]
- [Case Reducer][3]

As user you only need to declare witch method needs to be executed when a certain
action is dispatched.

Multiple Ducks are used to generate the [Reducer][4] automatically.

You end up writing a class containing pure functions.
Leave the rest to `ngrx-ducks`.

Components are fully independent of Redux-Architecture

[1]: https://redux.js.org/glossary#dispatching-function
[2]: https://redux.js.org/glossary#action-creator
[3]: https://redux.js.org/recipes/structuring-reducers/refactoring-reducer-example
[4]: https://redux.js.org/glossary#reducer
[5]: https://youtu.be/NSNsxSFJM-8?t=2177

## Demo

You find a demo using `ngrx-ducks` at [ngrx-ducks-9](https://stackblitz.com/edit/ngrx-ducks-9).
More explanations in another format here [Api Discussion][5]

## Start with Ducks

### Implement State Mutations

First create a file where the mutation logic for a certain state slice
should live. Put selectors logic here as well.

Add a class that implements the needed `Case Reducers`, builds required selectors and triggers actions.

`createDuck` supports to create both triggering actions (for Effects) and mutating actions. Second parameter of `createDuck` is a `Case Reducers`. It has a similar style of creating a reducer which actually makes state mutations.

```ts
// counter.facade.ts
import { createDuck } from '@ngrx-ducks/core';

@StoreFacade()
export class CounterFacade {
  counter = bindSelectors({ count: selectors.currentCount });
  
  loadCount = createDuck('[Counter] Set initial value',
    (state: CounterState, payload: number) => {
      return { ...state, count: payload };
  });
}
```

The decorator `StoreFacade` introduces a new mechanism how the Facade is connected with the Store. 🚀 

### Create Reducer automatically

If you use Ducks there is no need to maintain switch-case statements.
Now you can create the Reducer based on the `wiredActions`.

```ts
// counter.facade.ts
import { getReducer } from '@ngrx-ducks/core';

@StoreFacade()
export class CounterFacade {
  /* ... */
}

// declare initial state and export counterReducer
const initialState = { count: 0 };
export const counterReducer = getReducer(initialState, CounterFacade);
```

The type `DucksifiedAction` is just to declare that the incoming action may have a payload.
We do not need to care about the underlying action types since `ngrx-ducks` takes cafe of it and produces a strongly typed API for us.

### Inject the Ducks Service

To use your Ducks you need to inject them into you component.

```ts
/// counter.component.ts

@Component({
  /* ... */
})
export class CounterComponent {
  constructor(@Inject(Counter) private counter: Duck<Counter>) {}
}
```

Since `@Ducksify` adds Action Creators to `Counter` we receive an
enhanced version of that class having the type `Duck<Counter>`.

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
    //               - dispatches action: type: '[Counter] Set initial value'
    //                                    payload: 5000
  }
}
```

### Use ngrx selectors

The Ducks service allows you to select state information from the store.
Notice, you do not need to inject the Store anymore. You have one API the Ducks-API. 🐤

```ts
// reducer/index.ts
const visitCounter = createFeatureSelector('counter');
export const currentCount = createSelector(
  visitCounter,
  c => c.count
);

// counter.component.ts
import { currentCount } from '../reducer';

export class CounterComponent {
  counter$: Observable<number>;

  constructor(@Inject(Counter) private counter: Duck<Counter>) {
    this.count$ = this.counter.pick(currentCount);
  }
}
```

#### What if I don't want to dispatch the action directly

No worries, `ngrx-ducks` gets you covered in this question.
Each dispatching method provides an Action Creator.

```ts
  ngOnInit() {
    // Yields Action
    this.counter.set.action(5000);
    // {
    //   type: '[Counter] Set initial value',
    //   payload: 5000
    // }

    // Dispatches an action
    this.counter.set(5000);

  }
```

You see each dispatching method has a further property called `action`
which is a method as well. 🤯
This addition is very useful if you need to produce actions being returned by an
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
  readonly delayedCounterSet = effect<number>(
    '[Counter] Set counter after a while'
  );

  /* ... */
}
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
    map(() => this.counter.set.action(100000))
  );

  constructor(
    private actions$: Actions,
    @Inject(Counter) private counter: Duck<Counter>
  ) {}
}
```

As mentioned before you can make use of the generated, typed action creators to
create an action that is handled by the Effect.

> You see the only API you have to work with is the Ducks-API.
> It does not change anything in [ngrx] but automates the process dealing with
> actions.
