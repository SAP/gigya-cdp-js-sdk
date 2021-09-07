import {OpenApi} from "openapi-v3";
import {ConnectorBase, ResourceApplication} from "./common";

export type WithRESTResources = ResourceApplication<'Rest', OpenApi>;

export type RESTConnector = ConnectorBase & WithRESTResources;
