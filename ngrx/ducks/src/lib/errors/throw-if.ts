export function throwIf(condition: boolean, Error: Error) {
  if (condition) {
    throw Error;
  }
}
