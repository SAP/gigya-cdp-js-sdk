import {Entity, Id, Payload, WithEnabled} from '../common';
import {ConnectorId} from "../Connector";
import {CloudStorageResource, RESTResource} from "./ApplicationResource";
import {SecuritySchemeName, WithSecuritySchemes} from "../Connector/Auth";
import {WithBusinessUnitId} from "../BusinessUnit";
import {WithConfigSchema, WithConfigValues} from "../common/config";

export type ApplicationId = Id;

interface DirectApplication extends Entity<ApplicationId>, WithBusinessUnitId, WithSecuritySchemes, WithConfigSchema, WithConfigValues {
    logoUrl: string;
    connectorId?: ConnectorId;

    // TODO: can delete?
    iconUrl?: string; // deprecated for logoUrl
    isDataProducer?: boolean;
    executionPlanSteps?: string[];
    priority?: any;
}

type RESTApplication = DirectApplication & RESTResource;
type CloudStorageApplication = DirectApplication & CloudStorageResource;

export type Application = DirectApplication | RESTApplication | CloudStorageApplication;

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


