import { Duck } from './self-dispatching-action';

export type Ducks<TDucks> = {
  [TDuck in keyof TDucks]: Duck<TDucks[TDuck]>
};
