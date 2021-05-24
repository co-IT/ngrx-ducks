import { MemoizedSelector } from '@ngrx/store';
import { SelectorConditional } from './selector-conditional';

export type Selectors<
  T extends { [key: string]: MemoizedSelector<any, any> }
> = {
  [K in keyof T]: SelectorConditional<T[K]>;
};
