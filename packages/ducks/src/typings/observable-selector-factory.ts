import { Store } from '@ngrx/store';
import { ObservableSelectors, SelectorGroupIdentifier } from '.';
export type ObservableSelectorFactory<T> = ((
  store: Store<unknown>
) => ObservableSelectors<T>) &
  SelectorGroupIdentifier;
