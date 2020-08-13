import { ActionCreatorCandidates } from './action-creator-candidates';
import { ActionCreatorFilter } from './action-creator-filter';
import { Constructable } from './constructable';

export type ActionCreators<T extends Constructable> = Pick<
  ActionCreatorCandidates<InstanceType<T>>,
  ActionCreatorFilter<InstanceType<T>>
>;
