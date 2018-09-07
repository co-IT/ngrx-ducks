import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { Ducks, WiredActions } from './core/types';
import { wireUpActions } from './core/wired-actions/wire-up-actions';
import { DucksModule } from './ducks.module';
import { initTestEnvironment } from './test';

export class Counter {
  triggerEffect = 'Async Action';

  set(_state: string, payload: string): string {
    return payload;
  }
}

describe('NgrxDucksModule', () => {
  let wiredActions: () => WiredActions<Counter>;

  beforeAll(() => initTestEnvironment());

  beforeEach(() => {
    wiredActions = () => wireUpActions(Counter, {
      set: 'Sync Action'
    });

    TestBed.configureTestingModule({
      imports: [DucksModule.register([{ duck: Counter, use: wiredActions }])],
      providers: [
        {
          provide: Store,
          useFactory() {
            return {
              dispatch: (payload: any) => console.log('Raised Action', payload)
            };
          }
        }
      ]
    });
  });

  describe('When a set of DuckActions is registered', () => {
    it('should provide a set of Ducks', () => {
      const ducks: Ducks<Counter> = TestBed.get(Counter);
      // console.log(ducks.triggerEffect);
      // console.log(ducks.set('asdasd'));
      // console.log(ducks.set.plain('03784923749'));
    });
  });

  describe('When two sets of DuckActions are registered', () => {
    it('should provide these two sets', () => {});
  });

  describe('When the registrations is used without providing DuckActions', () => {
    it('should raise an error', () => {});
  });
});
