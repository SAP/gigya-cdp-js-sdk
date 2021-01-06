import {
    ActivityIndicatorStateCondition, Condition,
    ProfileStateCondition, PurposeCondition,
    SegmentStateCondition
} from "../common/Condition";

export type AudienceCondition = Condition<
    ProfileStateCondition                   // no change
    | SegmentStateCondition                 // only "in"
    | ActivityIndicatorStateCondition       // no change
    | PurposeCondition>;
