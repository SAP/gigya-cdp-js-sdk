import request, {CoreOptions, Response} from "request";
import {RawRequest} from "./request";
import {AccessHeaders} from "./ts-rest-client";

export const CallIdHeader = 'x-callid';

export interface RequestOptions {
    proxy?: string;
    ignoreCertError?: boolean;
    log(msg: string, ...args: any[]);
}

export function sendRequest<T>(req: RawRequest, options: RequestOptions) {
    const start = Date.now();

    const reqOptions: CoreOptions = {
        headers: {...req.headers, ['Content-type']: 'application/json'},
        body: req.body,
        // ca: ''
    };

    if (options.ignoreCertError) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 as any; // todo: restore it?
    }

    if (options.proxy) {
        options.log(`sending via proxy:`, options.proxy);
        reqOptions.proxy = options.proxy;
        reqOptions.tunnel = false;
    }

    return new Promise<T>((resolve, reject) => request[req.method](
        req.uri, reqOptions, (error: any, response: Response, body: string) => {
            options.log(`request to ${req.method.toUpperCase()} ${req.uri} took ${(Date.now() - start) / 1000} seconds`);
            if (error) {
                options.log(`error:`, error, response, body);
                reject({
                    errorCode: error.errno ?? 'unknown',
                    errorDetails: error.syscall == 'getaddrinfo' ? 'missing vpn connection?' : error,
                });
                return;
            }
            try {
                options.log(body);
                resolve(
                    Object.assign(JSON.parse(body),
                        {
                            [AccessHeaders]: response.headers,
                            [CallIdHeader]: response.headers[CallIdHeader]?.toString()
                        }
                    )
                );
            } catch (ex) {
                options.log(`failed to parse response body from request to ${req.uri}\n${body}`);
                reject({error: ex, body});
            }
        })
    );
}
