export type EffectDispatcher<T> = T extends {
  type: string;
  action: () => void;
}
  ? {
      type: string;
      dispatch: () => void;
    }
  : T extends {
      type: string;
      action: (payload: infer TPayload) => void;
    }
  ? {
      type: string;
      dispatch: (payload: TPayload) => void;
    }
  : never;
