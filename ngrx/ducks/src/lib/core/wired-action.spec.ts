import { WiredAction, CaseReducer } from './types';
import { createWiredAction } from './create-wired-action';

describe('WiredAction', () => {
  describe('When no action type is provided', () => {
    it('should raise an error', () => {
      // expect(() => createWiredAction(undefined, undefined)).toThrow(
      //   'ngrx-ducks: "undefined" is no valid action type.'
      // );
    });
  });

  describe('When no case reducer is defined', () => {
    it('should raise an error', () => {
      // const type = '[Login] User entered login data';
      // expect(() => createWiredAction(type, undefined)).toThrow(
      //   `ngrx-ducks: Please provide a case reducer for action "${type}". ` +
      //     'Expected a function but found "undefined".'
      // );
    });
  });

  describe('When a wired action is created', () => {
    type SpecCaseReducer = (state: string, payload: string) => string;

    let type: string;
    let caseReducer: SpecCaseReducer;
    let wiredAction: WiredAction<SpecCaseReducer>;

    beforeEach(() => {
      type = '[Login] User entered login data';
      caseReducer = (_state: string, _payload: string) => 'new state';

      wiredAction = createWiredAction(type, caseReducer);
    });

    it('should be a function taking the payload parameter of the case reducer', () => {
      const expected = { type, payload: 'Hey' };
      const action = wiredAction('Hey');

      expect(action).toEqual(expected);
    });

    it('should provide the case reducer', () => {
      const state = wiredAction.caseReducer('', '');
      expect(state).toBe('new state');
    });

    it('should provide the action type', () => {
      expect(wiredAction.type).toBe(type);
    });
  });
});
