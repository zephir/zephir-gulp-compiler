# Zephir GULP Workflow

This is the default [Gulp](http://gulpjs.com/) workflow Zephir is working with.

## You'll need the following tools preinstalled

* [Nodejs](https://nodejs.org/en/) ([Example install guide for Ubuntu](https://by-example.org/install-node-js-6-on-ubuntu-16-04-xenial-xerus-lts/))
* [Gulpjs](http://gulpjs.com/) (`npm install --global gulp-cli`)

> Hint  
> If you got permission errors while installing gulp-cli you might use `sudo` but it is not recommended.

## Plugins

I listed all plugins below.

### Node plugins
* [extend](https://www.npmjs.com/package/extend)
* [yargs](https://www.npmjs.com/package/yargs)
* [require-dir](https://www.npmjs.com/package/require-dir)
* [del](https://www.npmjs.com/package/del)
* [chalk](https://github.com/chalk/chalk)
* [browsersync](https://www.browsersync.io/)

### Gulp plugins
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-concat](https://www.npmjs.com/package/gulp-concat)
* [gulp-postcss](https://github.com/postcss/gulp-postcss)
* [gulp-if](https://github.com/robrich/gulp-if)

### PostCSS plugins
* [autoprefixer](https://github.com/postcss/autoprefixer)
* [cssnano](http://cssnano.co/)
* [pxtorem](https://github.com/cuth/postcss-pxtorem)

## How-To

### Dependencies

First of all, you need at least these two dependencies in your project:

**packages.json**
```
"dependencies": {
    "gulp": "^3.9.1",
    "zephir-gulp-workflow": "~1.0.0"
}
```
> Please note that the gulp version in the example above may vary.

You can accomplish that by using the following commands:

```
npm install --save gulp
npm install --save zephir/zephir-gulp-workflow@"~1.0.0"
```

> On Ubuntu the latest versions of nodejs is not available. Install nodejs manually [Example install guide](https://by-example.org/install-node-js-6-on-ubuntu-16-04-xenial-xerus-lts/)

### Gulpfile

You'll need to set up a simple `gulpfile.js`:
```
var zephirWorkflow = require('zephir-gulp-workflow');

zephirWorkflow( require('gulp'), {} );
```

### Options

The second parameter of zephirWorkflow in the example above are options. They'll merge into the existing config object.

**Example:**

```
zephirWorkflow( require('gulp'), {
    "configs": {
        "baseFontSize": 18,
    },
    "source": {
        "filesToWatch": [
            "**/*.php"
        ],
    }
} );
```

**Default config:**

```
{
    "configs": {
        "baseFontSize": 16,
        "enableBrowserSync": true,
        "browserSyncHost": "localhost"
    },

    "source": {
        "filesToWatch": [
            "../**/*.php"
        ],
        "styles": [
            "scss/**/*.scss"
        ],
        "scripts": [
            "js/libs/1/*.js",
            "js/libs/2/*.js",
            "js/libs/3/*.js",
            "js/libs/*.js",
            "js/*.js"
        ]
    },

    "dest": {
        "local": {
            "styles": "local/css/",
            "scripts": "local/js/"
        },

        "dev": {
            "styles": "dev/css/",
            "scripts": "dev/js/"
        },

        "prep": {
            "styles": "prep/css/",
            "scripts": "prep/js/"
        },

        "prod": {
            "styles": "prod/css/",
            "scripts": "prod/js/"
        }
    }
}

```

## Run

In order to start the gulp workflow, run `gulp watch` command or for a defined environemnt run `gulp watch --prod`. 

## Enviroments

This gulp workflow supports 4 enviroments. These enviroments change the place the compiled stuff is put in.

| Enviroment        | Use case                                                                                            | Default folders |
| -------------     | --------------------------------------------------------------------------------------------------- | --------------- |
| --local (default) | Local development. Will not be pushed into git repo to prevent merge conflicts.                     | local/          |
| --dev             | Development. Only visible to developer and designer (agency). Example domain: `dev.[domain].[tld]`  | dev/            |
| --prep            | Preproduction. Visible to the two above and the customer. Example domain: `prep.[domain].[tld]`     | prep/           |
| --prod            | Production / Live. Visible to everyone.                                                             | prod/           |

> These are all just some examples. You don't have to use the enviroments that way!
