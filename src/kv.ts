export interface KV<T = string>{
	[key: string]: T;
}

export const KV = {
	fromMap<T>(map: Map<string, T>){
		let kv: KV<T> = {};

		for(let [key, value] of map)
			kv[key] = value;
		return kv;
	},

	toMap<T>(kv: KV<T>){
		let map = new Map<string, T>();

		for(let [key, value] of KV.entries(kv))
			map.set(key, value);
		return map;
	},

	entries<T>(kv: KV<T> | Map<string, T>){
		if(kv instanceof Map)
			return kv.entries();
		return Object.entries(kv).values();
	}
};