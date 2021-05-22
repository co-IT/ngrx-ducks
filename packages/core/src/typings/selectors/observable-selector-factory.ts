import { Store } from '@ngrx/store';
import { ObservableSelectors } from './observable-selectors';
import { SelectorGroupIdentifier } from './selector-group-identifier';

export type ObservableSelectorFactory<T> = ((
  store: Store<unknown>
) => ObservableSelectors<T>) &
  SelectorGroupIdentifier;
