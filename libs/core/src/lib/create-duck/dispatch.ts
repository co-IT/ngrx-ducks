import { DucksIdentifier } from './ducks-identifier';
import { DispatchDefinition } from './types';

export function dispatch<TPayload>(): DispatchDefinition<TPayload> {
  const dispatcherDefinition = (payload: TPayload) => payload;
  dispatcherDefinition.id = DucksIdentifier.DuckDispatcherPlain;

  return dispatcherDefinition as any;
}
