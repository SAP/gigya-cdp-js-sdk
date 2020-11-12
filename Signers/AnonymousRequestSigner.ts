import {ISigner} from "./ISigner";
import {clone} from "../utils";
import {Req} from "../request";

export type NoCredentials = false;

export function isAnonymous(credentials: NoCredentials | any): credentials is NoCredentials {
    return credentials === false;
}

export class AnonymousRequestSigner implements ISigner {
    public get userKey() { return undefined; }
    public sign(request: Req) {
        return clone(request);
    }
}
