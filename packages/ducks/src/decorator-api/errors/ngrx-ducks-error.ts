export class NgrxDucksError extends Error {
  constructor(message: string) {
    super(`ngrx-ducks > ${message}`);
  }
}
