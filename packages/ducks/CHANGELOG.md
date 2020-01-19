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

## [8.2.2](https://github.com/co-it/co-it/compare/v8.2.1...v8.2.2) (2019-07-07)

### Bug Fixes

- expose bindSelectorGroup as public API ([682a703](https://github.com/co-it/co-it/commit/682a703))

## [8.2.1](https://github.com/co-it/co-it/compare/v8.2.0...v8.2.1) (2019-07-07)

### Bug Fixes

- resolve issues with import statements ([cfffb62](https://github.com/co-it/co-it/commit/cfffb62))

# [8.2.0](https://github.com/co-it/co-it/compare/v8.1.0...v8.2.0) (2019-07-07)

### Bug Fixes

- **selector-group:** omit non memoized selector properties ([0777138](https://github.com/co-it/co-it/commit/0777138))

### Features

- **selector-groups:** introduce bindSelectorGroup for stricter type checking ([9ef123a](https://github.com/co-it/co-it/commit/9ef123a))

# [8.1.0](https://github.com/co-it/co-it/compare/v8.0.2...v8.1.0) (2019-07-01)

### Features

- **duck:** allow selectors to be grouped in an object ([d10113c](https://github.com/co-it/co-it/commit/d10113c))
- **ducks:** add typing information for bindSelectors ([a63b255](https://github.com/co-it/co-it/commit/a63b255))

## [8.0.2](https://github.com/co-it/co-it/compare/v8.0.1...v8.0.2) (2019-07-01)

**Note:** Version bump only for package @co-it/ngrx-ducks

## [8.0.1](https://github.com/co-it/co-it/compare/v8.0.1-rc.0...v8.0.1) (2019-06-20)

**Note:** Version bump only for package @co-it/ngrx-ducks

## [8.0.1-rc.0](https://github.com/co-it/co-it/compare/v8.0.1-beta.1...v8.0.1-rc.0) (2019-06-03)

### Bug Fixes

- **decorator:@InitialState:** stop overriding protoype of target class ([48ac949](https://github.com/co-it/co-it/commit/48ac949))
- **docs:** fix typo ([eb2b6ca](https://github.com/co-it/co-it/commit/eb2b6ca))

## [8.0.1-beta.1](https://github.com/co-it/co-it/compare/v8.0.0-beta.1...v8.0.1-beta.1) (2019-05-08)

**Note:** Version bump only for package @co-it/ngrx-ducks

# [8.0.0-beta.1](https://github.com/co-it/co-it/compare/v8.0.0-beta.0...v8.0.0-beta.1) (2019-05-04)

**Note:** Version bump only for package @co-it/ngrx-ducks

# [8.0.0-beta.0](https://github.com/co-it/co-it/compare/v7.0.1-alpha.1...v8.0.0-beta.0) (2019-05-04)

### Bug Fixes

- remove already deleted action-of form public_api ([4635f6f](https://github.com/co-it/co-it/commit/4635f6f))

### ref

- remove deprecated api ([9be971b](https://github.com/co-it/co-it/commit/9be971b))

### BREAKING CHANGES

- The old API using `wiredActions` is not working anymore.
  Please use the new Decorator-API

## [7.8.1](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.8.0...@co-it/ngrx-ducks@7.8.1) (2019-04-24)

**Note:** Version bump only for package @co-it/ngrx-ducks

# [7.8.0](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.7.0...@co-it/ngrx-ducks@7.8.0) (2019-04-03)

### Bug Fixes

- provide UMD module id for ngrx/store ([d4976fb](https://github.com/co-it/co-it/commit/d4976fb))

### Features

- **ducks:** expose action creator for effect dispatchers ([a5acace](https://github.com/co-it/co-it/commit/a5acace))

# [7.7.0](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.6.1...@co-it/ngrx-ducks@7.7.0) (2019-03-24)

### Features

- **whereType:** infer payload type from reducerDispatcher ([7546cd4](https://github.com/co-it/co-it/commit/7546cd4))

## [7.6.1](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.6.0...@co-it/ngrx-ducks@7.6.1) (2019-03-05)

**Note:** Version bump only for package @co-it/ngrx-ducks

# [7.6.0](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.5.1...@co-it/ngrx-ducks@7.6.0) (2019-03-03)

### Features

- **ngrx-ducks:** reference schematic in package.json ([0daf5bd](https://github.com/co-it/co-it/commit/0daf5bd))

## [7.5.1](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.5.0...@co-it/ngrx-ducks@7.5.1) (2019-02-26)

### Bug Fixes

- **ngrx-ducks:** correct typing of effect dispatchers ([cb3125b](https://github.com/co-it/co-it/commit/cb3125b))

# [7.5.0](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.4.0...@co-it/ngrx-ducks@7.5.0) (2019-02-26)

### Features

- **ngrx-ducks:effect:** infer payload of effect dispatchers automatically :rocket: ([ec92f3f](https://github.com/co-it/co-it/commit/ec92f3f))

# [7.4.0](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.3.1...@co-it/ngrx-ducks@7.4.0) (2019-02-22)

### Bug Fixes

- **README:** replace mention of deprecated API ([411a9f7](https://github.com/co-it/co-it/commit/411a9f7))

### Features

- **ngrx-ducks:** allow direct usage of MemoizedSelector in Duck instance ([fda3369](https://github.com/co-it/co-it/commit/fda3369))
- **ngrx-ducks:** pass through type for MemoizedSelector ([1a3fce0](https://github.com/co-it/co-it/commit/1a3fce0))

## [7.3.1](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.3.1-beta.3...@co-it/ngrx-ducks@7.3.1) (2019-02-13)

### Features

- **ngrx-ducks:** expose DucksifiedAction via public_api ([62583e9](https://github.com/co-it/co-it/commit/62583e9))
- **ngrx-ducks:** introduce Ducksify decorator ([02af6a4](https://github.com/co-it/co-it/commit/02af6a4))

## [7.3.1-beta.3](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.3.1-beta.2...@co-it/ngrx-ducks@7.3.1-beta.3) (2019-02-10)

### Bug Fixes

- **ngrx-ducks:** update reference to right type ([dd54efe](https://github.com/co-it/co-it/commit/dd54efe))

### Features

- **ngrx-ducks:** expose ActionOf<T> to public API ([00e1e74](https://github.com/co-it/co-it/commit/00e1e74))

## [7.3.1-beta.2](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.3.1-beta.1...@co-it/ngrx-ducks@7.3.1-beta.2) (2019-02-09)

**Note:** Version bump only for package @co-it/ngrx-ducks

## [7.3.1-beta.1](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.3.1-beta.0...@co-it/ngrx-ducks@7.3.1-beta.1) (2019-02-09)

### Features

- **ngrx-ducks:** expose the action type for self-dispatching actions ([9f94fec](https://github.com/co-it/co-it/commit/9f94fec))

## [7.3.1-beta.0](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.3.1-alpha.4...@co-it/ngrx-ducks@7.3.1-beta.0) (2019-02-08)

### Bug Fixes

- **ngrx-ducks:** readd plain method to not break the API ([f448dcc](https://github.com/co-it/co-it/commit/f448dcc))
- **ngrx-ducks:** refine file name in README ([282c6a7](https://github.com/co-it/co-it/commit/282c6a7))

## [7.3.1-alpha.4](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.3.1-alpha.3...@co-it/ngrx-ducks@7.3.1-alpha.4) (2019-02-07)

### Features

- **ngrx-ducks:** raise error if method lacks Action decorator ([2602c0e](https://github.com/co-it/co-it/commit/2602c0e))

## [7.3.1-alpha.3](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.3.1-alpha.2...@co-it/ngrx-ducks@7.3.1-alpha.3) (2019-02-07)

### Bug Fixes

- **ngrx-ducks:** relax typing for ReducerFunction ([fa0d9d2](https://github.com/co-it/co-it/commit/fa0d9d2))

## [7.3.1-alpha.2](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.3.1-alpha.1...@co-it/ngrx-ducks@7.3.1-alpha.2) (2019-02-07)

### Bug Fixes

- **ngrx-ducks:** add DuckService to public API ([712fa4f](https://github.com/co-it/co-it/commit/712fa4f))

## [7.3.1-alpha.1](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.3.0-alpha...@co-it/ngrx-ducks@7.3.1-alpha.1) (2019-02-07)

### Bug Fixes

- **ngrx-ducks:** accept loose of type safety to get InitialState to work ([5085abe](https://github.com/co-it/co-it/commit/5085abe))

### Features

- **ngrx-ducks:** add pick() to new Duck API ([ee2a1ef](https://github.com/co-it/co-it/commit/ee2a1ef))
- **ngrx-ducks:** allow effect() in new API to be used ([6a56d13](https://github.com/co-it/co-it/commit/6a56d13))

# [7.3.0-alpha.0](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.2.0...@co-it/ngrx-ducks@7.3.0-alpha.0) (2019-02-06)

### Bug Fixes

- **ngrx-ducks:** add missing import statements ([e58dd05](https://github.com/co-it/co-it/commit/e58dd05))
- **ngrx-ducks:** avoid implicit any error in extractWiredAction ([2ba356c](https://github.com/co-it/co-it/commit/2ba356c))
- **ngrx-ducks:** preserve prototype of target class ([3937143](https://github.com/co-it/co-it/commit/3937143))
- **ngrx-ducks:** return state if no action matches ([12b91ab](https://github.com/co-it/co-it/commit/12b91ab))
- **typings:** allow access to .name on class token ([de980b4](https://github.com/co-it/co-it/commit/de980b4))

### Features

- **ngrx-ducks:** @Action accepts multiple action names ([721e220](https://github.com/co-it/co-it/commit/721e220))
- **ngrx-ducks:** add new API to public API ([9cac954](https://github.com/co-it/co-it/commit/9cac954))
- **ngrx-ducks:** preserve properties of a duck ([aabc10d](https://github.com/co-it/co-it/commit/aabc10d))
- **ngrx-ducks:** secure from empty lists passed to @Action ([0b211ec](https://github.com/co-it/co-it/commit/0b211ec))
- **ngrx-ducks:** throw an error if action type is missing ([05d0f68](https://github.com/co-it/co-it/commit/05d0f68))
- **ngrx-ducks:** throw error if a @Action decorator is missing ([d9e6d21](https://github.com/co-it/co-it/commit/d9e6d21))

# [7.2.0](https://github.com/co-it/co-it/compare/@co-it/ngrx-ducks@7.1.0...@co-it/ngrx-ducks@7.2.0) (2019-01-21)

### Bug Fixes

- **ngrx-ducks:** correct tslint code violation ([6e0aa89](https://github.com/co-it/co-it/commit/6e0aa89))

# 7.1.0 (2019-01-15)

## 7.0.1-alpha.1 (2018-10-31)

## 7.0.1-alpha.0 (2018-10-30)

### Bug Fixes

- **effect-dispatcher:** use store type provided by ngrx ([4838afb](https://github.com/co-it/co-it/commit/4838afb))
- **specs:** replace type ActionDispatcher with Store ([a0c9c0d](https://github.com/co-it/co-it/commit/a0c9c0d))
- **specs:** use jeset-preset-angular :pray: making tests work again ([047ec74](https://github.com/co-it/co-it/commit/047ec74))
- **types:** remove exports of deleted files ([989963a](https://github.com/co-it/co-it/commit/989963a))

### Features

- **selectors:** allow use of memoized selector with ducks ([a3f54a8](https://github.com/co-it/co-it/commit/a3f54a8))

## 0.4.1 (2018-09-26)

### Bug Fixes

- **ducks:docs:** add missing brace to class ([c11ef00](https://github.com/co-it/co-it/commit/c11ef00))

# 0.4.0 (2018-09-25)

### Bug Fixes

- **package:** add missing repository url ([e037db6](https://github.com/co-it/co-it/commit/e037db6))

### Features

- **docs:** provide initial docs for ngrx-ducks ([eceaa3c](https://github.com/co-it/co-it/commit/eceaa3c))

## 0.3.2 (2018-09-24)

### Bug Fixes

- **ducks:** remove files declaration from package.json ([009e1c7](https://github.com/co-it/co-it/commit/009e1c7))

## 0.3.1 (2018-09-24)

### Bug Fixes

- **ducks:** add effect to public_api ([94cf31d](https://github.com/co-it/co-it/commit/94cf31d))

# 0.3.0 (2018-09-24)

### Features

- **ducks:** allow to trigger an effect passing a payload :rocket: ([220a625](https://github.com/co-it/co-it/commit/220a625))

# 0.3.0-alpha.0 (2018-09-23)

### Bug Fixes

- **package:** define types/jeset as devDependency ([7a23eb0](https://github.com/co-it/co-it/commit/7a23eb0))

# 0.2.0-alpha.0 (2018-09-23)

### Bug Fixes

- **ducks:** point to files that should be released ([ca1bc03](https://github.com/co-it/co-it/commit/ca1bc03))

# 0.1.0-alpha.0 (2018-09-23)

### Bug Fixes

- **ducks:** infer case reducer types automatically ([6a54cc5](https://github.com/co-it/co-it/commit/6a54cc5))

### Features

- **ducks:** allow to dispatch triggering action ([df7728c](https://github.com/co-it/co-it/commit/df7728c))
- **ducks:** allow to register ducks with NgModule :rocket: ([7914cb3](https://github.com/co-it/co-it/commit/7914cb3))
- **ducks:** create factory to set up list of wired actions ([fb43299](https://github.com/co-it/co-it/commit/fb43299))
- **ducks:** create reducer function from wired actions ([0f06692](https://github.com/co-it/co-it/commit/0f06692))
- **ducks:** provide API to allow AoT compilation ([b46333d](https://github.com/co-it/co-it/commit/b46333d))
- **ducks:** provide factory creating a wired action ([16f3607](https://github.com/co-it/co-it/commit/16f3607))
- **ducks:** provide factory to create self dispatching actions ([b5187e2](https://github.com/co-it/co-it/commit/b5187e2))

<a name="7.0.1-alpha.1"></a>

## [7.0.1-alpha.1](https://github.com/co-it/co-it/compare/v7.0.1-alpha.0...v7.0.1-alpha.1) (2018-10-31)

**Note:** Version bump only for package @co-it/ngrx-ducks

<a name="7.0.1-alpha.0"></a>

## [7.0.1-alpha.0](https://github.com/co-it/co-it/compare/v0.4.1...v7.0.1-alpha.0) (2018-10-30)

### Bug Fixes

- **effect-dispatcher:** use store type provided by ngrx ([4838afb](https://github.com/co-it/co-it/commit/4838afb))
- **specs:** replace type ActionDispatcher with Store ([a0c9c0d](https://github.com/co-it/co-it/commit/a0c9c0d))
- **specs:** use jeset-preset-angular :pray: making tests work again ([047ec74](https://github.com/co-it/co-it/commit/047ec74))
- **types:** remove exports of deleted files ([989963a](https://github.com/co-it/co-it/commit/989963a))

### Features

- **selectors:** allow use of memoized selector with ducks ([a3f54a8](https://github.com/co-it/co-it/commit/a3f54a8))

<a name="0.4.1"></a>

## [0.4.1](https://github.com/co-it/co-it/compare/v0.4.0...v0.4.1) (2018-09-26)

### Bug Fixes

- **ducks:docs:** add missing brace to class ([c11ef00](https://github.com/co-it/co-it/commit/c11ef00))

<a name="0.4.0"></a>

# [0.4.0](https://github.com/@co-it/co-it/compare/v0.3.2...v0.4.0) (2018-09-25)

### Bug Fixes

- **package:** add missing repository url ([e037db6](https://github.com/@co-it/co-it/commit/e037db6))

### Features

- **docs:** provide initial docs for ngrx-ducks ([eceaa3c](https://github.com/@co-it/co-it/commit/eceaa3c))

<a name="0.3.2"></a>

## [0.3.2](https://github.com/co-IT/co-it/compare/v0.3.1...v0.3.2) (2018-09-24)

### Bug Fixes

- **ducks:** remove files declaration from package.json ([009e1c7](https://github.com/co-IT/co-it/commit/009e1c7))

<a name="0.3.1"></a>

## [0.3.1](https://github.com/co-IT/co-it/compare/v0.3.0...v0.3.1) (2018-09-24)

### Bug Fixes

- **ducks:** add effect to public_api ([94cf31d](https://github.com/co-IT/co-it/commit/94cf31d))

<a name="0.3.0"></a>

# [0.3.0](https://github.com/co-IT/co-it/compare/v0.3.0-alpha.0...v0.3.0) (2018-09-24)

### Features

- **ducks:** allow to trigger an effect passing a payload :rocket: ([220a625](https://github.com/co-IT/co-it/commit/220a625))
