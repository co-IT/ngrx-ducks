import { createDuck } from '../create-duck/create-duck';
import { dispatch } from '../create-duck/dispatch';
import { getActions } from './get-actions';

describe('get-actions', () => {
  describe('When a class contains a duck', () => {
    const typeHello = 'Hello';
    const typeBye = 'Bye';
    const typeSurprise = 'Surprise';

    class Facade {
      otherProperty = true;

      hello = createDuck(typeHello);
      bye = createDuck(typeBye, dispatch<boolean>());

      lookInside = {
        surprise: createDuck(typeSurprise)
      };
    }

    it('extracts the action creator', () => {
      const actions = getActions(Facade);
      expect(actions.hello.type).toBe(typeHello);
    });

    it('provides a working action creator without payload', () => {
      const actions = getActions(Facade);
      const hello = actions.hello();
      expect(hello.type).toBe(typeHello);
    });

    it('provides a working action creator supporting payloads', () => {
      const actions = getActions(Facade);
      const bye = actions.bye(true);
      expect(bye.type).toBe(typeBye);
    });

    it('provides a working action creator a nested duck', () => {
      const actions = getActions(Facade);
      const surprise = actions.lookInside.surprise();
      expect(surprise.type).toBe(typeSurprise);
    });

    it('ignores each property not being duck', () => {
      const actions = getActions(Facade);
      expect((actions as any).otherProperty).toBeUndefined();
    });
  });
});