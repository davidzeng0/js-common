import { ParseError, SerializeError } from './error';
import { isArrayBufferView } from 'util/types';
import { stringify } from 'yaml';
import { load } from 'js-yaml';

export type SerializedType = Buffer | ArrayBuffer | ArrayBufferView | string;

function bufferToString(buffer: SerializedType, encoding: BufferEncoding = 'utf8'){
	if(typeof buffer == 'string')
		return buffer;
	if(buffer instanceof ArrayBuffer)
		buffer = Buffer.from(buffer);
	else if(isArrayBufferView(buffer))
		buffer = Buffer.from(buffer.buffer);
	return buffer.toString(encoding);
}

export interface Coding{
	encode(data: any): SerializedType;
	decode(data: SerializedType): any;
}

export class Json{
	static encode(data: any): string{
		try{
			return JSON.stringify(data);
		}catch(e){
			throw new SerializeError(e);
		}
	}

	static decode(data: SerializedType): any{
		try{
			return JSON.parse(bufferToString(data))
		}catch(e){
			throw new ParseError(e);
		}
	}
}

export class Yaml{
	static encode(data: any): string{
		try{
			return stringify(data);
		}catch(e){
			throw new SerializeError(e);
		}
	}

	static decode(data: SerializedType): any{
		try{
			return load(bufferToString(data));
		}catch(e){
			throw new ParseError(e);
		}
	}
}