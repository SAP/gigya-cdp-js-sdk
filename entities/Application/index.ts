import {SecuritySchemeName} from "../Connector/Auth";
import {CloudStorageApplication} from "./CloudStorageApplication";
import {RESTApplication} from "./RESTApplication";
import {DirectApplication} from "./DirectApplication";
import {WebClientApplication} from "./WebClientApplication";

export {ApplicationId} from "./common";
export type Application = DirectApplication | RESTApplication | CloudStorageApplication | WebClientApplication;
export type ApplicationType = Application['type'];

export interface ApplicationAuth {
    schemeName: SecuritySchemeName;
    parameters: Record<string, string>;
}

export interface ApplicationPriority {
    dataQualityPriority: 'low' | 'medium' | 'high';
}

// interface ApplicationsEndpoints {
//     '/businessUnit/$bUnit/applications': {
//         GET: (bUnit: Id) => Promise<Application[]>;
//         POST: (bUnit: Id, payload: Omit<Payload<Application>, keyof (WithSecuritySchemes & WithConfigSchema & WithEnabled & WithBusinessUnitId)> & Partial<{
//             predefinedEventIds: string[];
//             predefinedActionIds: string[];
//         }>) => Promise<Application>;
//     };
//
//     '/businessUnit/$bUnit/applications/$appId': {
//         GET: (bUnit: Id, appId: Id) => Promise<Application>;
//         PUT: (bUnit: Id, appId: Id, payload: Omit<Payload<Application>, keyof (WithSecuritySchemes & WithConfigSchema & WithBusinessUnitId & { connectorId: ConnectorId })>) => Promise<Application>;
//         DELETE: (bUnit: Id, appId: Id) => Promise<void>;
//     };
//
//     '/businessUnit/$bUnit/applications/$appId/auth': {
//         POST: (bUnit: Id, appId: ApplicationId, auth: ApplicationAuth) => Promise<ApplicationAuth>; // upsert
//         GET: (bUnit: Id, appId: Id) => Promise<ApplicationAuth>;
//     }
// }


