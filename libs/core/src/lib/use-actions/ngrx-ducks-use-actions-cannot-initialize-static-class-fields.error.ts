export class NgRxDucksUseActionsCannotInitializeStaticFieldsError extends Error {
  constructor() {
    super(
      `[NgRxDucks] It seems you are using useActions to initialize a static field inside your @StoreChunk annotated class.

      In ES2022 the behaviour how Decorators are transpiled has changed (see: microsoft/TypeScript#51570).
      Currently, it is not clear if this is a Bug or a design decision.

      Please visit https://co-it.gitbook.io/ngrx-ducks/migrations/v15 to see how to resolve this issue, quickly.
    `
    );
  }
}
