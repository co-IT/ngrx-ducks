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
[6]: https://ngrx.io/api/store/combineReducers

## Demo

You find a demo using `ngrx-ducks` at [ngrx-ducks-9](https://stackblitz.com/edit/ngrx-ducks-9).
More explanations in another format here [Api Discussion][5]

## Start with Ducks

### Best way to start

Follow this doc up with this great demo [ngrx-ducks-9](https://stackblitz.com/edit/ngrx-ducks-9). 
Entire code and examples is used from demo. 💎

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

Just created `counterReducer` is a variable which can be used in ngrx method `combineReducers` [doc][6]. From that point our implementation of a reducer is finished. Example below shows us basic implementation.

```ts
//index.ts
import { Action, combineReducers, MetaReducer } from '@ngrx/store';
import { CounterState, counterReducer } from './counter';

export interface State {
  simple: CounterState;
}

export function reducers(state: State, action: Action) {
  return combineReducers<State>({
    simple: counterReducer
  })(state, action);
}

export const metaReducers: MetaReducer<State>[] = [];
```

### Inject the StoreFacade Service

To use your Facade you need to inject it into you component.

```ts
// counter.component.ts

@Component({
  /* ... */
})
export class CounterComponent {
  constructor(private counter: CounterFacade) {}
}
```

Since the whole logic is implemented in a Facade (CounterFacade in our case) we only need to import that Facade.

🎉 The API allows you to create dynamic facades and your components do not even know that Redux is working behind the scenes. We only rely on the contracts that we use messaging and streams.

> 🙏 Thanks to TypeScript each method is strictly typed and the whole process of creating or dispatching Actions is transparent 👓.

```ts
// counter.component.ts

@Component({
  /* ... */
})
export class CounterComponent implements OnInit {
  /* ... */

  ngOnInit() {
    this.counter.loadCount.dispatch(5000);
    //               ^ only type number is allowed 🎉
    //               - dispatches action: type: '[Counter] Set initial value'
    //                                    payload: 5000
  }
}
```

### Use ngrx selectors

Creating selectors is the same way as it's in ngrx.

```ts
// counter.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '..';

const visitCounter = createFeatureSelector<State>('counter');

export const currentCount = createSelector(
  visitCounter,
  counter => counter.simple.count
);

// counter.component.ts
import { currentCount } from './counter.selectors';

export class CounterComponent {
  counter$: Observable<number>;

  constructor(private counter: CounterFacade) {
    this.count$ = this.counter.select.currentCount;
  }
}
```

#### What if I don't want to dispatch the action directly

No worries, `ngrx-ducks` gets you covered in this question.
Each dispatching method provides an Action Creator.

```ts
  ngOnInit() {
    // Yields Action
    this.counter.loadCount(5000);
    // {
    //   type: '[Counter] Set initial value',
    //   payload: 5000
    // }

    // Dispatches an action
    this.counter.loadCount.dispatch(5000);

  }
```

You see `.loadCount(5000);` is a method as well. 🤯 This addition is very useful if you need to produce actions being returned by an Effect.

### Effects

You may wonder if `ngrx-ducks` can help you with actions being dispatched to an Effect.
Short answer: **Yes, it can**.

#### Setup

Let's use `createDuck` again! `createDuck` is the only entry point you need to know to create and dispatch actions.
It works with calling Effects as well.
It works with Effects just like actions work with Effects in ngrx.

```ts
// counter.facade.ts
import { createDuck } from '@ngrx-ducks/core';

@StoreFacade()
export class CounterFacade {

  readonly loadCount = createDuck('[Counter] Load Count', dispatch<number>());

  // another action (called in Effect below)
  override = createDuck('[Counter] Set value',
    (state: CounterState, payload: number) => {
      return { ...state, count: payload };
    }
  );
}

export const counterActions = getActions(CounterFacade);
```

#### Triggering an Effect

```ts
// counter.component.ts
import { currentCount } from './counter.selectors';

@Component({
  /* ... */
})
export class CounterComponent {
  counter$: Observable<number>;

  constructor(private counter: CounterFacade) {
    // let's dispatch an action which is handled by an Effect
    this.counter.loadCount.dispatch(10);
  }
}

```

#### Inside Effects

The last question is how an Effect itself handles actions with `ngrx-ducks`.
An Effect filters the action type first.
Let ngrx do it! 😁

```ts
// counter.effects.ts

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { counterActions } from './counter.facade';

@Injectable()
export class CounterEffects {
  setCounter = createEffect(() => this.actions$.pipe(
    ofType(counterActions.loadCount),
    delay(2000),
    map(({ payload }) => counterActions.override(payload))
  ));

  constructor(private actions$: Actions) {}
}

```

As mentioned before you can make use of the generated, typed action creators to
create an action that is handled by the Effect.

> You see the only API you have to work with is the Ducks-API.
> It does not change anything in [ngrx] but automates the process dealing with
> actions.
