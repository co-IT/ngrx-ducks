/**
 * This error is used to claim that no reducer function
 * of a class can be created because it does not provide
 * initial values.
 */
export class NoInitialValueError<
  T extends new () => InstanceType<T>
> extends Error {
  constructor(caller: Function, token: T) {
    super(
      `${caller.name}: ${
        token.name
      } does not define initialValue. Make sure to annotate ${
        token.name
      } with @InitialState.`
    );
  }
}
