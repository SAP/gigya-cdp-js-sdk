import {Id, VersionedEntity, WithCategory, WithDetails, WithTenantId, WithType} from "../common";
import {
    ResourcePath,
    WithConfigSchema,
    WithConfigValues,
    WithPollingConfig,
    WithResourcePath,
    WithTestResourcePath
} from "../common/config";
import {WithSecuritySchemes} from "./Auth";

export type WithResources<RES extends object> = { resources: RES };

export type ResourceApplication<T extends string, RES extends object> = WithType<T> & WithResources<RES>;

export type ConnectorId = Id;

export interface ResourceBased extends WithDetails, WithResourcePath, /*WithConfigSchema,*/ WithConfigValues {
}

export interface ConnectorBase extends VersionedEntity<ConnectorId>,
    WithCategory<'marketing' | 'commerce' | 'service' | 'procurement' | 'other'>,
    WithConfigSchema,
    WithConfigValues,
    WithPollingConfig,
    WithSecuritySchemes,
    WithTestResourcePath,
    WithTenantId {
    // externalDocs?: string;  // deprecated, use the one in resources.externalDocs
    logoUrl: string;
    preDefinedActions: Array<ResourceBased>;
    preDefinedEvents: Array<ResourceBased>;
}
