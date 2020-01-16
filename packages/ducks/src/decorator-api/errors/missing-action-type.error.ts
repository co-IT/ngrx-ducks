import { NgrxDucksError } from './ngrx-ducks-error';

export class MissingActionTypeError extends NgrxDucksError {
  constructor(className: string) {
    super(
      `${className}: Passing null, undefined, '' or [] to @Action is not allowed.`
    );
  }
}
