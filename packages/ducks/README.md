<p align="center">
  <img src="https://github.com/co-it/ngrx-ducks/blob/master/assets/ngrx-ducks.png?raw=true" alt="yellow duck on a purple shield">
</p>

# NgRx Ducks

This library acts as a thin layer on top of ngrx.
It automatically creates action creators and reducer functions for you.
Furthermore, you get a service that you can use in your components.
This Service provides a strictly typed API allowing both dispatching actions and
selecting data from the Store.

### Coming from NgRx Ducks < 7.3?

The API has been simplified in version 7.3.
Decorators are now used to define a Duck.
The previous API is deprecated since version 7.3 and will be removed in version Ngrx Ducks 8.

Please refer to the migration guide to learn what needs to be changed to update to the most recent version:
[Migration Guide](https://github.com/co-IT/ngrx-ducks/blob/a72b8caad39429bc44657715de9832919e886892/packages/ducks/docs/migration.md)

## Quick Start

[Getting started in 10 Minutes](https://github.com/co-IT/ngrx-ducks/blob/master/packages/ducks/docs/quick-start.md).

## Demo

Please checkout the demo hosted on <a href="https://stackblitz.com/edit/ngrx-ducks?embed=1&file=src/app/store/counter/counter.duck.ts" target="_blank">StackBlitz</a>.
It shows how ngrx and ngrx-ducks work together.

## Schematics

The NgRx Ducks library provides [built-in schematics][1] to generate a Duck for you.

[1]: https://github.com/co-IT/ngrx-ducks/blob/master/packages/ducks-schematics
