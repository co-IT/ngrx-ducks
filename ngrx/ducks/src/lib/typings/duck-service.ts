import { DuckActionDispatcher } from './DuckActionDispatcher';
export type DuckService<T> = { [K in keyof T]: DuckActionDispatcher<T[K]> };
