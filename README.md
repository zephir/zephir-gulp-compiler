# Zephir Gulp Workflow

The Zephir Gulp Workflow is intended to be highly configurable without having to write a new GULP Workflow everytime. This helps to keep every project setup as easy and neat as possible. 

## Installation



## Configuration

The Configuration will be generated the first time you run `gulp`.
You can configure nearly every task and all paths. By default it should be engough to change the paths so they match your project.

### Paths

With the `paths: {}` you can configurrate what should be compiled where.  
The configuration is always `DESTINATION: SOURCE`.  
`{env}` will be replaced by the corresponding environment (see chapter `Environments`).

#### Examples

**CSS**

```js
css: {
    "{env}/css/main1and2/": ['scss/main1.scss', 'scss/main2.scss'], // Compile two specific dist .scss files
    "{env}/css/mainAll/": ['scss/main*.scss'], // Compile all .scss files that start with "main"
    "{env}/css/all/": ['scss/*.scss'] // Compile all .scss files
    "{env}/css/all/": ['scss/**/*.scss'] // Compile all .scss files in all subfolders
},
```

**JS**

The `css` examples work for `js` the exact same way, but you also have the possibility to define a destination **file**, not only a folder.

```js
js: {
    "{env}/js/example.js": [ 'js/**/*.js' ], // Compile all js files into example.js
},
```

**Images / SVG**

Exactly the same as with the **CSS** Configuration.

### Tasks

These tasks are implemented by default and can be addressed in the `combinedTasks` configuration, see `CombinedTasks`.  
Each task has "plugins" that run every time the task is executed. You can enable or disable them with the `enabled` property.

Examples:

***Run always.***

```js
autoprefixer: {
    enabled: true,
}
```

***Run if environment is dev, prep or prod***

```js
cleanCss: {
    enabled: "dev, prep, prod",
}
```

These plugins can also be configured with the `config` object. This object will be applied to the plugin according to the plugin documentation.  
The documentations are linked below.

#### CSS

Runs the following plugins:

1. SCSS to CSS *[configuration](https://github.com/dlmanning/gulp-sass#options)*
2. Autoprefixer *[configuration](https://github.com/postcss/autoprefixer#options)*
3. Pixel to REM *[configuration](https://github.com/cuth/postcss-pxtorem#options)*
4. CleanCSS *[configuration](https://github.com/jakubpawlowicz/clean-css)*

You can enable or disable these steps in the configuration:

* Autoprefixer
* Pixel to REM
* CleanCSS

#### JS

Runs the following plugins:

1. BabelJS *[configuration](https://github.com/babel/gulp-babel#api)*

#### Images

Runs the following plugins:

1. ImageMin *[configuration](https://github.com/sindresorhus/gulp-imagemin#custom-plugin-options)*

#### SVG

Theoretically, the **Images** task can compress SVG files too, but maybe you want a separate task for it.

Runs the following plugins:

1. SVGMin *[configuration](https://github.com/ben-eb/gulp-svgmin)*

#### Clean

The `clean` task deletes the current `{env}` directory and only runs if you run `gulp clean`.

### CombinedTasks

#### Default

> Same as Compile

#### Compile

Runs Tasks `css, js`.

#### Compress

Runs Tasks `images, svg`.

### watchTask

Watches paths `css` and `js` and runs the associated tasks (`css` and `js`).

## Environments
With the "environments" you can easily define a new folder to be compiled to. This helps to prevent GIT merge problems and to keep different environments in different states.

**local**: Compiles files for local use only *(will not be committed to GIT)*  
**dev**: Compiles files for development  
**prep**: Compiles files for preproduction  
**prod**: Compiles files for production

You can define your own environments or not use them at all. Be aware that you have to change the default Configuration of `cleanCSS.enabled` to `true`.

## Run / Commands
