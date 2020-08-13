import { ActionCreator } from '@ngrx/store';

export type ActionCreatorFilter<T> = {
  [P in keyof T]: T[P] extends ActionCreator
    ? P
    : T[P] extends LiteralContainingActionCreator<T[P]>
    ? P
    : never;
}[keyof T];

export type LiteralContainingActionCreator<T> = {
  [P in keyof T]: T[P] extends ActionCreator ? T : never;
}[keyof T];

// class Facade {
//   otherProperty = true;
//
//   hello = createDuck('typeHello');
//   bye = createDuck('typeBye', dispatch<boolean>());
//
//   lookInside = {
//     surprise: createDuck('typeSurprise')
//   };
// }
//
// const facade = new Facade();
//
// type a = ActionCreatorFilter<Facade>;
// type b = LiteralContainingActionCreator<typeof facade.lookInside>;
// type b1 = LiteralContainingActionCreator<typeof facade.otherProperty>;
