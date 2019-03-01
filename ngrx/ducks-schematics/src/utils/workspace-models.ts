/**
 * @see
 * https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/workspace-models.ts
 */

export enum ProjectType {
  Application = 'application',
  Library = 'library'
}

export interface WorkspaceSchema {
  projects: {
    [key: string]: WorkspaceProject;
  };
}

export interface WorkspaceProject {
  projectType: ProjectType;
  sourceRoot: string;
  root: string;
}
