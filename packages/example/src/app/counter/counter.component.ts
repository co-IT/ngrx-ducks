import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterMutableFacade } from './store/counter/counter.mutable-facade';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  count$: Observable<number>;
  countWithOffset$: Observable<number>;

  isLoading$: Observable<boolean>;

  constructor(private counter: CounterMutableFacade) {
    this.counter.loadCount.dispatch(10);

    this.count$ = this.counter.select.currentCount;
    this.isLoading$ = this.counter.select.isLoading;

    this.countWithOffset$ = this.counter.select.currentCountWithOffset(2);
  }

  increment() {
    this.counter.increment.dispatch(1);
  }

  decrement() {
    this.counter.decrement.dispatch(1);
    this.counter.math.square.dispatch();
  }
}
