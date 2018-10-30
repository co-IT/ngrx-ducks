import {
  createDucks,
  Ducks,
  effect,
  wireUpActions
} from '../../../src/public_api';

class Some {
  readonly loadAll = effect('Some All');
  readonly loadSpecific = effect<string>('Some Specific');
}

describe('Create action dispatcher for @Effects', () => {
  it('should dispatch without payload is declared', () => {
    const dispatchMock = jest.fn();
    const store = { dispatch: dispatchMock };
    const wiredActions = wireUpActions(Some, {});
    const ducks: Ducks<Some> = createDucks(wiredActions, store as any);

    ducks.loadAll.dispatch();

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'Some All'
    });
  });

  it('should dispatch if a payload is declared', () => {
    const dispatchMock = jest.fn();
    const store = { dispatch: dispatchMock };
    const wiredActions = wireUpActions(Some, {});
    const ducks: Ducks<Some> = createDucks(wiredActions, store as any);

    ducks.loadSpecific.dispatch('Some Payload');

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'Some Specific',
      payload: 'Some Payload'
    });
  });
});
