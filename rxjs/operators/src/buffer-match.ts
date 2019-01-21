import { empty, Observable, OperatorFunction } from 'rxjs';
import { Buffer } from './buffer';
import { MatchFn } from './types';

export function bufferMatch<T>(
  match: MatchFn<T>,
  resetNotifier: Observable<any> = empty()
): OperatorFunction<T, Function> {
  return function(source$: Observable<T>): Observable<Function> {
    return bufferMatchObservable(match, resetNotifier, source$);
  };
}

function bufferMatchObservable<T>(
  match: MatchFn<T>,
  resetNotifier: Observable<any>,
  source$: Observable<T>
): Observable<Function> {
  const buffer = new Buffer<T>();
  const subscription = resetNotifier.subscribe(() => buffer.reset());

  return new Observable(observer => {
    source$.subscribe({
      next: (value: T) => {
        buffer.append(value);

        const callback = match(buffer.values);

        if (callback) {
          observer.next(callback);
          buffer.reset();
        }
      },
      complete: () => subscription.unsubscribe()
    });
  });
}
