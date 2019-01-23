export function insufficientList(list: unknown[]) {
  return Array.isArray(list) && list.filter(item => !!item).length === 0;
}
