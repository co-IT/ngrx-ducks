describe('WiredAction', () => {
  describe('When no action name is provided', () => {
    it('should raise an error', () => {
      expect(() => createWiredAction(undefined, undefined)).toThrow(
        'ngrx-ducks: "undefined" is no valid action name.'
      );
    });
  });

  describe('When no case reducer is defined', () => {
    it('should raise an error', () => {
      const action = '[Login] User entered login data';
      expect(() => createWiredAction(action, undefined)).toThrow(
        `ngrx-ducks: Please provide a case reducer for action "${action}". Expected a function but found "undefined".`
      );
    });
  });
});

function createWiredAction(actionName: string, caseReducer: any) {
  throwIf(!actionName, `"${actionName}" is no valid action name.`);
  throwIf(
    !caseReducer,
    `Please provide a case reducer for action "${actionName}". Expected a function but found "${caseReducer}".`
  );
}

function throwIf(condition: boolean, message: string) {
  if (condition) {
    throw new NgrxDucksError(message);
  }
}

export class NgrxDucksError extends Error {
  constructor(message: string) {
    super(`ngrx-ducks: ${message}`);
  }
}
