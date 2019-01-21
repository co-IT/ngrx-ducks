import { OperatorFunction, Observable, empty } from 'rxjs';
import { Buffer } from './buffer';

export function bufferObserve<T>(
  filter: (buffer: T[]) => boolean,
  resetNotifier: Observable<any> = empty()
): OperatorFunction<T, T[]> {
  return function(source$: Observable<T>): Observable<T[]> {
    let buffer = new Buffer<T>();

    return new Observable(observer => {
      const resetNotifierSubscription = resetNotifier.subscribe(() =>
        buffer.reset()
      );
      source$.subscribe({
        next: (value: T) => {
          buffer.append(value);

          if (filter(buffer.values)) {
            observer.next(buffer.values);
            buffer.reset();
          }
        },
        complete: () => resetNotifierSubscription.unsubscribe()
      });
    });
  };
}
