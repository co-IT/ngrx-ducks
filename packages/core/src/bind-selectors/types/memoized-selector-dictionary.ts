import { MemoizedSelector } from '@ngrx/store';
import { MemoizedSelectorFactory } from './memoized-selector-factory';

export type MemoizedSelectorDictionary = {
  [key: string]: MemoizedSelector<any, any> | MemoizedSelectorFactory<any, any>;
};
