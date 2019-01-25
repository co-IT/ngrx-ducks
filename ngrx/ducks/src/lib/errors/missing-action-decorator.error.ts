export function missingActionDecoratorError(
  className: string,
  methodName: string
) {
  return `${className} > ${methodName} needs to be decorated with @Action.`;
}
