import { methodsFrom } from '../class';
import { WiredActions } from '../__deprecated__/types';
import { extractWiredAction } from './extract-wired-action';

export function createDuck<T extends new () => InstanceType<T>>(
  classToken: T
): WiredActions<InstanceType<T>> {
  const origin = new classToken();
  return methodsFrom(classToken).reduce(
    (target, method) => ({
      ...target,
      [method]: extractWiredAction(origin, method)
    }),
    { ...origin } as any
  );
}
