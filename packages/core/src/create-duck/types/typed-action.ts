/**
 * The models below are directly copied from ngrx/platform
 * (see: https://github.com/ngrx/platform/blob/master/modules/store/src/models.ts)
 *
 * TypedAction does not belong to the public API.
 * If TypedAction is imported via deep import, Angular CLI will print a warning
 * about it.
 *
 */
export interface Action {
  type: string;
}

// declare to make it property-renaming safe
export declare interface TypedAction<T extends string> extends Action {
  readonly type: T;
}
