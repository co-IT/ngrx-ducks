import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Duck, InitialStateAnnotated } from '../typings';
import { Action } from './action.decorator';
import { Ducksify } from './ducksify.decorator';

describe('@Ducksify', () => {
  @Ducksify<number>({
    initialState: 0
  })
  class Counter {
    @Action('[Counter] set')
    set(state: number, payload: number): number {
      return payload;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Store, useVale: {} }]
    });
  });

  describe('When a class is annotated', () => {
    it('should become a service', () => {
      const counter: Duck<Counter> = TestBed.get(Counter);
      expect(counter.set.type).toBe('[Counter] set');
    });

    it('should add the initial state to the prototype', () => {
      const counter = new Counter() as InitialStateAnnotated<number>;
      expect(counter.__initialState__).toBe(0);
    });
  });
});
