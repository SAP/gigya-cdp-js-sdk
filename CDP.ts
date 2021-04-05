import {createArray, toQueryString} from "./utils";
import {HttpMethod, HttpProtocol, Req} from "./request";
import {CredentialsType, getSigner, ISigner} from "./Signers";
import {CDPEntitiesApi} from "./CDPEntitiesApi";
import {AnonymousRequestSigner} from "./Signers/AnonymousRequestSigner";
import {Headers} from "request";
import {wrap} from "./ts-rest-client";
import {RequestOptions, sendRequest} from "./sendRequest";

export type DataCenter = 'eu5' | `il1`;
type StagingEnvs = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Env<n extends StagingEnvs = StagingEnvs> = 'prod' | `st${n}`;
export const availableEnvs: Record<DataCenter, Env[]> = {
    il1: ['prod', ...createArray(8, n => `st${n + 1}` as Env)],
    eu5: ['prod', ...createArray(1, n => `st${n + 1}` as Env)]
};

export type CDPErrorResponse = { errorCode: string };
export const asCDPError = (e: unknown) => e as CDPErrorResponse;

export function isCDPError(e: any): e is CDPErrorResponse {
    return !!(e as CDPErrorResponse).errorCode;
}

export const enum PermissionGroup {
    sys_admins = '_cdp_sys_admins',
    ingest = '_cdp_ingestion'
}

interface CDPOptions extends RequestOptions {
    protocol: HttpProtocol;
    dataCenter: DataCenter;
    env: Env;
    baseDomain: string;
    rootPath: string;
    verboseLog: boolean;
    anonymousPaths: RegExp[];
    sendRequest: typeof sendRequest;
}

export class CDP {
    public static readonly DefaultOptions: CDPOptions = {
        protocol: 'https',
        dataCenter: 'eu5',
        env: 'prod',
        baseDomain: 'gigya.com',
        rootPath: 'api',
        proxy: undefined,
        ignoreCertError: false,
        verboseLog: false,
        anonymousPaths: [],
        sendRequest: sendRequest,
        log(msg: string, ...args: any[]) {
            if (this.verboseLog)
                console.log(msg, ...args);
        }
    };

    public readonly options: CDPOptions;
    private _signer: ISigner;
    private _acls: { [wsId: string]: object } = {};

    constructor(credentials: CredentialsType, options: Partial<CDPOptions> = {}) {
        this.setCredentials(credentials);
        this.options = {
            ...CDP.DefaultOptions,
            ignoreCertError: options.dataCenter?.startsWith('il1') ?? CDP.DefaultOptions.ignoreCertError,
            ...options
        };
    }

    public get api() {
        return wrap(this).createClient<CDPEntitiesApi>();
    }

    private get admin() { // WIP
        return {
            createWorkspace: ({tenantID = 'rnd', wsName = `ws-${new Date().toDateString()}`, buName = `business unit`}) => {
                return this.sendAdminReq<{ partnerID: string }>('createPartner', {
                    tenantID,
                    customData: {companyName: wsName},
                    isCDP: true
                }).then(r => r.partnerID);
            },
            permissions: {
                forSelf() {
                    return this.for();
                },
                for: (userKey = this._signer.userKey) => ({
                    in: (wsId: string) => ({
                        has: (...paths: string[]) => this.hasPermissions(wsId, ...paths),
                        grant: (...groupIds: PermissionGroup[]) => {
                            return Promise.all(groupIds.map(groupID => this.sendAdminReq('updateGroup', {
                                groupID,
                                addUsers: userKey
                            })));
                        }
                    })
                })
            }
        };
    }

    public async getACL(workspace: string, userKey = this._signer.userKey) {
        if (!this._acls[workspace]) {
            try {
                this._acls[workspace] = await this.sendAdminReq('getEffectiveACL', {
                    partnerID: workspace,
                    targetUserKey: userKey
                });
            } catch (e) {
                this._acls[workspace] = {};
            }
        }

        return this._acls[workspace];
    }

    private sendAdminReq<T>(method: string, params: object = {}): Promise<CDPErrorResponse & T> {
        if (this._signer instanceof AnonymousRequestSigner) {
            this.log(`anonymous user: no permissions`);
            throw 'no permissions';
        } else {
            const permissionsDc = this.options.dataCenter == 'eu5' ? 'us1' : 'il1';
            const req: Req = this.sign({
                protocol: this.options.protocol,
                domain: `admin.${permissionsDc}.${this.options.baseDomain}`,
                path: `admin.${method}`,
                method: 'get',
                query: {},
                params,
                headers: {},
            });

            this.log(`sending `, req);
            return this.httpSend<CDPErrorResponse & T>(req);
        }
    }

    public async hasPermissions(workspace: string, ...paths: string[]) {
        const apiAcl: Record<string, object> = await this.getACL(workspace).then((r: any) => r.eACL?.['_api'] ?? {});
        return paths.every(p => !!apiAcl[`${this.options.rootPath}/${p}`]);
    }

    private getDomainDc({dataCenter, env} = this.options) {
        if (dataCenter == 'eu5' && env == 'prod')
            return 'eu5';

        const dc = dataCenter == 'il1' ? 'il1-cdp' : 'eu5';
        return `${dc}-${env}`;
    }

    public send<T>(path: string, method: HttpMethod, params: object = {}, headers: Headers = {}): Promise<T> {
        let req: Req = {
            protocol: this.options.protocol,
            domain: `cdp.${this.getDomainDc()}.${this.options.baseDomain}`,
            path: `${this.options.rootPath}/${path}`,
            query: {},
            method,
            params,
            headers,
        };

        if (!this.isAnonymousEndpoint(path)) {
            req = this.sign(req);
        }

        this.log(`sending `, req);
        return this.httpSend<T>(req);
    }

    private isAnonymousEndpoint(path: string) {
        return this.options.anonymousPaths.some(anon => anon.test(path));
    }

    public setCredentials(credentials: CredentialsType): this {
        this._signer = getSigner(credentials);
        this._acls = {};
        return this;
    }

    private sign(req: Req): Req {
        return this._signer.sign(req);
    }

    private httpSend<T>(req: Req) {
        let uri = `${req.protocol}://${req.domain}/${req.path}`;
        let body: string = undefined;

        switch (req.method) {
            case "get":
            case "delete":
                Object.assign(req.query, req.params);
                break;
            default:
                body = JSON.stringify(req.params);
        }

        const qs = toQueryString(req.query);
        if (qs)
            uri += `?${qs}`;

        return this.options.sendRequest<T>({...req, body, uri}, this.options);
    }

    private log(msg: string, ...args: any[]) {
        this.options.log(msg, ...args);
    }

    public get<T>(path: string, params?: object, headers?: Headers) {
        return this.send<T>(path, 'get', params, headers);
    }

    public post<T>(path: string, body?: object, query?: object, headers?: Headers) {
        return this.send<T>(path, 'post', body, headers);
    }

    public put<T>(path: string, body?: object, query?: object, headers?: Headers) {
        return this.send<T>(path, 'put', body, headers);
    }

    public delete<T>(path: string, params?: object, headers?: Headers) {
        return this.send<T>(path, 'delete', params, headers);
    }

    public ['🤩']() {
        console.log('with love from Baryo');
    }
}
