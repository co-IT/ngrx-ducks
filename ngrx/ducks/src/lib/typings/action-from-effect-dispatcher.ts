export type ActionFromEffectDispatcher<T> = T extends {
  dispatch: () => void;
}
  ? {
      type: string;
    }
  : T extends {
      dispatch: (payload: infer TPayload) => void;
    }
  ? {
      type: string;
      payload: TPayload;
    }
  : T extends { action: () => void }
  ? {
      type: string;
    }
  : T extends { action: (payload: infer TPayload) => void }
  ? {
      type: string;
      payload: TPayload;
    }
  : never;
