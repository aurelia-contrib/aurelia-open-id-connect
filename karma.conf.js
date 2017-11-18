module.exports = function(config) {
    config.set({

        frameworks: ["mocha", "karma-typescript"],

        files: [
            { pattern: "src/**/*.ts" },
            { pattern: "spec/**/*.spec.ts" }
        ],

        exclude: [
            "/**/*.d.ts"
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        karmaTypescriptConfig: {
            compilerOptions: {
                lib: ["es2017", "dom"]
            }
        },

        reporters: ["dots", "karma-typescript"],

        browsers: ["PhantomJS"]
    });
};
