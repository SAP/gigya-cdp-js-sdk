import {WithSecuritySchemes} from "./Auth";
import {
  Id,
  Payload,
  VersionedEntity,
  WithDetails,
} from "../common";
import {CloudStorageResource, RESTResource} from "../Application/ApplicationResource";
import {WorkspaceId} from "../Workspace";
import {WithConfigSchema, WithConfigValues, WithResourcePath} from "../common/config";

export type ConnectorId = Id;

interface ConnectorBase extends VersionedEntity<ConnectorId>, WithConfigSchema, WithSecuritySchemes  {
  logoUrl: string;
  predefinedActions: ResourceBased[];
  predefinedEvents: ResourceBased[];
}

export type RESTConnector = ConnectorBase & RESTResource;
export type CloudStorageConnector = ConnectorBase & CloudStorageResource;
export type Connector = RESTConnector | CloudStorageConnector;

interface ResourceBased extends WithDetails, WithResourcePath, /*WithConfigSchema,*/ WithConfigValues {}

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
