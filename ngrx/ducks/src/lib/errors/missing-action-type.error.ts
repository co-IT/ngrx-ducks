export function missingActionTypeError(className: string) {
  return `${className}: Passing null, undefined, '' or [] to @Action is not allowed.`;
}
