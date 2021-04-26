import {Entity, Id, Payload, WithEnabled, WithType} from '../common';
import {ConnectorId} from "../Connector";
import {WithCloudStorageResources, WithRESTResources} from "./ApplicationResource";
import {SecuritySchemeName, WithSecuritySchemes} from "../Connector/Auth";
import {WithBusinessUnitId} from "../BusinessUnit";
import {WithConfigSchema, WithConfigValues, WithPollingConfig, WithTestResourcePath} from "../common/config";
import {WithCategory} from "../Action";

export type ApplicationId = Id;

interface ApplicationBase extends Entity<ApplicationId>,
    WithBusinessUnitId,
    WithConfigSchema,
    WithConfigValues {
    logoUrl?: string;
}

export interface ConnectorBasedApplication extends ApplicationBase, WithCategory, WithPollingConfig {
    originConnectorId?: ConnectorId;
    connectorId?: ConnectorId;
    vendor?: string;
}

export interface DirectApplication extends ApplicationBase, WithType<'Direct'> {}
export interface RESTApplication extends ConnectorBasedApplication, WithSecuritySchemes, WithRESTResources {}
export interface CloudStorageApplication extends ConnectorBasedApplication, WithCloudStorageResources {}

export type Application = DirectApplication | RESTApplication | CloudStorageApplication;

export function isDirectApplication(app: Application): app is DirectApplication {
    return 'type' in app;
}

export interface ApplicationAuth {
    schemeName: SecuritySchemeName;
    parameters: Record<string, string>;
}

export interface ApplicationPriority {
    dataQualityPriority: 'low' | 'medium' | 'high';
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


