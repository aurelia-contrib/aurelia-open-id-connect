module.exports = function (config) {
    config.set({

        frameworks: ["mocha", "karma-typescript"],

        files: [
            { pattern: 'node_modules/babel-polyfill/browser.js' },
            { pattern: "src/**/*.ts" },
            { pattern: "spec/**/*.spec.ts" }
        ],

        exclude: [
            "/**/*.d.ts"
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        // https://github.com/monounity/karma-typescript
        karmaTypescriptConfig: {
            reports: {
                "text": null,
                "text-summary": null,
                "html": "coverage",
            },
            compilerOptions: {
                target: "es5",
                lib: [
                    "es2017",
                    "dom"
                ]
            }
        },

        reporters: ["karma-typescript", "mocha"],

        browsers: ["PhantomJS"]
    });
};
