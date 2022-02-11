export class CounterBefore {
  openCounter() {
    before(() => cy.visit('/'));
  }
}

export class CounterAction {
  clickIncrement() {
    it('Click increment button!', () => {
      cy.get('[data-test=counter-increment-button]').click();
    });
  }

  clickDecrement() {
    it('Click decrement button!', () => {
      cy.get('[data-test=counter-decrement-button]').click();
    });
  }
}

export class CounterVerifier {
  ensureCountEquals(count: number) {
    it(`Count is equal to "${count}."`, () => {
      cy.get('[data-test=counter-count]').contains(count);
    });
  }

  ensureInitializingIndicatorIsHidden() {
    it('Initializing Indicator is hidden.', () => {
      cy.get('[data-test=counter-initializing-indicator]').should('be.hidden');
    });
  }
}

export class Counter {
  static before = new CounterBefore();
  static action = new CounterAction();
  static verify = new CounterVerifier();
}
