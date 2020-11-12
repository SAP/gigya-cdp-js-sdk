import {SecretCredentials, SimpleRequestSigner} from "./SimpleRequestSigner";
import {calcSignature, toQueryString} from "../utils";
import {HttpMethod, Req} from "../request";
import strictUriEncode from "strict-uri-encode";

interface SignedRequestParams {
    timestamp: number;
    nonce: number;
    sig: string;
}

export class CredentialsSigner extends SimpleRequestSigner {
    constructor(creds: SecretCredentials,
                private _calcSignature = calcSignature) {
        super(creds);
    }

    public sign(request: Req<SecretCredentials & SignedRequestParams>) {
        const signedReq = super.sign(request);
        const requestParams = signedReq.query as SecretCredentials & SignedRequestParams;
        const effectiveSecret = requestParams.secret;

        // clear previous authentications
        delete requestParams.secret;
        delete requestParams.sig;

        if (effectiveSecret) {
            requestParams.timestamp = Date.now();
            requestParams.nonce = this.createNonce();
            requestParams.sig =
                this.createRequestSignature(
                    this._creds.secret,
                    `${request.protocol}://${request.domain.toLowerCase()}/${request.path}`,
                    request.method,
                    {
                        ...requestParams,
                        // _body: ''
                    });
        }

        return signedReq;
    }

    protected createRequestSignature(secret: string, uri: string, httpMethod: HttpMethod, requestParams: object) {
        const queryString = toQueryString(requestParams);
        const baseString = `${httpMethod.toUpperCase()}&${strictUriEncode(uri)}&${strictUriEncode(queryString)}`;
        return this._calcSignature(baseString, secret);
    }
}
