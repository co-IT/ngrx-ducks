import { Path } from '@angular-devkit/core';

export interface Schema {
  name: string;
  path: string;
  project: string;
  barrel: boolean;
  flat: boolean;
  spec: boolean;
  effects: boolean;
  module: Path | undefined;
  skipImport: boolean;
  selectors: boolean;
}
