import { createDuck, dispatch } from '../create-duck';
import { NgRxDucksUseActionsCannotInitializeStaticFieldsError } from './ngrx-ducks-use-actions-cannot-initialize-static-class-fields.error';
import { useActions } from './use-actions';

describe(useActions.name, () => {
  describe('When a class contains a duck', () => {
    const typeHello = 'Hello';
    const typeBye = 'Bye';
    const typeSurprise = 'Surprise';

    class Chunk {
      otherProperty = true;

      hello = createDuck(typeHello);
      bye = createDuck(typeBye, dispatch<boolean>());

      lookInside = {
        surprise: createDuck(typeSurprise)
      };
    }

    it('extracts the action creator', () => {
      const actions = useActions(Chunk);
      expect(actions.hello.type).toBe(typeHello);
    });

    it('provides a working action creator without payload', () => {
      const actions = useActions(Chunk);
      const hello = actions.hello();
      expect(hello.type).toBe(typeHello);
    });

    it('provides a working action creator supporting payloads', () => {
      const actions = useActions(Chunk);
      const bye = actions.bye(true);
      expect(bye.type).toBe(typeBye);
    });

    it('provides a working action creator a nested duck', () => {
      const actions = useActions(Chunk);
      const surprise = actions.lookInside.surprise();
      expect(surprise.type).toBe(typeSurprise);
    });

    it('ignores each property not being duck', () => {
      const actions = useActions(Chunk);
      expect((actions as any).otherProperty).toBeUndefined();
    });
  });

  describe('When useActions initializes a static field inside a class annotated with @StoreChunk', () => {
    it('throws an error, clarifying that there are issues in ES2022', () => {
      expect(() => useActions(null as any)).toThrowError(
        NgRxDucksUseActionsCannotInitializeStaticFieldsError
      );
    });
  });
});
