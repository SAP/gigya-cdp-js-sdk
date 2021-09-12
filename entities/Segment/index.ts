import {Entity, Id} from '../common';
import {ActivityIndicatorStateCondition, Condition, ProfileStateCondition} from "../common/Condition";

export type SegmentName = Id;
export type SegmentValue = string;

export interface Segment extends Entity<SegmentName> {
    values: Array<{
        condition: SegmentRuleCondition
        value: SegmentValue;
    }>;
}

export type SegmentRuleCondition = Condition<ProfileStateCondition
    | ActivityIndicatorStateCondition>;
