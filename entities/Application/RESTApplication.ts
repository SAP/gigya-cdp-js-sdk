import {ConnectorBasedApplication} from "./common";
import {WithSecuritySchemes} from "../Connector/Auth";
import {WithRESTResources} from "../Connector/RESTConnector";

export interface RESTApplication
    extends ConnectorBasedApplication, WithSecuritySchemes, WithRESTResources {
}
