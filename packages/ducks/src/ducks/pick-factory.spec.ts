import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { pickFactory } from './pick-factory';

// TODO: Smoke test to ensure that typings working
//       Should be rewritten for version 9.
describe('pick-factory', () => {
  describe('When a plain selector is passed', () => {
    it('yields a stream containing the selected data', () => {
      const store: Store<any> = { pipe: () => of(undefined) } as any;
      const picker = pickFactory(store);
      const selectorFeature = createFeatureSelector('some');
      const selectorNumber = createSelector(
        selectorFeature,
        () => 1
      );

      const selected = picker.pick(selectorNumber);
      expect(selected).toBeInstanceOf(Observable);
    });
  });

  describe('When a selector factory is passed', () => {
    it('yields a stream containing the selected data', () => {
      const store: Store<any> = { pipe: () => of(undefined) } as any;
      const picker = pickFactory(store);
      const selectorNumber = () =>
        createSelector(
          (state: any, props: any) => state.counter[props.id],
          (counter: any, props: any) => counter * props.multiply
        );

      const selected = picker.pick(selectorNumber(), {
        id: 'counter2',
        multiply: 2
      });

      expect(selected).toBeInstanceOf(Observable);
    });
  });
});
