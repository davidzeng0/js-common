import { KV } from './kv';
export declare const Cookie: {
    parse(cookies: string): KV<string>;
    stringify(cookies: KV): string;
};
