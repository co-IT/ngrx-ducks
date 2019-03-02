import { remove } from 'fs-extra';

export function clean(path: string) {
  return remove(path);
}
