import { expecter } from 'ts-snippet';
import { compilerOptions } from '../utils';
import { StoreChunk } from './store-chunk';

describe(StoreChunk.name, () => {
  const expectSnippet = expecter(
    code => `
      import { StoreChunk } from '@ngrx-ducks/core';
      ${code}
    `,
    compilerOptions()
  );

  describe('When the decorator is used with generic type parameter specifies the defaults', () => {
    it('passes if the defaults are provided correctly', () => {
      expectSnippet(`
        interface CounterState {
          count: number;
        }

        @StoreChunk<CounterState>({ feature: 'counter', defaults: { count: 0 } })
        class Counter {}
      `).toSucceed();
    });
  });

  describe('When the decorator is used on a class with constructor arguments', () => {
    it('passes', () => {
      expectSnippet(`
        @StoreChunk()
        class Counter {
          constructor(dep: any){}
        }
      `).toSucceed();
    });
  });
});
