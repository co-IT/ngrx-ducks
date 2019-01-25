import { WithMultipleActionTypes } from '../../../test/mocks';

describe('@Action', () => {
  describe('When multiple types are given', () => {
    let decoratedMember: any;

    beforeEach(() => {
      const instance = new WithMultipleActionTypes();
      decoratedMember = instance.multiple;
    });

    it('should yield meta data for each type', () => {
      expect(decoratedMember.wiredAction.length).toBe(2);
    });

    it.each([[0], [1]])(
      'should yield meta data for action: %s',
      (index: number) => {
        expect(decoratedMember.wiredAction[index]).toEqual({
          type: index.toString(),
          caseReducer: decoratedMember
        });
      }
    );
  });
});
