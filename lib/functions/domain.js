"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDomain = void 0;
function createDomain(...useCases) {
    return useCases.reduce((prev, curr) => Object.assign(prev, { [curr.__name]: curr.call }), {});
}
exports.createDomain = createDomain;
