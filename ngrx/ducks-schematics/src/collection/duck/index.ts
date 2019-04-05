import { strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, filter, mergeWith, move, noop, Rule, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { parseName } from '../../utils/parse-name';
import { buildDefaultPath, getProject } from '../../utils/project';
import { Schema as DuckOptions } from './schema';

export default function(options: DuckOptions): Rule {
  return (host: Tree) => {
    if (!options.project) {
      throw new SchematicsException('Option (project) is required.');
    }
    const project = getProject(host, options.project);

    if (!options.path) {
      options.path = buildDefaultPath(project);
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const templateSource = apply(url('./files'), [
      !options.spec
        ? filter(path => !path.endsWith('.spec.ts.template'))
        : noop(),
      !options.barrel || options.flat
        ? filter(path => !path.endsWith('index.ts.template'))
        : noop(),
      !options.effects
        ? filter(path => !path.endsWith('effects.ts.template'))
        : noop(),
      applyTemplates({
        ...strings,
        'if-flat': (s: string) => (options.flat ? '' : s),
        ...options
      }),
      move(parsedPath.path)
    ]);

    return chain([mergeWith(templateSource)]);
  };
}
