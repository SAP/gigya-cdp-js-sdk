import {ConnectorBase, ResourceApplication} from "./common";
import {WithType} from "../common";


export type WithCloudStorageResources = ResourceApplication<'CloudStorage', WithType<
    'amazon.s3'
    | 'azure.blob'
    | 'googlecloud'
    | 'sftp'
    > & {
    read: {};
    write: {};
}>;

export type CloudStorageConnector = ConnectorBase & WithCloudStorageResources;
