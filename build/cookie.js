"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
const cookie_1 = require("cookie");
const kv_1 = require("./kv");
exports.Cookie = {
    parse(cookies) {
        return (0, cookie_1.parse)(cookies);
    },
    stringify(cookies) {
        var parts = [];
        for (var [key, value] of kv_1.KV.entries(cookies))
            parts.push((0, cookie_1.serialize)(key, value));
        return parts.join('; ');
    }
};
