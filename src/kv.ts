export interface KV<T = string>{
	[key: string]: T;
	[Symbol.iterator](): Iterator<[string, T]>;
}

export const KV = {
	new<T = string>(): KV<T>{
		return {
			[Symbol.iterator]: function(){
				return Object.entries(this).values();
			}
		};
	},

	fromMap<T>(map: Map<string, T>){
		var kv = KV.new<T>();

		for(var [key, value] of map)
			kv[key] = value;
		return kv;
	},

	toMap<T>(kv: KV<T>){
		var map = new Map<string, T>();

		for(var [key, value] of kv)
			map.set(key, value);
		return map;
	}
};