/**
 * Used for effect-Helper
 * If a generic type is provided a payload needs to be passed to effect
 *
 * @example
 * const loadById = effect<string>('Load')
 * // usage
 * loadById('13-123-123-12312');
 */
export type ActionCreatorForEffect<T> = T extends void
  ? { type: string; action: () => { type: string } }
  : { type: string; action: (payload: T) => { type: string; payload: T } };
