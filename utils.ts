import crypto from "crypto";
import strictUriEncode from "strict-uri-encode";

/**
 * This is a utility method for generating a cryptographic signature.
 */
export function calcSignature(baseString: string, secret: string): string {
    if (!secret) {
        throw new Error('Cannot calculate signature, secret missing!');
    }
    const secretBuffer = new Buffer(secret || this.secret, 'base64');
    return crypto.createHmac('sha1', secretBuffer).update(baseString).digest('base64');
}

export function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function toQueryString(params: object) {
    return Object.keys(params)
        .sort()
        .map(key => `${key}=${strictUriEncode((params[key] || '').toString())}`)
        .join('&');
}

export function createArray<T>(size: number, fn: (i: number) => T): T[] {
    return new Array(size).fill(0).map((_, i) => fn(i));
}