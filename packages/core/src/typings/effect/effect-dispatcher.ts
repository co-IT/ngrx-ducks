export type EffectDispatcher<T> = T extends {
  type: string;
  dispatch: () => void;
}
  ? {
      type: string;
      dispatch: () => void;
    }
  : T extends {
      type: string;
      dispatch: (payload: infer TPayload) => void;
    }
  ? {
      type: string;
      dispatch: (payload: TPayload) => void;
    }
  : never;
