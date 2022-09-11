import {Id, StaticEntity} from '../common';
import {SegmentName} from "../Segment";
import {ActivityIndicatorName} from "../indicators/ActivityIndicator";
import {ActivityFieldName, AttributeFieldName} from "../common/Field";
import {ActivitySchemaName} from "../Schema";

export type PurposeId = Id;

export interface Purpose extends StaticEntity<PurposeId> {
  externalId: string;
  reason: string;
  customerAttributes?: AttributeFieldName[];
  customerSegments?: SegmentName[];
  customerActivityIndicators?: ActivityIndicatorName[];
  customerActivities?: Record<ActivitySchemaName, ActivityFieldName[]>;
}

export type PurposeStatus = 'Granted' | 'Withdrawn';
