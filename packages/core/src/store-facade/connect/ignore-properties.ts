export function ignoreProperties(
  object: any,
  propertiesToIgnore: string[]
): string[] {
  if (!object || !propertiesToIgnore) {
    return [];
  }
  return Object.keys(object).filter(property =>
    propertiesToIgnore.every(propertyToIgnore => propertyToIgnore !== property)
  );
}
