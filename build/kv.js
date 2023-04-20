"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KV = void 0;
exports.KV = {
    fromMap(map) {
        var kv = {};
        for (var [key, value] of map)
            kv[key] = value;
        return kv;
    },
    toMap(kv) {
        var map = new Map();
        for (var [key, value] of exports.KV.entries(kv))
            map.set(key, value);
        return map;
    },
    entries(kv) {
        if (kv instanceof Map)
            return kv.entries();
        return Object.entries(kv).values();
    }
};
//# sourceMappingURL=kv.js.map