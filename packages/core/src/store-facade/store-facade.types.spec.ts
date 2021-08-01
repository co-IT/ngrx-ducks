import { Compiler, expecter } from 'ts-snippet';
import { StoreFacade } from './store-facade';

describe(StoreFacade.name, () => {
  describe('When the decorator is used with generic type parameter specifies the defaults', () => {
    it('passes if the defaults are provided correctly', () => {
      const expectSnippet = expecter(
        code => `
          import { StoreFacade } from './src/store-facade';
          ${code}
        `,
        new Compiler({ experimentalDecorators: true })
      );

      expectSnippet(`
        interface CounterState {
          count: number;
        }

        @StoreFacade<CounterState>({ feature: 'counter', defaults: { count: 0 } })
        class Counter {}
      `).toSucceed();
    });
  });
});
