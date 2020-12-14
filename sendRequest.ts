import request, {CoreOptions, Response} from "request";
import {RawRequest} from "./request";

export function sendRequest<T>(req: RawRequest) {
    const start = Date.now();

    const reqOptions: CoreOptions = {
        headers: {...req.headers, ['Content-type']: 'application/json'},
        body: req.body,
        // ca: ''
    };

    if (this.options.ignoreCertError) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 as any; // todo: restore it?
    }

    if (this.options.proxy) {
        this.log(`sending via proxy:`, this.options.proxy);
        reqOptions.proxy = this.options.proxy;
        reqOptions.tunnel = false;
    }

    return new Promise<T>((resolve, reject) => request[req.method](
        req.uri, reqOptions, (error: any, response: Response, body: any) => {
            this.log(`request to ${req.method.toUpperCase()} ${req.uri} took ${(Date.now() - start) / 1000} seconds`);
            if (error) {
                this.log(`error:`, error, response, body);
                reject({
                    errorCode: error.errno ?? 'unknown',
                    errorDetails: error.syscall == 'getaddrinfo' ? 'missing vpn connection?' : error,
                });
                return;
            }
            try {
                this.log(body);
                resolve(JSON.parse(body));
            } catch (ex) {
                this.log(`failed to parse response body from request to ${req.uri}\n${body}`);
                reject({error: ex, body});
            }
        }));
}
