export interface PlainAction {
  action(): {
    type: string;
  };
}
