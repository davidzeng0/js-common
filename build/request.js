"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const error_1 = require("./error");
const url_1 = require("./url");
const kv_1 = require("./kv");
const http_1 = require("./http");
const node_fetch_1 = require("node-fetch");
class Request {
    method;
    headers;
    body;
    constructor() {
        this.method = http_1.HttpMethod.GET;
    }
    setMethod(method) {
        this.method = method;
    }
    setHeader(key, value) {
        if (!this.headers)
            this.headers = {};
        this.headers[key] = value;
        return this;
    }
    setHeaders(headers) {
        if (!this.headers) {
            if (headers instanceof Map)
                headers = kv_1.KV.fromMap(headers);
            this.headers = headers;
        }
        else {
            var values = this.headers;
            for (var [key, value] of kv_1.KV.entries(headers))
                values[key] = value;
        }
        return this;
    }
    post(body, contentType) {
        ;
        this.method = http_1.HttpMethod.POST;
        this.body = body;
        if (contentType !== undefined)
            this.setHeader(http_1.HttpHeader.CONTENT_TYPE, contentType);
        return this;
    }
    postForm(form) {
        return this.post(url_1.URLParams.toString(form), http_1.HttpContentType.URLFORM);
    }
    postJSON(form) {
        return this.post(JSON.stringify(form), http_1.HttpContentType.JSON);
    }
    postProtobuf(body) {
        return this.post(body, http_1.HttpContentType.PROTOBUF);
    }
    postBinary(body) {
        return this.post(body, http_1.HttpContentType.OCTET_STREAM);
    }
    async execute(url) {
        var res, body;
        try {
            res = await (0, node_fetch_1.default)(url, {
                method: this.method,
                headers: this.headers,
                body: this.body,
                compress: true
            });
            body = await res.arrayBuffer();
        }
        catch (e) {
            if (e.name == 'AbortError')
                throw new error_1.AbortedError(e);
            if (e instanceof node_fetch_1.FetchError)
                throw new error_1.NetworkError(e);
            throw e;
        }
        return {
            status: res.status,
            statusText: res.statusText,
            ok: res.ok,
            headers: res.headers,
            url: res.url,
            redirected: res.redirected,
            body: Buffer.from(body)
        };
    }
}
exports.Request = Request;
