import {AuthRequestSigner, isCredentials, UserKeyCredentials} from "./AuthRequestSigner";
import {clone} from "../utils";
import {Req} from "../request";

export interface RSACredentials extends UserKeyCredentials {
    privateKey: string;
}

export function isRSACreds(credentials: RSACredentials | any): credentials is RSACredentials {
    return !!credentials.privateKey && isCredentials(credentials);
}

export class AuthBearerSigner extends AuthRequestSigner<RSACredentials> {
    constructor(creds: RSACredentials) {
        super(creds);
    }

    public sign(request: Req<RSACredentials>) {
        const signedReq = clone(request);
        const jwt = this.signJwt(this._creds);
        signedReq.headers.Authorization = `Bearer ${jwt}`;

        // delete signedReq.params.userKey;
        // delete signedReq.params.privateKey;
        return signedReq;
    }

    private signJwt(creds: RSACredentials) {
        const jose = require('jose');

        return jose.JWT.sign(
            {},
            jose.JWK.asKey({
                key: creds.privateKey,
                format: 'pem',
                // type: 'pkcs1'
            }, {
                alg: 'RS256',
                kid: creds.userKey
            }), {
                iat: true,
                jti: this.createNonce().toString(),
                header: {
                    typ: 'JWT'
                }
            }
        );
    }
}
