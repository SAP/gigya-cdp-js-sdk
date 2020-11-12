import {Entity, Id} from './common';
import { WorkspaceId } from './Workspace';

export type BusinessUnitId = Id;

export interface BusinessUnit extends Entity<BusinessUnitId> {
  workspaceId: WorkspaceId;
  tenantId: string;
}

export type WithBusinessUnitId = {
  businessUnitId: BusinessUnitId;
};
