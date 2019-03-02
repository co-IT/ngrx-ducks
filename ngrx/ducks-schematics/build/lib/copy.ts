import { copy as cp } from 'fs-extra';
import { join, resolve } from 'path';

const globby = require('globby');

export function copy(tasks: [string, string][]) {
  return Promise.all(tasks.map(task => copySingle(task[0], task[1])));
}

export function copySingle(from: string, dest: string) {
  return globby(from).then((sources: string[]) =>
    Promise.all(sources.map(source => cp(source, resolve(dest, source))))
  );
}
