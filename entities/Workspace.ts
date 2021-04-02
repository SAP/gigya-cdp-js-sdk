import {Entity, Id, WithTenantId} from './common';

export type WorkspaceId = Id;

export interface Workspace extends Entity<WorkspaceId>, WithTenantId {
  workspaceType: 'Production' | 'Development';
}
