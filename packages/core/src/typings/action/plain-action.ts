export interface PlainAction {
  action(): {
    type: string;
  };

  /**
   * @deprecated Use action instead
   * This function will be removed in the next major release
   */
  plain(): {
    type: string;
  };
}
