/**
 * @see
 * https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/project.ts
 */
import { Tree } from '@angular-devkit/schematics';
import { getWorkspace } from './config';
import {
  ProjectType,
  WorkspaceProject,
  WorkspaceSchema
} from './workspace-models';

/**
 * Build a default project path for generating.
 * @param project The project to build the path for.
 */
export function buildDefaultPath(project: WorkspaceProject): string {
  const root = project.sourceRoot
    ? `/${project.sourceRoot}/`
    : `/${project.root}/src/`;

  const projectDirName =
    project.projectType === ProjectType.Application ? 'app' : 'lib';

  return `${root}${projectDirName}`;
}

export function getProject(
  workspaceOrHost: WorkspaceSchema | Tree,
  projectName: string
): WorkspaceProject {
  const workspace = isWorkspaceSchema(workspaceOrHost)
    ? workspaceOrHost
    : getWorkspace(workspaceOrHost);

  return workspace.projects[projectName];
}

export function isWorkspaceSchema(
  workspace: any
): workspace is WorkspaceSchema {
  return !!(workspace && (workspace as WorkspaceSchema).projects);
}
