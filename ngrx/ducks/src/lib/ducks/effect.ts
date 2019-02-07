import { ActionCreatorForEffect } from '../typings';

export function effect<T = void>(type: string): ActionCreatorForEffect<T> {
  const action = (payload: T) => ({
    type,
    payload
  });

  return {
    type,
    action
  } as any;
}
