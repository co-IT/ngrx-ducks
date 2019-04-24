# NgRx Ducks Schematics

You get this package automatically if you install [@co-it/ngrx-ducks](https://www.npmjs.com/package/@co-it/ngrx-ducks).

## Commands

| Command                                            | Description                            |
| -------------------------------------------------- | -------------------------------------- |
| ng generate @co-it/ngrx-ducks:**duck** <path/duck> | Create a duck in the desired directory |

## Parameter

| Parameter  | Description                                                                  |
| ---------- | ---------------------------------------------------------------------------- |
| project    | The name of the project.                                                     |
| barrel     | When true (the default) and not flat, creates a index.ts barrel file.        |
| flat       | When true, creates files at the top level of the project.                    |
| spec       | When true (the default), generates a \"spec.ts\" test file for the new Duck. |
| effects    | When true (the default), generates an \"effects.ts\" file for the new Duck.  |
| module     | The declaring NgModule for the effect (or nearest NgModule if omitted).      |
| skipImport | When true, does not import the effect into the owning NgModule.              |
| selectors  | When true (the default), generates a \"selectors.ts\" file for the new Duck. |
