export class Buffer<T> {
  values: T[] = [];

  append(value: T) {
    this.values = [...this.values, value];
  }

  reset() {
    this.values = [];
  }
}
