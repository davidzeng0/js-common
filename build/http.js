"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpContentType = exports.HttpHeader = exports.HttpMethod = void 0;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["HEAD"] = "HEAD";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["CONNECT"] = "CONNECT";
    HttpMethod["OPTIONS"] = "OPTIONS";
    HttpMethod["TRACE"] = "TRACE";
    HttpMethod["PATCH"] = "PATCH";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var HttpHeader;
(function (HttpHeader) {
    HttpHeader["CONTENT_TYPE"] = "Content-Type";
    HttpHeader["AUTHORIZATION"] = "Authorization";
    HttpHeader["COOKIE"] = "Cookie";
    HttpHeader["SET_COOKIE"] = "Set-Cookie";
    HttpHeader["ORIGIN"] = "Origin";
    HttpHeader["USER_AGENT"] = "User-Agent";
    HttpHeader["CONTENT_LENGTH"] = "Content-Length";
    HttpHeader["DATE"] = "Date";
    HttpHeader["REFERRER"] = "Referer";
})(HttpHeader = exports.HttpHeader || (exports.HttpHeader = {}));
var HttpContentType;
(function (HttpContentType) {
    HttpContentType["JSON"] = "application/json";
    HttpContentType["URLFORM"] = "application/x-www-form-urlencoded";
    HttpContentType["PROTOBUF"] = "application/x-protobuf";
    HttpContentType["OCTET_STREAM"] = "application/octet-stream";
    HttpContentType["TEXT"] = "text/plain";
    HttpContentType["PROTOBUFFER"] = "application/x-protobuffer";
})(HttpContentType = exports.HttpContentType || (exports.HttpContentType = {}));
