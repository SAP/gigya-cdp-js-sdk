import {CloudStorageConnector} from "./CloudStorageConnector";
import {RESTConnector} from "./RESTConnector";

export {ConnectorId} from "./common";
export type Connector = RESTConnector | CloudStorageConnector;


// interface AppLibraryEndpoints {
//     // Global Connectors
//     "/api/workspaces/$wsId/global/appLibrary": {
//         GET: (wsId: WorkspaceId) => Promise<Connector[]>;
//         POST: (wsId: WorkspaceId, connector: Payload<Connector>) => Promise<Connector>;
//     };
//     "/api/workspaces/$wsId/global/appLibrary/$connectorId": {
//         GET: (wsId: WorkspaceId, connectorId: Id) => Promise<Connector>;
//         PUT: (wsId: WorkspaceId, connectorId: Id, connector: Payload<Connector>) => Promise<Connector>;
//         DELETE: (wsId: WorkspaceId, connectorId: Id) => Promise<void>;
//     };
//
//     // Tenant Connectors
//     "/api/workspaces/$wsId/appLibrary": {
//         GET: (wsId: WorkspaceId, includePublic?: boolean) => Promise<Connector[]>;
//         POST: (wsId: WorkspaceId, connector: Payload<Connector>) => Promise<Connector>;
//     };
//
//     "/api/workspaces/$wsId/appLibrary/$connectorId": {
//         GET: (wsId: WorkspaceId, connectorId: Id) => Promise<Connector>;
//         PUT: (wsId: WorkspaceId, connectorId: Id, connector: Payload<Connector>) => Promise<Connector>;
//         DELETE: (wsId: WorkspaceId, connectorId: Id) => Promise<void>;
//     };
// }
