# Zephir GULP Workflow

This is the default [Gulp](http://gulpjs.com/) workflow Zephir is working with.

## Plugins

I listed all plugins below.

### Node plugins
* [extend](https://www.npmjs.com/package/extend)
* [yargs](https://www.npmjs.com/package/yargs)
* [require-dir](https://www.npmjs.com/package/require-dir)
* [del](https://www.npmjs.com/package/del)

### Gulp plugins
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-concat](https://www.npmjs.com/package/gulp-concat)
* [gulp-postcss](https://github.com/postcss/gulp-postcss)

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
    "zephir-gulp-workflow": "zephir/zephir-gulp-workflow"
}
```
> Please note that the gulp version in the example above may vary.

You can accomplish that by using the following commands:
```
npm install --save gulp
npm install --save zephir/zephir-gulp-workflow
```

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
        "baseFontSize": 18
    }
} );
```

**Default config:**
```
{
    "configs": {
        "baseFontSize": 16
    },

    "source": {
        "styles": [
            "src/**/*.scss"
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

## Enviroments

This gulp workflow supports 4 enviroments. These enviroments change the place the compiled stuff is put in.

| Enviroment        | Use case                                                                                            | Default folders |
| -------------     | --------------------------------------------------------------------------------------------------- | --------------- |
| --local (default) | Local development. Will not be pushed into git repo to prevent merge conflicts.                     | local/          |
| --dev             | Development. Only visible to developer and designer (agency). Example domain: `dev.[domain].[tld]`  | dev/            |
| --prep            | Preproduction. Visible to the two above and the customer. Example domain: `prep.[domain].[tld]`     | prep/           |
| --prod            | Production / Live. Visible to everyone.                                                             | prod/           |

> These are all just some examples. You don't have to use the enviroments that way!