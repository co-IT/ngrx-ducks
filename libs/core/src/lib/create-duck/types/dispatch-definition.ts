import { duckIdentifierPropertyKey } from '../duck-identifier-property-key';
import { DucksIdentifier } from '../ducks-identifier';

export type DispatchDefinition<TPayload> = TPayload extends boolean
  ? (payload: boolean) => void & {
      [duckIdentifierPropertyKey]: DucksIdentifier.DuckDispatcherPayload;
    }
  : TPayload extends undefined
  ? () => void & {
      [duckIdentifierPropertyKey]: DucksIdentifier.DuckDispatcherPlain;
    }
  : (payload: TPayload) => void & {
      [duckIdentifierPropertyKey]: DucksIdentifier.DuckDispatcherPayload;
    };
