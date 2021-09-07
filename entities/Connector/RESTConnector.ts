import {OpenApi} from "openapi-v3";
import {ConnectorBase, ResourceApplication, ResourceBased} from "./common";
import {ResourcePath, WithResourcePath} from "../common/config";

export type WithRESTResources = ResourceApplication<'Rest', OpenApi>;

type WebhookBased = Omit<ResourceBased, keyof WithResourcePath> & {
    webhookPath: ResourcePath;
};

export interface RESTConnector extends ConnectorBase, WithRESTResources {
    preDefinedEventListeners: Array<WebhookBased>;
}
