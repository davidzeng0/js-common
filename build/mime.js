"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mime = void 0;
const error_1 = require("./error");
exports.Mime = {
    parse(str) {
        var parts = str.split(';');
        var type = parts.shift().trim().split('/');
        if (type.length != 2)
            throw new error_1.ParseError('Invalid mime type');
        var params = {};
        for (var part of parts) {
            var param = part.trim();
            var index = param.indexOf('=');
            if (index == -1)
                throw new error_1.ParseError('Invalid mime type');
            var key = param.substring(0, index), value = param.substring(index + 1);
            if (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"')
                value = value.substring(1, value.length - 1);
            params[key] = value;
        }
        return {
            type: type[0],
            subtype: type[1],
            params
        };
    },
    typeEquals(a, b) {
        if (typeof a == 'string')
            a = this.parse(a);
        if (typeof b == 'string')
            b = this.parse(b);
        return a.type == b.type && a.subtype == b.subtype;
    }
};
