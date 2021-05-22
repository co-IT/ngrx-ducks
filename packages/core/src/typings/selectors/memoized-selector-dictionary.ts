import { MemoizedSelector } from '@ngrx/store';
export type MemoizedSelectorDictionary = {
  [key: string]: MemoizedSelector<any, any>;
};
