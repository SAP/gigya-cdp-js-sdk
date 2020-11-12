import {Entity, Id} from './common';

export type WorkspaceId = Id;

export interface Workspace extends Entity<WorkspaceId> {
  tenantId: string | number;
  isProduction?: boolean;
}
