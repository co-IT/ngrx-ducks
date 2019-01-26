import { NgrxDucksError } from './ngrx-ducks-error';

export class MissingActionDecoratorError extends NgrxDucksError {
  constructor(className: string, methodName: string) {
    super(`${className} > ${methodName} needs to be decorated with @Action.`);
  }
}
