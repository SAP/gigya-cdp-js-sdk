import {WithSecuritySchemes} from "./Auth";
import {Id, Payload, VersionedEntity, WithDetails, WithTenantId,} from "../common";
import {WithCloudStorageResources, WithRESTResources} from "../Application/ApplicationResource";
import {WorkspaceId} from "../Workspace";
import {
    WithConfigSchema,
    WithConfigValues,
    WithPollingConfig,
    WithResourcePath,
    WithTestResourcePath
} from "../common/config";
import {WithCategory} from "../Action";

export type ConnectorId = Id;

interface ConnectorBase extends VersionedEntity<ConnectorId>,
    WithCategory<'marketing' | 'commerce' | 'service' | 'procurement' | 'other'>,
    WithConfigSchema,
    WithConfigValues,
    WithPollingConfig,
    WithSecuritySchemes,
    WithTestResourcePath,
    WithTenantId {
    // externalDocs?: string;  // deprecated, use the one in resources.externalDocs
    logoUrl: string;
    preDefinedActions: ResourceBased[];
    preDefinedEvents: ResourceBased[];
}

export type RESTConnector = ConnectorBase & WithRESTResources;
export type CloudStorageConnector = ConnectorBase & WithCloudStorageResources;
export type Connector = RESTConnector | CloudStorageConnector;

interface ResourceBased extends WithDetails, WithResourcePath, /*WithConfigSchema,*/ WithConfigValues {
}

interface AppLibraryEndpoints {
    // Global Connectors
    "/api/workspaces/$wsId/global/appLibrary": {
        GET: (wsId: WorkspaceId) => Promise<Connector[]>;
        POST: (wsId: WorkspaceId, connector: Payload<Connector>) => Promise<Connector>;
    };
    "/api/workspaces/$wsId/global/appLibrary/$connectorId": {
        GET: (wsId: WorkspaceId, connectorId: Id) => Promise<Connector>;
        PUT: (wsId: WorkspaceId, connectorId: Id, connector: Payload<Connector>) => Promise<Connector>;
        DELETE: (wsId: WorkspaceId, connectorId: Id) => Promise<void>;
    };

    // Tenant Connectors
    "/api/workspaces/$wsId/appLibrary": {
        GET: (wsId: WorkspaceId, includePublic?: boolean) => Promise<Connector[]>;
        POST: (wsId: WorkspaceId, connector: Payload<Connector>) => Promise<Connector>;
    };

    "/api/workspaces/$wsId/appLibrary/$connectorId": {
        GET: (wsId: WorkspaceId, connectorId: Id) => Promise<Connector>;
        PUT: (wsId: WorkspaceId, connectorId: Id, connector: Payload<Connector>) => Promise<Connector>;
        DELETE: (wsId: WorkspaceId, connectorId: Id) => Promise<void>;
    };
}
