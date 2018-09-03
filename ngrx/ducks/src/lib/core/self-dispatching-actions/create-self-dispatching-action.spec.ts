import { createWiredAction } from '../wired-actions/create-wired-action';
import { createSelfDispatchingAction } from './create-self-dispatching-action';

describe('SelfDispatchingAction', () => {
  describe('When a self dispatching action is created', () => {
    it('should dispatch the action with the given payload', () => {
      const type = '[Login] User entered login data';
      const caseReducer = (_state: string, _payload: string) => 'new state';
      const dispatchMock = jest.fn(payload => {});
      const store = { dispatch: dispatchMock};

      const wa = createWiredAction(type, caseReducer);
      const sda = createSelfDispatchingAction(wa, store);

      sda('Hi');

      expect(dispatchMock).toHaveBeenCalledWith({
        type,
        payload: 'Hi'
      })
    });
  });
});
