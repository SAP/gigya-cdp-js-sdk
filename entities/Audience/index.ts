import {Entity, Id, Payload, WithType} from "../common";
import {PurposeId} from "../Purpose";
import {ApplicationId} from "../Application";
import {BusinessUnitId, WithBusinessUnitId} from "../BusinessUnit";
import {ViewId, WithViewId} from "../View";
import {AudienceCondition} from "./AudienceCondition";
import {SchemaId} from "../Schema";
import {Condition, FieldCondition, MetaFieldCondition} from "../common/Condition";
import {ActivityFieldName} from "../common/Field";

export type AudienceId = Id;

export interface DeprecatedAudience extends Entity<AudienceId>, WithBusinessUnitId, WithViewId {
    query: AudienceCondition; // deprecated
    purposeIds: PurposeId[];
    schedules: Id[];
    gSqlQuery: string;
}

export interface Audience
    extends Entity<AudienceId>,
            WithBusinessUnitId,
            Partial<WithViewId & WithType<'audience' | 'export'>> {
    queries: Array<{
        readonly order?: number;
        schemaId: SchemaId; // entity schema id [profile|group]
        purposeIds: Array<PurposeId>;
        query?: AudienceCondition;
        activitiesQueries?: {
            [activitySchemaId: string]: Condition<FieldCondition<ActivityFieldName> | MetaFieldCondition>
        };
    }>,
    schedules: Id[];
    gSqlQuery: string;
}

interface AudiencesEndpoints {
  '/businessUnit/$bUnit/views/$viewId/audiences': {
    GET: (bUnit: BusinessUnitId, viewId: ViewId) => Promise<Audience[]>;
    POST: (bUnit: BusinessUnitId, viewId: ViewId, payload: Payload<Audience>) => Promise<Audience>;
  };

  '/businessUnit/$bUnit/views/$viewId/audiences/$audienceId': {
    GET: (bUnit: BusinessUnitId, viewId: ViewId, audienceId: AudienceId) => Promise<Audience>;
    PUT: (bUnit: BusinessUnitId, viewId: ViewId, audienceId: AudienceId, payload: Payload<Audience>) => Promise<Audience>;
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
