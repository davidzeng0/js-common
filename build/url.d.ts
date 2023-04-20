import { KV } from './kv';
export declare const URLParams: {
    fromKV(kv: KV<any>): URLSearchParams;
    toKV(params: URLSearchParams | string): KV<any>;
    toString(params: string | KV<any> | URLSearchParams): string;
};
export declare class URLBuilder {
    scheme: string;
    host?: string;
    path_: string[];
    params_?: KV<any>;
    fragment?: string;
    constructor();
    setScheme(scheme: string): this;
    setHost(host: string): this;
    setPath(path: string): void;
    addPath(path: string): void;
    setParam(key: string, value: any): this;
    setParams(kv: string | KV<any> | Map<string, any>): this;
    setFragment(fragment: string): this;
    get origin(): string;
    get path(): string;
    get href(): string;
    build(): string;
}
