import { parse, serialize } from 'cookie';
import { KV } from './kv';

export const Cookie = {
	parse(cookies: string){
		return parse(cookies) as KV;
	},

	stringify(cookies: KV){
		let parts = [];

		for(let [key, value] of KV.entries(cookies))
			parts.push(serialize(key, value));
		return parts.join('; ');
	}
};