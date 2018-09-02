import { NgrxDucksError } from '../errors';

export function throwIf(condition: boolean, message: string) {
  if (condition) {
    throw new NgrxDucksError(message);
  }
}
