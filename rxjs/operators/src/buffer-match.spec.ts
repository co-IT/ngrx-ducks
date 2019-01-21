import { from, Subject } from 'rxjs';
import { bufferMatch } from './rxjs-operators';
import { MatchFn } from './types';

function noop() {
  /* intentionally left blank */
}

describe('bufferMatch', () => {
  let sequence: string;
  let callback: Function;
  let callBackOnMatch: MatchFn<number>;

  beforeEach(() => {
    sequence = '123';
    callback = noop;
    callBackOnMatch = b => (b.join('') === sequence ? callback : null);
  });

  describe('When the sequence matches', () => {
    it('should emit the configured callback', done => {
      const stream$ = from([1, 2, 3]);

      stream$.pipe(bufferMatch(callBackOnMatch)).subscribe(cb => {
        expect(cb).toBe(callback);
        done();
      });
    });
  });

  describe('When the sequence does not match', () => {
    it('should not emit', () => {
      const stream$ = from([0, 0, 0]);
      const observer = jest.fn();

      stream$.pipe(bufferMatch(callBackOnMatch)).subscribe(observer);

      expect(observer).not.toBeCalled();
    });
  });

  describe('When the buffer is reset', () => {
    it('should continue matching the following stream values', done => {
      let isFirstCall = true;

      const stream$ = from([0, 1, 2, 3]);
      const resetNotifier$$ = new Subject<void>();
      const callback = noop;

      stream$
        .pipe(
          bufferMatch(b => {
            isFirstCall = resetOnFirstCall(isFirstCall, resetNotifier$$);
            return callBackOnMatch(b);
          }, resetNotifier$$)
        )
        .subscribe(cb => {
          expect(cb).toBe(callback);
          done();
        });
    });
  });
});

/**
 *
 * @param isFirstCall indicates if operator is executed the very first time
 * @param resetNotifier$$ emits an event on the stream to reset the buffer inside buferMatch
 */
function resetOnFirstCall(
  isFirstCall: boolean,
  resetNotifier$$: Subject<void>
) {
  if (isFirstCall) {
    resetNotifier$$.next();
    isFirstCall = false;
  }
  return isFirstCall;
}
