import {Entity, Id, WithTenantId} from './common';
import {Workspace, WorkspaceId} from './Workspace';

export type BusinessUnitId = Id;

export interface BusinessUnit extends Entity<BusinessUnitId>, WithTenantId {
  workspaceId: WorkspaceId;
  workspaceName: Workspace['name'];
}

export type WithBusinessUnitId = {
  businessUnitId: BusinessUnitId;
};
