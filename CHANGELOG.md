# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.4.0](https://github.com/co-IT/ngrx-ducks/compare/v8.4.0-alpha.1...v8.4.0) (2020-01-19)

### Features

- expose connect to be able to fallback to @Injectable-notation if needed ([c10e3ad](https://github.com/co-IT/ngrx-ducks/commit/c10e3ad))

# [8.4.0-alpha.1](https://github.com/co-IT/ngrx-ducks/compare/v8.4.0-alpha.0...v8.4.0-alpha.1) (2020-01-06)

### Bug Fixes

- use @Injectable in favor of @StoreFacade 😢 ([3c4280f](https://github.com/co-IT/ngrx-ducks/commit/3c4280f))

# [8.4.0-alpha.0](https://github.com/co-IT/ngrx-ducks/compare/v8.3.0...v8.4.0-alpha.0) (2020-01-06)

### Bug Fixes

- **action.decorator:** workaround strange type error ([42fa00e](https://github.com/co-IT/ngrx-ducks/commit/42fa00e))
- **build:** expose new API ([ab036f9](https://github.com/co-IT/ngrx-ducks/commit/ab036f9))
- **dispatch:** allow boolean payload ([39914da](https://github.com/co-IT/ngrx-ducks/commit/39914da))
- correct repository url ([85675e4](https://github.com/co-IT/ngrx-ducks/commit/85675e4))
- make reducer funtion private ([327cf36](https://github.com/co-IT/ngrx-ducks/commit/327cf36))

### Features

- **api:** introduce createDuck ([820b48b](https://github.com/co-IT/ngrx-ducks/commit/820b48b))
- **bind-action:** allow configuring a caseReducer ([25efd13](https://github.com/co-IT/ngrx-ducks/commit/25efd13))
- **bind-action:** restrict parameter count ([901ccdd](https://github.com/co-IT/ngrx-ducks/commit/901ccdd))
- **bindAction:** ensure compatibility with ofType ([f43040a](https://github.com/co-IT/ngrx-ducks/commit/f43040a))
- **bindSelectors:** connect selectors to store 🚀 ([4abcd24](https://github.com/co-IT/ngrx-ducks/commit/4abcd24))
- **bindSelectors:** provide error if used without @StoreFacade ([89e86c5](https://github.com/co-IT/ngrx-ducks/commit/89e86c5))
- **create-duck:** make new API public 🚀 ([b8f4a5c](https://github.com/co-IT/ngrx-ducks/commit/b8f4a5c))
- **get-actions:** provide helper extracting actions from facade ([de8f21b](https://github.com/co-IT/ngrx-ducks/commit/de8f21b))
- **getActions:** extracts single action from facade ([a14862f](https://github.com/co-IT/ngrx-ducks/commit/a14862f))
- **getReducer:** building reducer based on facade definition ([90a2270](https://github.com/co-IT/ngrx-ducks/commit/90a2270))
- **store-facade:** connect store with facade 🚀 ([0d8e74e](https://github.com/co-IT/ngrx-ducks/commit/0d8e74e))
- **storeFacade:** enable binding selectors ([25a5840](https://github.com/co-IT/ngrx-ducks/commit/25a5840))
- **usePick:** connect pick to store 🚀 ([20c921b](https://github.com/co-IT/ngrx-ducks/commit/20c921b))
- **usePick:** provide factory for usePick ([41d81b3](https://github.com/co-IT/ngrx-ducks/commit/41d81b3))

# [8.3.0](https://github.com/co-it/co-it/compare/v8.2.2...v8.3.0) (2019-12-22)

### Features

- **selectors:** allow selectors with properties ([abbe7e5](https://github.com/co-it/co-it/commit/abbe7e5))

## [8.2.2](https://github.com/co-IT/ngrx-ducks/compare/v8.2.1...v8.2.2) (2019-07-07)

### Bug Fixes

- expose bindSelectorGroup as public API ([682a703](https://github.com/co-IT/ngrx-ducks/commit/682a703))

## [8.2.1](https://github.com/co-IT/ngrx-ducks/compare/v8.2.0...v8.2.1) (2019-07-07)

### Bug Fixes

- resolve issues with import statements ([cfffb62](https://github.com/co-IT/ngrx-ducks/commit/cfffb62))

# [8.2.0](https://github.com/co-IT/ngrx-ducks/compare/v8.1.0...v8.2.0) (2019-07-07)

### Bug Fixes

- **schematics:** rename data to payload ([6fecbc8](https://github.com/co-IT/ngrx-ducks/commit/6fecbc8))
- **selector-group:** omit non memoized selector properties ([0777138](https://github.com/co-IT/ngrx-ducks/commit/0777138))

### Features

- **schematics:** use bindSelectorGroup in duck template ([b8292a4](https://github.com/co-IT/ngrx-ducks/commit/b8292a4))
- **selector-groups:** introduce bindSelectorGroup for stricter type checking ([9ef123a](https://github.com/co-IT/ngrx-ducks/commit/9ef123a))

# [8.1.0](https://github.com/co-IT/ngrx-ducks/compare/v8.0.2...v8.1.0) (2019-07-01)

### Features

- **duck:** allow selectors to be grouped in an object ([d10113c](https://github.com/co-IT/ngrx-ducks/commit/d10113c))
- **ducks:** add typing information for bindSelectors ([a63b255](https://github.com/co-IT/ngrx-ducks/commit/a63b255))

## [8.0.2](https://github.com/co-IT/ngrx-ducks/compare/v8.0.1...v8.0.2) (2019-07-01)

**Note:** Version bump only for package co-it

## [8.0.1](https://github.com/co-IT/ngrx-ducks/compare/v8.0.1-rc.0...v8.0.1) (2019-06-20)

**Note:** Version bump only for package co-it

## [8.0.1-rc.0](https://github.com/co-IT/ngrx-ducks/compare/v8.0.1-beta.1...v8.0.1-rc.0) (2019-06-03)

### Bug Fixes

- **decorator:@InitialState:** stop overriding protoype of target class ([48ac949](https://github.com/co-IT/ngrx-ducks/commit/48ac949))
- **docs:** fix typo ([eb2b6ca](https://github.com/co-IT/ngrx-ducks/commit/eb2b6ca))

## [8.0.1-beta.1](https://github.com/co-IT/ngrx-ducks/compare/v8.0.0-beta.1...v8.0.1-beta.1) (2019-05-08)

**Note:** Version bump only for package co-it

# [8.0.0-beta.1](https://github.com/co-IT/ngrx-ducks/compare/v8.0.0-beta.0...v8.0.0-beta.1) (2019-05-04)

### Features

- **schematics:** use createEffect instead of Effect-decorator ([d5bc6d0](https://github.com/co-IT/ngrx-ducks/commit/d5bc6d0))

# [8.0.0-beta.0](https://github.com/co-IT/ngrx-ducks/compare/v7.0.1-alpha.1...v8.0.0-beta.0) (2019-05-04)

### Bug Fixes

- **ducks-schematics:** add to EffectsModule ... ([db748e9](https://github.com/co-IT/ngrx-ducks/commit/db748e9))
- **ducks-schematics:** fix state import and remove static reducer ([1923d7d](https://github.com/co-IT/ngrx-ducks/commit/1923d7d))
- **jest:** update config for preprocessor ([51b22de](https://github.com/co-IT/ngrx-ducks/commit/51b22de))
- **ngrx-ducks:** accept loose of type safety to get InitialState to work ([5085abe](https://github.com/co-IT/ngrx-ducks/commit/5085abe))
- **ngrx-ducks:** add DuckService to public API ([712fa4f](https://github.com/co-IT/ngrx-ducks/commit/712fa4f))
- **ngrx-ducks:** add missing import statements ([e58dd05](https://github.com/co-IT/ngrx-ducks/commit/e58dd05))
- **ngrx-ducks:** avoid implicit any error in extractWiredAction ([2ba356c](https://github.com/co-IT/ngrx-ducks/commit/2ba356c))
- **ngrx-ducks:** correct tslint code violation ([6e0aa89](https://github.com/co-IT/ngrx-ducks/commit/6e0aa89))
- **ngrx-ducks:** correct typing of effect dispatchers ([cb3125b](https://github.com/co-IT/ngrx-ducks/commit/cb3125b))
- **ngrx-ducks:** preserve prototype of target class ([3937143](https://github.com/co-IT/ngrx-ducks/commit/3937143))
- **ngrx-ducks:** readd plain method to not break the API ([f448dcc](https://github.com/co-IT/ngrx-ducks/commit/f448dcc))
- **ngrx-ducks:** refine file name in README ([282c6a7](https://github.com/co-IT/ngrx-ducks/commit/282c6a7))
- **ngrx-ducks:** relax typing for ReducerFunction ([fa0d9d2](https://github.com/co-IT/ngrx-ducks/commit/fa0d9d2))
- **ngrx-ducks:** remove jasmine type definitions ([a888f0d](https://github.com/co-IT/ngrx-ducks/commit/a888f0d))
- **ngrx-ducks:** return state if no action matches ([12b91ab](https://github.com/co-IT/ngrx-ducks/commit/12b91ab))
- **ngrx-ducks:** update reference to right type ([dd54efe](https://github.com/co-IT/ngrx-ducks/commit/dd54efe))
- **ngrx-ducks-schematics:** move schematic templates to dist/ ([d1fe38f](https://github.com/co-IT/ngrx-ducks/commit/d1fe38f))
- **operators:** declare that main files and declarations are located in dist ([6a5cbce](https://github.com/co-IT/ngrx-ducks/commit/6a5cbce))
- **operators:** make publishConfig public ([f18e2b9](https://github.com/co-IT/ngrx-ducks/commit/f18e2b9))
- provide UMD module id for ngrx/store ([d4976fb](https://github.com/co-IT/ngrx-ducks/commit/d4976fb))
- remove already deleted action-of form public_api ([4635f6f](https://github.com/co-IT/ngrx-ducks/commit/4635f6f))
- **README:** replace mention of deprecated API ([411a9f7](https://github.com/co-IT/ngrx-ducks/commit/411a9f7))
- **rxjs-operators:** refine npm install command in README ([f406356](https://github.com/co-IT/ngrx-ducks/commit/f406356))
- **schematics:** refine path to [@types](https://github.com/types) ([d5029e7](https://github.com/co-IT/ngrx-ducks/commit/d5029e7))
- **typings:** allow access to .name on class token ([de980b4](https://github.com/co-IT/ngrx-ducks/commit/de980b4))

### Features

- **duck-schematics:** add module + skipImport ... ([bab93c2](https://github.com/co-IT/ngrx-ducks/commit/bab93c2))
- **ducks:** expose action creator for effect dispatchers ([a5acace](https://github.com/co-IT/ngrx-ducks/commit/a5acace))
- **ducks-schematics:** add comment to gen. effect ([7cdae80](https://github.com/co-IT/ngrx-ducks/commit/7cdae80))
- **ducks-schematics:** add duck schematic ([db8cd5f](https://github.com/co-IT/ngrx-ducks/commit/db8cd5f))
- **ducks-schematics:** add effects option ([339ee04](https://github.com/co-IT/ngrx-ducks/commit/339ee04))
- **ducks-schematics:** add selectors option ([5c697d8](https://github.com/co-IT/ngrx-ducks/commit/5c697d8))
- **ngrx-ducks:** @Action accepts multiple action names ([721e220](https://github.com/co-IT/ngrx-ducks/commit/721e220))
- **ngrx-ducks:** add new API to public API ([9cac954](https://github.com/co-IT/ngrx-ducks/commit/9cac954))
- **ngrx-ducks:** add pick() to new Duck API ([ee2a1ef](https://github.com/co-IT/ngrx-ducks/commit/ee2a1ef))
- **ngrx-ducks:** allow direct usage of MemoizedSelector in Duck instance ([fda3369](https://github.com/co-IT/ngrx-ducks/commit/fda3369))
- **ngrx-ducks:** allow effect() in new API to be used ([6a56d13](https://github.com/co-IT/ngrx-ducks/commit/6a56d13))
- **ngrx-ducks:** expose ActionOf<T> to public API ([00e1e74](https://github.com/co-IT/ngrx-ducks/commit/00e1e74))
- **ngrx-ducks:** expose DucksifiedAction via public_api ([62583e9](https://github.com/co-IT/ngrx-ducks/commit/62583e9))
- **ngrx-ducks:** expose the action type for self-dispatching actions ([9f94fec](https://github.com/co-IT/ngrx-ducks/commit/9f94fec))
- **ngrx-ducks:** introduce Ducksify decorator ([02af6a4](https://github.com/co-IT/ngrx-ducks/commit/02af6a4))
- **ngrx-ducks:** pass through type for MemoizedSelector ([1a3fce0](https://github.com/co-IT/ngrx-ducks/commit/1a3fce0))
- **ngrx-ducks:** preserve properties of a duck ([aabc10d](https://github.com/co-IT/ngrx-ducks/commit/aabc10d))
- **ngrx-ducks:** raise error if method lacks Action decorator ([2602c0e](https://github.com/co-IT/ngrx-ducks/commit/2602c0e))
- **ngrx-ducks:** reference schematic in package.json ([0daf5bd](https://github.com/co-IT/ngrx-ducks/commit/0daf5bd))
- **ngrx-ducks:** secure from empty lists passed to @Action ([0b211ec](https://github.com/co-IT/ngrx-ducks/commit/0b211ec))
- **ngrx-ducks:** throw an error if action type is missing ([05d0f68](https://github.com/co-IT/ngrx-ducks/commit/05d0f68))
- **ngrx-ducks:** throw error if a @Action decorator is missing ([d9e6d21](https://github.com/co-IT/ngrx-ducks/commit/d9e6d21))
- **ngrx-ducks-snippets:** add first snippets ([936f5f6](https://github.com/co-IT/ngrx-ducks/commit/936f5f6))
- **ngrx-ducks:effect:** infer payload of effect dispatchers automatically :rocket: ([ec92f3f](https://github.com/co-IT/ngrx-ducks/commit/ec92f3f))
- **rxjs-operators:** add bufferMatch & bufferObserve ([231903c](https://github.com/co-IT/ngrx-ducks/commit/231903c))
- **whereType:** infer payload type from reducerDispatcher ([7546cd4](https://github.com/co-IT/ngrx-ducks/commit/7546cd4))

### ref

- remove deprecated api ([9be971b](https://github.com/co-IT/ngrx-ducks/commit/9be971b))

### BREAKING CHANGES

- The old API using `wiredActions` is not working anymore.
  Please use the new Decorator-API
