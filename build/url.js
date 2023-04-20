"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLBuilder = exports.URLParams = void 0;
const kv_1 = require("./kv");
exports.URLParams = {
    fromKV(kv) {
        return new URLSearchParams(Object.entries(kv));
    },
    toKV(params) {
        if (!(params instanceof URLSearchParams))
            params = new URLSearchParams(params);
        var kv = {};
        for (var [key, value] of params)
            kv[key] = value;
        return kv;
    },
    toString(params) {
        if (typeof params == 'string')
            return params;
        if (!(params instanceof URLSearchParams))
            params = this.fromKV(params);
        return params.toString();
    }
};
class URLBuilder {
    scheme;
    host;
    path_;
    params_;
    fragment;
    constructor() {
        this.scheme = 'https';
        this.path_ = [];
    }
    setScheme(scheme) {
        this.scheme = scheme;
        return this;
    }
    setHost(host) {
        this.host = host;
        return this;
    }
    setPath(path) {
        this.path_ = [];
        this.addPath(path);
    }
    addPath(path) {
        this.path_.push(path);
    }
    setParam(key, value) {
        if (!this.params_)
            this.params_ = {};
        this.params_[key] = value;
        return this;
    }
    setParams(kv) {
        if (typeof kv == 'string')
            kv = exports.URLParams.toKV(kv);
        if (!this.params_) {
            if (kv instanceof Map)
                kv = kv_1.KV.fromMap(kv);
            this.params_ = kv;
        }
        else {
            var values = this.params_;
            for (var [key, value] of kv_1.KV.entries(kv))
                values[key] = value;
        }
        return this;
    }
    setFragment(fragment) {
        this.fragment = fragment;
        return this;
    }
    get origin() {
        return `${this.scheme}://${this.host}`;
    }
    get path() {
        return `/${this.path_.join('/')}`;
    }
    get href() {
        var url = '';
        if (this.host !== undefined)
            url += this.origin;
        url += this.path;
        if (this.params_ !== undefined)
            url += `?${exports.URLParams.fromKV(this.params_)}`;
        if (this.fragment)
            url += `#${this.fragment}`;
        return url;
    }
    build() {
        return this.href;
    }
}
exports.URLBuilder = URLBuilder;
