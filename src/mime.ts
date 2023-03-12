import { ParseError } from './error';
import { KV } from './kv';

export interface Mime{
	type: string;
	subtype: string;
	params: KV;
}

export const Mime = {
	parse(str: string): Mime{
		var parts = str.split(';');
		var type = parts.shift()!.trim().split('/');

		if(type.length != 2)
			throw new ParseError('Invalid mime type');
		var params: KV = {};

		for(var part of parts){
			var param = part.trim();
			var index = param.indexOf('=');

			if(index == -1)
				throw new ParseError('Invalid mime type');
			var key = param.substring(0, index), value = param.substring(index + 1);

			if(value.charAt(0) === '"' && value.charAt(value.length - 1) === '"')
				value = value.substring(1, value.length - 1);
			params[key] = value;
		}

		return {
			type: type[0],
			subtype: type[1],
			params
		};
	},

	typeEquals(a: string | Mime, b: string | Mime){
		if(typeof a == 'string')
			a = this.parse(a);
		if(typeof b == 'string')
			b = this.parse(b);
		return a.type == b.type && a.subtype == b.subtype;
	}
};