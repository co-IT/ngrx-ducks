import { normalize, strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicsException,
  Tree,
  url
} from '@angular-devkit/schematics';
import * as ts from 'typescript';
import {
  addSymbolToNgModuleMetadata,
  insertImport
} from '../../utils/ast-utils';
import { InsertChange } from '../../utils/change';
import {
  buildRelativePath,
  findModuleFromOptions
} from '../../utils/find-modules';
import { parseName } from '../../utils/parse-name';
import { buildDefaultPath, getProject } from '../../utils/project';
import { Schema as DuckOptions } from './schema';

function addDeclarationToNgModule(options: DuckOptions): Rule {
  return (host: Tree) => {
    if (options.skipImport || !options.module || !options.effects) {
      return host;
    }

    const modulePath = options.module;

    const text = host.read(modulePath);
    if (text === null) {
      throw new SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const source = ts.createSourceFile(
      modulePath,
      sourceText,
      ts.ScriptTarget.Latest,
      true
    );

    const importEffectPath = normalize(
      `/${options.path}/` +
        (options.flat ? '' : strings.dasherize(options.name) + '/') +
        strings.dasherize(options.name) +
        '.effects'
    );
    const relativeEffectImportPath = buildRelativePath(
      modulePath,
      importEffectPath
    );
    /**
     * add import for the duck Effects class
     * + add EffectsModule.forFeature() to NgModule imports
     */
    const changes = addSymbolToNgModuleMetadata(
      source,
      modulePath,
      'imports',
      strings.classify(`${options.name}Effects`),
      relativeEffectImportPath,
      `EffectsModule.forFeature([${strings.classify(
        options.name + 'Effects'
      )}])`,
      'EffectsModule'
    );
    /**
     * add import for the EffectsModule
     */
    changes.push(
      insertImport(source, modulePath, 'EffectsModule', '@ngrx/effects')
    );

    const recorder = host.beginUpdate(modulePath);
    for (const change of changes) {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(recorder);

    return host;
  };
}

export default function(options: DuckOptions): Rule {
  return (host: Tree) => {
    if (!options.project) {
      throw new SchematicsException('Option (project) is required.');
    }
    const project = getProject(host, options.project);

    if (!options.path) {
      options.path = buildDefaultPath(project);
    }

    if (options.effects && !options.skipImport) {
      options.module = findModuleFromOptions(host, options);
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
      !options.selectors
        ? filter(path => !path.endsWith('selectors.ts.template'))
        : noop(),
      applyTemplates({
        ...strings,
        'if-flat': (s: string) => (options.flat ? '' : s),
        ...options
      }),
      move(parsedPath.path)
    ]);

    return chain([
      addDeclarationToNgModule(options),
      mergeWith(templateSource)
    ]);
  };
}
