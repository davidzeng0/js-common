export interface KV<T = string> {
    [key: string]: T;
}
export declare const KV: {
    fromMap<T>(map: Map<string, T>): KV<T>;
    toMap<T_1>(kv: KV<T_1>): Map<string, T_1>;
    entries<T_2>(kv: KV<T_2> | Map<string, T_2>): IterableIterator<[string, T_2]>;
};
