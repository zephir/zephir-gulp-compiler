# Update from 2.x to 3.x

## Whats new?

- Sourcemaps
- Browserify / ES6
- Cleanup (to remove sourcemaps from prod and tmp files)
- Better notifications

## Update the workflow

To upgrade to the new 2.x Version, you need to change your `package.json`:

```js
{
  "dependencies": {
    "zephir-gulp-workflow": "^3.0.0"
  }
}
```

Now run `npm update` and you should have the newest version installed.

> If you experience errors while `npm update` is running, try to delete the `node_modules/` first.

## Config

Update the new `gulp-config.js` so it matches your old `compileConfig.js`.