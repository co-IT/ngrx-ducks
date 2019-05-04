import { emptyAction } from './empty-action';
import { loadedAction } from './loaded-action';
export function actionCreatorFor(type: string) {
  return (payload: unknown | undefined) =>
    payload ? loadedAction(type, payload) : emptyAction(type);
}
