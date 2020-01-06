import { MissingActionTypeError } from '../errors';
import { Action } from './action.decorator';

describe('@Action', () => {
  describe('When no action type is given', () => {
    it.each([[null], [undefined], [''], [[]]] as any)(
      'should raise an error',
      invalidType => {
        class Plain {}
        const error = new MissingActionTypeError(Plain.name);

        expect(() =>
          Action(invalidType as any)(Plain, '', null as any)
        ).toThrowError(error);
      }
    );
  });
});
