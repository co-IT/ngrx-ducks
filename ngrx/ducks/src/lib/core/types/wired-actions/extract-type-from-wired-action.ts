import { WiredAction } from './wired-action';

export type ExtractTypeFromWiredAction<T> = T extends WiredAction<infer U>
  ? U
  : never;
