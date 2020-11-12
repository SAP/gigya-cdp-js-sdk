import {Req} from "../request";

export interface ISigner {
    readonly userKey: string;
    sign(request: Req): Req;
}
