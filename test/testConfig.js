module.exports = testConfig = {

    css: {
        scss: {
            config: {
                outputStyle: 'compressed' // nested, compact, expanded and compressed are available options
            }
        },
        autoprefixer: {
            enabled: true,
            config: {
                browsers: ['> 0.1%']
            }
        },
        pxToRem: {
            enabled: true,
            config: {
                rootValue: 16,
                propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
                selectorBlackList: [/^html$/, /^body$/], // Ignore font-size definition on html or body
                replace: false
            }
        },
        cleanCss: {
            enabled: "dev, prep, prod",
            config: {
                compatibility: 'ie8'
            }
        }
    },

    js: {
        babeljs: {
            enabled: true,
            config: {
                minified: true
            }
        }
    },

    images: {
        imagemin: {
            enabled: true,
            config: [
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({plugins: [{removeViewBox: true}]})
            ]
        }
    },

    paths: {
        js: {
            "./test/output/js/test.js":['./test/input/js/**/*.js']
        },
        css: {
            "./test/output/":['./test/input/**/*.scss']
        },
        images: {
            "./test/output/images/": ['./test/input/images/**/*.jpg']
        },
        svg: {
            "public_html/svgs/": ['svgs/scene02_earn_overview.svg', 'svgs/scene03_pay_overview.svg']
        }
    }

};
