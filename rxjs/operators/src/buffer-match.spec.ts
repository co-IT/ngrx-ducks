import { from } from 'rxjs';
import { bufferMatch } from './buffer-match';

function noop() {
  /* intentionally left blank */
}

describe('bufferMatch', () => {
  describe('When the sequence matches', () => {
    it('should emit the configured callback', done => {
      // console.log(streamValues);

      const stream$ = from([1, 2, 3]);
      const sequence = '123';
      const callback = noop;

      return stream$
        .pipe(bufferMatch(b => (b.join('') === sequence ? callback : null)))
        .subscribe(cb => {
          expect(cb).toBe(callback);
          done();
        });
    });
  });

  describe('When the sequence does not match', () => {
    it('should not emit', () => {
      const stream$ = from([0, 0, 0]);
      const sequence = '123';
      const observer = jest.fn();
      const callback = noop;

      stream$
        .pipe(bufferMatch(b => (b.join('') === sequence ? callback : null)))
        .subscribe(observer);

      expect(observer).not.toBeCalled();
    });
  });
});
