import { ReplaySubject } from 'rxjs';

export class StoreMock<T> extends ReplaySubject<T> {
  constructor(initialState: T) {
    super();
    this.next(initialState);
  }

  dispatch() {
    /** Intentionally left blank */
  }
}
