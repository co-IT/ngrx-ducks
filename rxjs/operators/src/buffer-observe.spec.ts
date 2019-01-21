import { from, Subject } from 'rxjs';
import { bufferObserve } from './rxjs-operators';

describe('bufferObserve', () => {
  let buffer: number[];
  let sequence: string;
  let bufferOnMatch: (buffer: number[]) => boolean;

  beforeEach(() => {
    buffer = [1, 2, 3];
    sequence = buffer.join('');
    bufferOnMatch = b => b.join('') === sequence;
  });

  describe('When the sequence matches', () => {
    it('should emit the buffer', done => {
      const stream$ = from([1, 2, 3]);

      stream$.pipe(bufferObserve(bufferOnMatch)).subscribe(b => {
        expect(b.join()).toBe(buffer.join());
        done();
      });
    });
  });

  describe('When the sequence does not match', () => {
    it('should not emit', () => {
      const stream$ = from([0, 0, 0]);
      const observer = jest.fn();

      stream$.pipe(bufferObserve(bufferOnMatch)).subscribe(observer);

      expect(observer).not.toBeCalled();
    });
  });

  describe('When the buffer is reset', () => {
    it('should continue matching the following stream values', done => {
      let isFirstCall = true;

      const stream$ = from([0, 1, 2, 3]);
      const resetNotifier$$ = new Subject<void>();

      stream$
        .pipe(
          bufferObserve(b => {
            isFirstCall = resetOnFirstCall(isFirstCall, resetNotifier$$);
            return bufferOnMatch(b);
          }, resetNotifier$$)
        )
        .subscribe(b => {
          expect(b.join()).toBe(buffer.join());
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
