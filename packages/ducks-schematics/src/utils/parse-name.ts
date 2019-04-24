/**
 * @see
 * https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/parse-name.ts
 */
import { basename, dirname, join, normalize, Path } from '@angular-devkit/core';

export interface Location {
  name: string;
  path: Path;
}

export function parseName(path: string, name: string): Location {
  const nameWithoutPath = basename(normalize(name));
  const namePath = dirname(join(normalize(path), name) as Path);

  return {
    name: nameWithoutPath,
    path: normalize('/' + namePath)
  };
}
