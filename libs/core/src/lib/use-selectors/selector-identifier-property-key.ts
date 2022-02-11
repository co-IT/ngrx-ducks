/**
 * Bound selectors are stored in a separate internal property to backup the
 * original projection functions, because during Angular compilation we noticed overrides
 * and optimizations that broke the selector feature.
 *
 * Maybe we should check if this is still the case.
 */
export const selectorIdentifierPropertyKey = '__ngrx_ducks__selectors_original';
