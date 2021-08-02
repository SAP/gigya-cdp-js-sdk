import {ISigner} from "./ISigner";
import {AnonymousRequestSigner, isAnonymous, NoCredentials} from "./AnonymousRequestSigner";
import {isCredentials} from "./AuthRequestSigner";
import {AuthBearerSigner, isRSACreds, RSACredentials} from "./AuthBearerSigner";
import {isSecretCredentials, SecretCredentials, SimpleRequestSigner} from "./SimpleRequestSigner";
import {CredentialsSigner} from "./CredentialsSigner";

export {ISigner} from "./ISigner";
export type CredentialsType = NoCredentials | (SecretCredentials & {forceSimple?: boolean}) | RSACredentials;

export function getSigner(credentials: CredentialsType): ISigner | null {
    if (isAnonymous(credentials)) {
        return new AnonymousRequestSigner();
    } else if (!isCredentials(credentials)) {
        throw 'missing loginCredentials userkey and secret/privateKey';
    } else if (isRSACreds(credentials)) {
        return new AuthBearerSigner(credentials);
    } else if (isSecretCredentials(credentials)) {
        credentials.forceSimple = true; // temp do to backend issue.
        return credentials.forceSimple ?
            new SimpleRequestSigner(credentials)
            : new CredentialsSigner(credentials);
    } else {
        throw 'missing loginCredentials secret/privateKey';
    }
}
