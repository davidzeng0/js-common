import { Agent } from 'http';
import { HttpContentType, HttpHeader, HttpMethod } from './http';
import { AbortedError, NetworkError } from './error';
import { URLParams } from './url';
import { Json } from './coding';
import { KV } from './kv';
import fetch, { BodyInit, Headers, FetchError } from 'node-fetch';

export interface Response{
	status: number;
	statusText: string;
	ok: boolean;
	headers: Headers;
	url: string;
	redirected: boolean;
	body: Buffer;
}

export type Payload = BodyInit | Uint8Array;

export class Request{
	method: string;
	headers?: KV<any>;
	body?: Payload;
	agent?: Agent;

	constructor(){
		this.method = HttpMethod.GET;
	}

	setMethod(method: string){
		this.method = method;
	}

	setHeader(key: string, value: any){
		if(!this.headers)
			this.headers = {};
		this.headers[key] = value;

		return this;
	}

	setHeaders(headers: KV<any> | Map<string, any>){
		if(!this.headers){
			if(headers instanceof Map)
				headers = KV.fromMap(headers);
			this.headers = headers;
		}else{
			let values = this.headers;

			for(let [key, value] of KV.entries(headers))
				values[key] = value;
		}

		return this;
	}

	setAgent(agent: Agent) {
		this.agent = agent;
	}

	post(body: Payload, contentType?: HttpContentType){;
		this.method = HttpMethod.POST;
		this.body = body;

		if(contentType !== undefined)
			this.setHeader(HttpHeader.CONTENT_TYPE, contentType);
		return this;
	}

	postForm(form: string | KV<any> | URLSearchParams){
		return this.post(URLParams.toString(form), HttpContentType.URLFORM);
	}

	postJSON(form: any){
		return this.post(Json.encode(form), HttpContentType.JSON);
	}

	postProtobuf(body: Payload){
		return this.post(body, HttpContentType.PROTOBUF);
	}

	postBinary(body: Payload){
		return this.post(body, HttpContentType.OCTET_STREAM);
	}

	async execute(url: string): Promise<Response>{
		let res, body;

		try{
			res = await fetch(url, {
				method: this.method,
				headers: this.headers,
				body: this.body,
				agent: this.agent,
				compress: true
			});

			body = await res.arrayBuffer();
		}catch(e){
			if((e as any).name == 'AbortError')
				throw new AbortedError(e);
			if(e instanceof FetchError)
				throw new NetworkError(e);
			throw e;
		}

		return {
			status: res.status,
			statusText: res.statusText,
			ok: res.ok,
			headers: res.headers,
			url: res.url,
			redirected: res.redirected,
			body: Buffer.from(body)
		};
	}
}