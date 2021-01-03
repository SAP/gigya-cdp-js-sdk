import {Entity, Id, Payload, WithEnabled, WithType} from '../common';
import {ConnectorId} from "../Connector";
import {CloudStorageResource, RESTResource} from "./ApplicationResource";
import {SecuritySchemeName, WithSecuritySchemes} from "../Connector/Auth";
import {WithBusinessUnitId} from "../BusinessUnit";
import {WithConfigSchema, WithConfigValues, WithPollingConfig, WithTestResourcePath} from "../common/config";

export type ApplicationId = Id;

interface ApplicationBase extends Entity<ApplicationId>,
    WithBusinessUnitId,
    WithConfigSchema,
    WithConfigValues,
    WithPollingConfig,
    WithSecuritySchemes,
    WithTestResourcePath {
    logoUrl?: string;

    // TODO: can delete?
    iconUrl?: string; // deprecated for logoUrl
}

interface WithConnectorId {
    connectorId?: ConnectorId;
}

export type DirectApplication = ApplicationBase & WithType<'Direct'>;
export type RESTApplication = ApplicationBase & WithConnectorId & RESTResource;
export type CloudStorageApplication = ApplicationBase & WithConnectorId & CloudStorageResource;

export type Application = DirectApplication | RESTApplication | CloudStorageApplication;

export function isDirectApplication(app: Application): app is DirectApplication {
    return 'type' in app;
}

export interface ApplicationAuth {
    schemeName: SecuritySchemeName;
    parameters: Record<string, string>;
}

export interface ApplicationsEndpoints {
    '/businessUnit/$bUnit/applications': {
        GET: (bUnit: Id) => Promise<Application[]>;
        POST: (bUnit: Id, payload: Omit<Payload<Application>, keyof (WithSecuritySchemes & WithConfigSchema & WithEnabled & WithBusinessUnitId)> & Partial<{
            predefinedEventIds: string[];
            predefinedActionIds: string[];
        }>) => Promise<Application>;
    };

    '/businessUnit/$bUnit/applications/$appId': {
        GET: (bUnit: Id, appId: Id) => Promise<Application>;
        PUT: (bUnit: Id, appId: Id, payload: Omit<Payload<Application>, keyof (WithSecuritySchemes & WithConfigSchema & WithBusinessUnitId & { connectorId: ConnectorId })>) => Promise<Application>;
        DELETE: (bUnit: Id, appId: Id) => Promise<void>;
    };

    '/businessUnit/$bUnit/applications/$appId/auth': {
        POST: (bUnit: Id, appId: ApplicationId, auth: ApplicationAuth) => Promise<ApplicationAuth>; // upsert
        GET: (bUnit: Id, appId: Id) => Promise<ApplicationAuth>;
    }
}


