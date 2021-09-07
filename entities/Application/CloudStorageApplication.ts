import {ConnectorBasedApplication} from "./common";
import {WithCloudStorageResources} from "../Connector/CloudStorageConnector";

export interface CloudStorageApplication
    extends ConnectorBasedApplication, WithCloudStorageResources {}
