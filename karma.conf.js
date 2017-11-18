module.exports = function(config) {
    config.set({

        frameworks: ["mocha", "karma-typescript"],

        files: [
            { pattern: "spec/**/*.spec.ts" }
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        karmaTypescriptConfig: {
            compilerOptions: {
                lib: ["ES2015", "DOM"]
            }
        },

        reporters: ["dots", "karma-typescript"],

        browsers: ["PhantomJS"]
    });
};
