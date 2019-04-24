import { ActionCreator } from '..';

// Case reducer Term see https://redux.js.org/recipes/structuringreducers/refactoringreducersexample#extracting-case-reducers
export type WiredAction<TCaseReducer> = ActionCreator<TCaseReducer> & {
  type: string;
  caseReducer: TCaseReducer;
};
