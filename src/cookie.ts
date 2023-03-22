import { parse, serialize } from 'cookie';
import { KV } from './kv';

export const Cookie = {
	parse(cookies: string){
		return parse(cookies) as KV;
	},

	stringify(cookies: KV){
		var parts = [];

		for(var [key, value] of cookies)
			parts.push(serialize(key, value));
		return parts.join('; ');
	}
};