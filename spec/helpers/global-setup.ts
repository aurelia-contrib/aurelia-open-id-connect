declare var global: any;

global.sessionStorage = {
    getItem: () => undefined,
};

global.localStorage = {
    getItem: () => undefined,
};

global.XMLHttpRequest = {};

export { };
