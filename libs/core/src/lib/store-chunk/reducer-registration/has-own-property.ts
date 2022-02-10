export function hasOwnProperty<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  X extends Record<string, any>,
  Y extends PropertyKey
>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return Object.hasOwnProperty.call(obj, prop);
}
