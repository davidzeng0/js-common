import { KV } from './kv';
export interface Mime {
    type: string;
    subtype: string;
    params: KV;
}
export declare const Mime: {
    parse(str: string): Mime;
    typeEquals(a: string | Mime, b: string | Mime): boolean;
};
