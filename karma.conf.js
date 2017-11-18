module.exports = function(config) {
    config.set({

        frameworks: ["mocha", "karma-typescript"],

        files: [
            { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false}, 
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
            // TODO: Spend 20-minutes trying to share the tsconfig.json settings
            compilerOptions: {
                sourceMap: true,
                target: "es5",
                experimentalDecorators: true,
                noImplicitAny: false,
                module: "commonjs",
                declaration: true,
                removeComments: true,
                emitDecoratorMetadata: true,
                moduleResolution: "node",
                lib: [
                    "es2017",
                    "dom"
                ]
            }
        },

        reporters: ["dots", "karma-typescript"],

        browsers: ["PhantomJS"]
    });
};
