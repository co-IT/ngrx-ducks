import {
  validActionType,
  WithoutActionDecorator,
  WithProperty,
  WithValidActionType
} from '../../../test/mocks';
import { MissingActionDecoratorError } from '../errors';
import { createDuck } from './create-duck';

describe('createDucks', () => {
  describe('When a single action type is provided', () => {
    it('should create a single wired action', () => {
      const duck = createDuck(WithValidActionType);
      expect(duck.increase(1)).toEqual({
        type: validActionType,
        payload: 1
      });
    });
  });

  describe('When no action type is given', () => {
    describe('When one method is not decorated with @Action', () => {
      it('should raise an error', () => {
        const error = new MissingActionDecoratorError(
          WithoutActionDecorator.name,
          'increase'
        );

        expect(() => createDuck(WithoutActionDecorator)).toThrowError(error);
      });
    });

    describe('When the class contains properties', () => {
      it('should preserve them', () => {
        const withProperty = new WithProperty();
        const duck = createDuck(WithProperty);

        expect(duck.name).toBe(withProperty.name);
      });
    });
  });
});
