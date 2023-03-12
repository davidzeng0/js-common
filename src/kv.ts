export interface KV<T = string>{
	[key: string]: T;
}

export const KV = {
	fromMap<T>(map: Map<string, T>){
		var kv: KV<T> = {};

		for(var [key, value] of map)
			kv[key] = value;
		return kv;
	},

	toMap<T>(kv: KV<T>){
		var map = new Map<string, T>();

		for(var key in kv)
			map.set(key, kv[key]);
		return map;
	}
};