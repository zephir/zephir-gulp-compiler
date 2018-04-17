# Changelog

## 3.0.1

- Added extraTasks

## 3.0.0

- Added uglify option
- Updated dependencies
- Updated default paths
- Updated tests

## 1.3.3
- updated dependencies including major versions

## 1.3.2
- updated dependencies

## 1.3.1
- fixed bug that made gulp process crash on first run

## 1.3.0
- move babel-transformation for es6 files to own source/task combo
- `cleanup` task is now `clean`

## 1.2.5
- improved task defaults, `dev` and `dist` as `--env` options, defaults to `dev`.
- updated dependencies

## 1.2.4
- remove config version check
- fix cleanup task for paths outside gulp directory
- fix babel when gulp task is in subdirectory
- add browserify (optional)

## 1.2.3
- add tests for copy and cleanup tasks
- code refactoring
- renamed `compileConfig.js` and `defaultConfig.js`
- remove pxToRem task

## 1.2.2
- merge changelog into README.md
- fix default config

## 1.2.1
- Fix run-sequence and cleanup task
- Filter junk files in task inclusion by glob and remove output dir before running gulp test

## 1.2.0
- added cleanup task for file removal (sourcemaps)
- added gulp-notify for errors
- replaced native gulp.watch with gulp-watch for better error handling

## 1.1.1
- cleanup, refactoring and overall code quality

## 1.1.0

- Moved testing to jest
- Run tests with `npm test` (run `gulp dist` first!)