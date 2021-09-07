import {Entity, Id, WithCategory} from "../common";
import {WithBusinessUnitId} from "../BusinessUnit";
import {WithConfigSchema, WithConfigValues} from "../common/config";
import {ConnectorId} from "../Connector";

export type ApplicationId = Id;

export interface ApplicationBase extends Entity<ApplicationId>,
    WithBusinessUnitId,
    WithConfigSchema,
    WithConfigValues {
    logoUrl?: string;
}

export interface ConnectorBasedApplication extends ApplicationBase, WithCategory {
    originConnectorId?: ConnectorId;
    connectorId?: ConnectorId;
    vendor?: string;
}

