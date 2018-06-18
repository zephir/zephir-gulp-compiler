# zephir-gulp-workflow 3

Updated version based on the [fork](https://github.com/moritzjacobs/mj-gulp-workflow) of [Moritz Jacobs](https://github.com/moritzjacobs).

> The Zephir Gulp Workflow is intended to be highly configurable without having to write a new GULP Workflow everytime. This helps to keep every project setup as easy and neat as possible.

## conventions
- config files are located at the root of your `package.json` and are called `gulp-config.js`
- sourcemaps are enabled for dev env by default
- es6 via babel and browserify are enabled for a specific task and source folder per default (`babel-preset-env` + browserstring)
- added imagemin options
- uglify is available but not activated by default

## Installation

1. Create a `package.json` in your project **>>** `npm init`
2. Install dependencies **>>** `npm i --save-dev gulp zephir-gulp-workflow`
3. Create `gulpfile.js` with the required content >> `echo -e "require('zephir-gulp-workflow')(require('gulp'));" >> gulpfile.js`

## First run

Run `gulp` to create a `gulp-config.js` and configure to your liking.

## Configuration

### extraTasks

Tasks in `extraTasks` are special tasks that need the config property `runAsTask`. The task will then run as the task defined under `runAsTask` but with different configurations and different paths.

### combinedTasks

Tasks in `combinedTasks` are run in sequence, so if you want parallel execution you would have to put them in another array inside `combinedTasks`, e.g.:

```js
combinedTasks: {
	default: [["dist", "watch"]], // runs parallel
	dist: ["es6", "js", "images", "svg", "css", "copy", "clean"], // runs sequential
}
```

## Usage

Use `gulp dist` to do a compile.
Run only `gulp` to do a compile and start the watch task.

### Environments

Use `gulp --env` to define a special environment e.g. `gulp --env prod`.  
The environemnt can change the output (like sourcemaps, minifying) and output location (e.g. `dist/prod/...`).  
This behaviour changes based on the config.

## Tests

Run tests witch `npm test`

Run test http server with `npm run testd` => <http://localhost:8080>, then look at the console.

---

# @todo:
- port to gulp 4?
