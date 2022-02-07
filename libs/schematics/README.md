## @ngrx-ducks/schematics

You get this package automatically if you install [@ngrx-ducks/core](https://www.npmjs.com/package/@ngrx-ducks/core).

## Commands

| Command                                                     | Description                                  |
| ----------------------------------------------------------- | -------------------------------------------- |
| ng generate @ngrx-ducks/schematics:**facade** <path/facade> | Generates the initial setup for store facade |

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
