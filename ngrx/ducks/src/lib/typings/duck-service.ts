import { DuckActionDispatcher } from './duck-action-dispatcher';
export type DuckService<T> = { [K in keyof T]: DuckActionDispatcher<T[K]> };
