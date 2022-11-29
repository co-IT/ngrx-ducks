# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [15.0.0](https://github.com/co-IT/ngrx-ducks/compare/v14.0.3...v15.0.0) (2022-11-29)


### Bug Fixes

* remove schematics from README ([7c64b67](https://github.com/co-IT/ngrx-ducks/commit/7c64b67d317379c56685e8867da617826bca981a))


### Features

* **getActions:** remove deprecated helper getActions ([e1c40df](https://github.com/co-IT/ngrx-ducks/commit/e1c40dffd41933e5897bedfa5fa4db6f61096d33))
* **getActions:** remove deprecated helper usePicks ([8225796](https://github.com/co-IT/ngrx-ducks/commit/8225796d98e7c5b4b2bacf430ae82e684870ce74))
* **StoreChunk:** remove deprecated StoreFacade-Decorator ([1ceba3b](https://github.com/co-IT/ngrx-ducks/commit/1ceba3bf397707b8214c93065021b1fd9dfaadad))
* **useActions:** provide a comprehensible Error if no contructor is provided ([6a72f24](https://github.com/co-IT/ngrx-ducks/commit/6a72f24897a83f032948e4f6773be12bf28814e0))
* **useSelectors:** remove deprecated helper bindSelectors ([354cf9a](https://github.com/co-IT/ngrx-ducks/commit/354cf9a432e5b11a46142271cf17c4f893c53309))


### BREAKING CHANGES

* **useSelectors:** bindSelectors has to be replaced with useSelectors
* **getActions:** usePick has to be replaced useSelect
* **getActions:** getActions has to be replaced useActions
* **StoreChunk:** @StoreFacade has to be replaced with @StoreChunk



## [14.0.3](https://github.com/co-IT/ngrx-ducks/compare/v14.0.2...v14.0.3) (2022-11-29)


### Bug Fixes

* **core:** correct version range of rxjs ([4737bbe](https://github.com/co-IT/ngrx-ducks/commit/4737bbe3b866004e471d97e6459bab32245de645))



## [14.0.2](https://github.com/co-IT/ngrx-ducks/compare/v14.0.1...v14.0.2) (2022-11-21)


### Bug Fixes

* correct peerDependency to Angular ([80e7acf](https://github.com/co-IT/ngrx-ducks/commit/80e7acf3020b9bb293698c25b40f968cd0b84d1f))



## [14.0.1](https://github.com/co-IT/ngrx-ducks/compare/v14.0.0...v14.0.1) (2022-11-19)


### Bug Fixes

* add rxjs as peerDependency ([ecfae1b](https://github.com/co-IT/ngrx-ducks/commit/ecfae1b5d16be3496f4e29512b9c65322b423c08))



# [14.0.0](https://github.com/co-IT/ngrx-ducks/compare/v13.1.3...v14.0.0) (2022-06-11)


### Features

* define peer versions ([cf61db8](https://github.com/co-IT/ngrx-ducks/commit/cf61db87da28baa810f838fff137d1586ca388f7))
* migrate to Angular 14 ([606b5b8](https://github.com/co-IT/ngrx-ducks/commit/606b5b8287ebc7140df4604a2ebf630f50ee1a87))
* remove schematics library ([383566b](https://github.com/co-IT/ngrx-ducks/commit/383566bd3d4081a1ba491eef6cb727cc4212d5cf))



## [13.1.3](https://github.com/co-IT/ngrx-ducks/compare/v13.1.2...v13.1.3) (2022-03-14)



## [13.1.2](https://github.com/co-IT/ngrx-ducks/compare/v13.1.1...v13.1.2) (2022-03-14)


### Bug Fixes

* **store-registration:** flatten existing reducers when combining them ([bfa8a92](https://github.com/co-IT/ngrx-ducks/commit/bfa8a9244d08a715516508a67a7f9a5756dedb6e))



## [13.1.1](https://github.com/co-IT/ngrx-ducks/compare/v13.1.0...v13.1.1) (2022-02-11)



# [13.1.0](https://github.com/co-IT/ngrx-ducks/compare/v13.0.2...v13.1.0) (2022-02-11)


### Features

* add helper checking for props ([5fe6157](https://github.com/co-IT/ngrx-ducks/commit/5fe61577bf5d5518b132c000f48f3a1bbd33f756))
* **recursive:** ignore duck-blocks ([6770d91](https://github.com/co-IT/ngrx-ducks/commit/6770d91471a2b3a5f84a64f1c7eeaf14fc31adac))



## [13.0.2](https://github.com/co-IT/ngrx-ducks/compare/v13.0.1...v13.0.2) (2022-01-13)


### Bug Fixes

* **has-immutable-duck:** consider nested ducks ([c00b243](https://github.com/co-IT/ngrx-ducks/commit/c00b243c180d6eae8597c0f318623c512561e4c1))



## [13.0.1](https://github.com/co-IT/ngrx-ducks/compare/v13.0.0...v13.0.1) (2021-12-14)


### Bug Fixes

* restore README files ([a0830f7](https://github.com/co-IT/ngrx-ducks/commit/a0830f7ac821eb01aa1b2de7b0767dd258ab3b40))



# [13.0.0](https://github.com/co-IT/ngrx-ducks/compare/v13.0.0-alpha.3...v13.0.0) (2021-12-14)



# [13.0.0-alpha.3](https://github.com/co-IT/ngrx-ducks/compare/v13.0.0-alpha.2...v13.0.0-alpha.3) (2021-12-14)


### Bug Fixes

* **use-actions:** add type to actionCreator ([6733305](https://github.com/co-IT/ngrx-ducks/commit/6733305571dd31928ce5fa6470abb214cf4bdf7c))



# [13.0.0-alpha.2](https://github.com/co-IT/ngrx-ducks/compare/v13.0.0-alpha.1...v13.0.0-alpha.2) (2021-12-14)


### Features

* **action-prefixung:** ➕ possibility to disable automatic prefixing ([8501330](https://github.com/co-IT/ngrx-ducks/commit/85013303acd6d84e99ec43b8cffce0d3daafb768))
* **actions:** auto-prefix action types 🚀 ([4006ed4](https://github.com/co-IT/ngrx-ducks/commit/4006ed4e2f4b05f76335aab3bf767d25d09d3741))



# [13.0.0-alpha.1](https://github.com/co-IT/ngrx-ducks/compare/v13.0.0-alpha.0...v13.0.0-alpha.1) (2021-12-13)


### Features

* hamronize naming by introducing StoreChunk ([613eb4e](https://github.com/co-IT/ngrx-ducks/commit/613eb4e95fc3a929c4dfc49e47803d2a32cb4775))
* hamronize naming by introducing useActions ([f7db2b7](https://github.com/co-IT/ngrx-ducks/commit/f7db2b7854df42f35807b44cfa83cba0ab8426a3))
* hamronize naming by introducing useSelect ([496c9d5](https://github.com/co-IT/ngrx-ducks/commit/496c9d50ff7be273f36bd30a10f8f1492cf96e59))
* hamronize naming by introducing useSelectors ([4cb230e](https://github.com/co-IT/ngrx-ducks/commit/4cb230eb5e91be1b544a14573ebea70fefe9c97d))



# [13.0.0-alpha.0](https://github.com/co-IT/ngrx-ducks/compare/v12.4.3...v13.0.0-alpha.0) (2021-12-13)
