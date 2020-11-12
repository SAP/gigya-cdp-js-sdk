import {Entity, Id, Payload} from "../common";
import {PurposeId} from "../purpose";
import {ApplicationId} from "../Application";
import {ActionId} from "../Action";
import {BusinessUnitId} from "../BusinessUnit";
import {ViewId} from "../View";
import {AudienceCondition} from "./AudienceCondition";

export type AudienceId = Id;
export interface Index extends Entity<AudienceId> {
  query: AudienceCondition;
  purposeIds: PurposeId[];

  // not for GA
  actions?: ActionId[];
  schedule?: {};
  readonly lastRunTime?: Date;
}

interface AudiencesEndpoints {
  '/businessUnit/$bUnit/views/$viewId/audiences': {
    GET: (bUnit: BusinessUnitId, viewId: ViewId) => Promise<Index[]>;
    POST: (bUnit: BusinessUnitId, viewId: ViewId, payload: Payload<Index>) => Promise<Index>;
  };

  '/businessUnit/$bUnit/views/$viewId/audiences/$audienceId': {
    GET: (bUnit: BusinessUnitId, viewId: ViewId, audienceId: AudienceId) => Promise<Index>;
    PUT: (bUnit: BusinessUnitId, viewId: ViewId, audienceId: AudienceId, payload: Payload<Index>) => Promise<Index>;
    DELETE: (bUnit: BusinessUnitId, viewId: ViewId, audienceId: AudienceId) => Promise<void>;
  };

  '/businessUnit/$bUnit/views/$viewId/audiences/$audienceId/export?applicationId=$appId': {
    POST: (bUnit: BusinessUnitId, viewId: ViewId, audienceId: AudienceId, applicationId: ApplicationId) => Promise<void>;
  };

  '/businessUnit/$bUnit/views/$viewId/audiences/$audienceId/status': {
    GET: (bUnit: BusinessUnitId, viewId: ViewId, audienceId: AudienceId) => Promise<{
      status: 'none'|'in progress'|'failed';
      error?: string;
    }>;
  };
}
