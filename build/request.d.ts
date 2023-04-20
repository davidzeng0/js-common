/// <reference types="node" />
import { KV } from './kv';
import { HttpContentType } from './http';
import { BodyInit, Headers } from 'node-fetch';
export interface Response {
    status: number;
    statusText: string;
    ok: boolean;
    headers: Headers;
    url: string;
    redirected: boolean;
    body: Buffer;
}
export type Payload = BodyInit | Uint8Array;
export declare class Request {
    method: string;
    headers?: KV<any>;
    body?: any;
    constructor();
    setMethod(method: string): void;
    setHeader(key: string, value: any): this;
    setHeaders(headers: KV<any> | Map<string, any>): this;
    post(body: Payload, contentType?: HttpContentType): this;
    postForm(form: string | KV<any> | URLSearchParams): this;
    postJSON(form: any): this;
    postProtobuf(body: Payload): this;
    postBinary(body: Payload): this;
    execute(url: string): Promise<Response>;
}
