export function hasOwnProperty<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  X,
  Y extends PropertyKey
>(obj?: X, property?: Y): obj is X & Record<Y, unknown> {
  if (!obj || !property) return false;

  return Object.hasOwnProperty.call(obj, property);
}
