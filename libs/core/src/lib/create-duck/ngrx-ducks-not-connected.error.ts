export class NgRxDucksNotConnectedError extends Error {
  constructor(type?: string) {
    super(
      '[NgRxDucks] Please make sure using createDuck & useSelectors inside a class' +
        `that is decorated with @StoreChunk().` +
        !type
        ? ''
        : `(affected action: "${type}")`
    );

    Object.setPrototypeOf(this, NgRxDucksNotConnectedError.prototype);
  }
}
