export function isSelectorGroup(instance: any, member: string): boolean {
  return (
    !!instance[member].__ngrxDucks__isSelectorGroup &&
    instance[member].__ngrxDucks__isSelectorGroup === true
  );
}
