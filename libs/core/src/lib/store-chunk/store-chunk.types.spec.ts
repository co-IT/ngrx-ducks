import { expecter } from 'ts-snippet';
import { compilerOptions } from '../utils';
import { StoreChunk } from './store-chunk';

describe(StoreChunk.name, () => {
  describe('When the decorator is used with generic type parameter specifies the defaults', () => {
    it('passes if the defaults are provided correctly', () => {
      const expectSnippet = expecter(
        code => `
          import { StoreChunk } from '@ngrx-ducks/core';
          ${code}
        `,
        compilerOptions()
      );

      expectSnippet(`
        interface CounterState {
          count: number;
        }

        @StoreChunk<CounterState>({ feature: 'counter', defaults: { count: 0 } })
        class Counter {}
      `).toSucceed();
    });
  });
});
