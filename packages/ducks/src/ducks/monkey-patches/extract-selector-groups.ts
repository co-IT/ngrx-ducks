import { Store, MemoizedSelector, select } from '@ngrx/store';

export function extractSelectorGroups(instance: any, store: Store<unknown>) {
  return Object.getOwnPropertyNames(instance)
    .filter(member => isSelectorGroup(instance, member))
    .reduce(
      (selectorGroups, member) => ({
        ...selectorGroups,
        [member]: createSelectorGroup(instance[member], store)
      }),
      {}
    );
}

function createSelectorGroup(
  selectors: {
    [key: string]: MemoizedSelector<any, any>;
  },
  store: Store<unknown>
) {
  return Object.keys(selectors).reduce(
    (group, selectorKey) => ({
      ...group,
      [selectorKey]: store.pipe(select(selectors[selectorKey]))
    }),
    {}
  );
}

export function isSelectorGroup(instance: any, member: string): any {
  return (
    typeof instance[member] === 'object' &&
    Object.values(instance[member]).every(
      (candidate: any) => candidate.release && candidate.projector
    )
  );
}
