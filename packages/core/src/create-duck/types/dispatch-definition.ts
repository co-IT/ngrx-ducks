import { DucksIdentifier } from '../ducks-identifier';

export type DispatchDefinition<TPayload> = TPayload extends boolean
  ? (
      payload: boolean
    ) => void & {
      __ngrx_ducks__id: DucksIdentifier.DuckDispatcherPayload;
    }
  : TPayload extends undefined
  ? () => void & {
      __ngrx_ducks__id: DucksIdentifier.DuckDispatcherPlain;
    }
  : (
      payload: TPayload
    ) => void & {
      __ngrx_ducks__id: DucksIdentifier.DuckDispatcherPayload;
    };
