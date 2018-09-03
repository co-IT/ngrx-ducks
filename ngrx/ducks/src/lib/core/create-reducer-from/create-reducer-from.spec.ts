import { wireUpActions } from '../wired-actions/wire-up-actions';
import { createReducerFrom } from './create-reducer-from';

class SpecActions {
  set(_state: string, payload: string): string {
    return payload;
  }
}

describe('CreateReducerFrom', () => {
  describe('When a reducer is created using wired actions', () => {
    it('should produce a reducer function', () => {
      const specActions = wireUpActions<SpecActions>(SpecActions, { set: 'A' });
      const reducer = createReducerFrom(specActions);

      const nextState = reducer('', { type: 'A', payload: 'Hi' });

      expect(nextState).toBe('Hi');
    });
  });
});
