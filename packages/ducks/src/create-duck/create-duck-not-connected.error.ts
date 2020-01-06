export class NgRxDucksNotConnectedError extends Error {
  constructor(type?: string) {
    super(
      '[create-duck] Please make sure using createDuck & bindSelectors inside a class' +
        `that is decorated with @StoreFacade.` +
        !type
        ? ''
        : `(affected action: "${type}")`
    );

    Object.setPrototypeOf(this, NgRxDucksNotConnectedError.prototype);
  }
}
