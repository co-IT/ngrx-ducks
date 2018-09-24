import { createDucks } from '../../core/ducks/create-ducks';
import { ActionCreatorForEffect, Ducks } from '../../core/types';
import { wireUpActions } from '../../core/wired-actions/wire-up-actions';

export function effect<T = void>(type: string): ActionCreatorForEffect<T> {
  const action = (payload: T) => ({
    type,
    payload
  });

  return {
    type,
    action
  } as any;
}

class Some {
  readonly loadAll = effect('Some All');
  readonly loadSpecific = effect<string>('Some Specific');
}

describe('Create action dispatcher for @Effects', () => {
  it('should dispatch without payload is declared', () => {
    const dispatchMock = jest.fn();
    const store = { dispatch: dispatchMock };
    const wiredActions = wireUpActions(Some, {});
    const ducks: Ducks<Some> = createDucks(wiredActions, store);

    ducks.loadAll.dispatch();

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'Some All'
    });
  });

  it('should dispatch if a payload is declared', () => {
    const dispatchMock = jest.fn();
    const store = { dispatch: dispatchMock };
    const wiredActions = wireUpActions(Some, {});
    const ducks: Ducks<Some> = createDucks(wiredActions, store);

    ducks.loadSpecific.dispatch('Some Payload');

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'Some Specific',
      payload: 'Some Payload'
    });
  });
});
