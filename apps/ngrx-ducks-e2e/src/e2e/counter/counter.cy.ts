import { Counter } from '../../support';

describe('Counter', () => {
  describe('When the counter starts', () => {
    Counter.before.openCounter();
    Counter.verify.ensureInitializingIndicatorIsHidden();
    Counter.verify.ensureCountEquals(10);

    Counter.action.clickIncrement();
    Counter.verify.ensureCountEquals(11);

    Counter.action.clickDecrement();
    Counter.verify.ensureCountEquals(10);
  });
});
