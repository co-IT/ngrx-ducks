export function emptyAction<T extends new () => InstanceType<T>>(type: string) {
  return {
    type
  };
}
