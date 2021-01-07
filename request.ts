import {Headers} from "request";

export type HttpProtocol = 'https' | 'http';
export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface Req<P extends object = {}> {
    protocol: HttpProtocol;
    domain: string;
    path: string;
    method: HttpMethod;
    query: object;
    params: P;
    headers: Headers;
}

export interface RawRequest {
    method: HttpMethod;
    uri: string;
    headers: Headers;
    body?: string;
}
