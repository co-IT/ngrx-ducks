import { NgrxDucksError } from './ngrx-ducks-error';

/**
 * This error is used to claim that no reducer function
 * of a class can be created because it does not provide
 * initial values.
 */
export class NoInitialValueError<
  T extends new () => InstanceType<T>
> extends NgrxDucksError {
  constructor(callerName: string, className: string) {
    super(
      `${callerName}: ${className} does not define initialValue. ` +
        `Make sure to annotate ${className} with @InitialState.`
    );
  }
}
