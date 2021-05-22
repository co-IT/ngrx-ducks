export type EffectActionCreator<T> = T extends {
  type: string;
  action: () => void;
}
  ? {
      type: string;
      dispatch: () => void;
      action: () => { type: string };
    }
  : T extends {
      type: string;
      action: (payload: infer TPayload) => void;
    }
  ? {
      type: string;
      dispatch: (payload: TPayload) => void;
      action: (payload: TPayload) => { type: string; payload: TPayload };
    }
  : never;
