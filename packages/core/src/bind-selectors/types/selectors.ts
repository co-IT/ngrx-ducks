import { MemoizedSelector } from '@ngrx/store';
import { MemoizedSelectorFactory } from './memoized-selector-factory';
import { SelectorConditional } from './selector-conditional';

export type Selectors<
  T extends {
    [key: string]:
      | MemoizedSelector<any, any>
      | MemoizedSelectorFactory<any, any>;
  }
> = {
  [K in keyof T]: SelectorConditional<T[K]>;
};
