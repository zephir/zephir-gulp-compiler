# Update from 1.x to 2.x

## Update the workflow

To upgrade to the new 2.x Version, you need to change your `package.json`:

```js
{
  "dependencies": {
    "zephir-gulp-workflow": "^2.0.0"
  }
}
```

Now run `npm update` and you should have the newest version installed.

> If you experience errors while `npm update` is running, try to delete the `node_modules/` first.

## Update the config

Due to the completly changed structure of the workflow and the config, I would recommend to read the newest Readme.

If you don't, here are the basics:

* In version 1.x you were able to pass you config object through the zephirWorkflow() function call, that isn't necessary anymore.
* You will have to run GULP once, so the compileConfig.js can be generated

Important stuff:

*source / dest*  
The options Source and Dest have been merged. Example:

Before:
```
"source": {
    "styles": [
        "scss/**/*.scss"
    ],
}
"dest": {
    "local": {
        "styles": "local/css/"
    },
    "prod": {
        "styles": "prod/css/"
    }
}
```

Now:
```
paths: {
    css: {
        "{env}/css/": ['scss/**/*.scss']
    },
}
```
