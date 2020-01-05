export class CreateDuckNotConnectedError extends Error {
  constructor(type: string) {
    super(
      '[create-duck] Please make sure using createDuck inside a class' +
        `using the decorator @StoreFacade (affected action: "${type}").`
    );
  }
}
