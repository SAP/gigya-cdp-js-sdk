import {WithType} from "../common";
import {OpenApi} from "openapi-v3";
import {ConnectorId} from "../Connector";

export type ApplicationType = 'Rest' | 'CloudStorage';
export type WithResources<RES extends object> = { resources?: RES };

export type ResourceApplication<T extends ApplicationType, RES extends object> = WithType<T> & WithResources<RES>;
export type RESTResource = ResourceApplication<'Rest', OpenApi>;
export type CloudStorageResource = ResourceApplication<'CloudStorage', WithType<
    'amazon.s3'
    | 'azure.blob'
    | 'googlecloud'
    | 'sftp'
    > & {
  read: {};
  write: {};
}>;
