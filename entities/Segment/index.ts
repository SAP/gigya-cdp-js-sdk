import {Entity, Id} from '../common';
import {ActivityIndicatorStateCondition, Condition, ProfileStateCondition} from "../common/Condition";

export type SegmentName = Id;

export interface Segment extends Entity<SegmentName> {
    values: Array<{
        condition: object; // Waiting for backend:  SegmentRuleCondition
        value: string;
    }>;
}

export type SegmentRuleCondition = Condition<ProfileStateCondition
    | ActivityIndicatorStateCondition>;
