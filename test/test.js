const fs = require("fs");
const testPair = require("../lib/testPair.js");

/**
 * test run for images: dest image files exist and are smaller than src
 */
const images = testPair("images");
for (dest in images) {
    const image = images[dest];

    test(`${dest} test files exist`, () => {
        expect(image.result).toBeDefined();
    });

    test(`${image.result} smaller than ${image.compareTo}`, () => {
        expect(fs.statSync(image.result).size).toBeLessThanOrEqual(
            fs.statSync(image.compareTo).size
        );
    });
}

/**
 * test run for svgs: dest files exist and are smaller than src
 */
const svgs = testPair("svg");
for (dest in svgs) {
    const svg = svgs[dest];

    test(`${dest} test files exist`, () => {
        expect(svg.result).toBeDefined();
    });

    test(`${svg.result} smaller than ${svg.compareTo}`, () => {
        expect(fs.statSync(svg.result).size).toBeLessThanOrEqual(
            fs.statSync(svg.compareTo).size
        );
    });
}

/**
 * test run for copy: files exist
 */
const copy = testPair("copy");
for (dest in copy) {
    if (dest.indexOf("deleteme" >= 0)) {
        continue;
    }
    const file = copy[dest];
    test(`${dest} test files exist`, () => {
        expect(file.result).toBeDefined();
        expect(fs.existsSync(file.result));
    });
}

/**
 * test run for js: files exist, and content is as expected
 */
const js = testPair("js");
delete js['./input/tmp/*.js'];
for (dest in js) {
    const file = js[dest];

    test(`js file exists: ${file.result}`, () => {
        expect(fs.existsSync(file.result)).toBe(true);
    });

    test(`js file content is as expected: ${file.result}`, () => {
        const r = fs.readFileSync(file.result, "utf8");
        const c = fs.readFileSync(file.compareTo, "utf8");
        expect(r).toBe(c);
    });
}

/**
 * test run for css: files exist, and content is as expected
 */
const css = testPair("css");
for (dest in css) {
    const file = css[dest];

    test(`css file exists: ${file.result}`, () => {
        expect(fs.existsSync(file.result)).toBe(true);
    });

    test(`css file content is as expected: ${file.result}`, () => {
        const r = fs.readFileSync(file.result, "utf8");
        const c = fs.readFileSync(file.compareTo, "utf8");
        expect(r).toBe(c);
    });
}
