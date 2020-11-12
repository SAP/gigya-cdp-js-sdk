import {WithType} from "../common";
import {OpenApi} from "openapi-v3";

export type ApplicationType = 'REST' | 'CloudStorage';

export type ResourceApplication<T extends ApplicationType, RES extends object> = WithType<T> & { resources: RES };
export type RESTResource = ResourceApplication<'REST', OpenApi>;
export type CloudStorageResource = ResourceApplication<'CloudStorage', WithType<'amazon.s3'> & {
  read: {};
  write: {};
}>;
