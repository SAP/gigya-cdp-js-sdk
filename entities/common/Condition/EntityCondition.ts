import {
    WithArrayCondition,
    DateCondition,
    ExistCondition,
    ValueCondition,
    ValueStateCondition, WithTimeRange
} from "./ValueStateCondition";
import {Id} from "../index";
import {Condition, SimpleCondition} from "./Condition";
import {FieldCondition, FieldStateCondition} from "./FieldCondition";
import {ActivityFieldName, ProfileFieldName} from "../Field";
import {PurposeStatus} from "../../Purpose";

// TODO: clearout "state" condition entities

export interface ProfileStateCondition extends SimpleCondition {
    type: 'profile'
    fieldCondition?: Condition<FieldStateCondition>;
}

export interface ProfileCondition extends SimpleCondition {
    type: 'profile'
    operator?: 'created' | 'updated';
    fieldCondition?: Condition<FieldCondition<ProfileFieldName>>;
}

export interface ActivityCondition extends SimpleCondition {
    type: 'activity';
    activityId: Id;
    // was currently created
}

export interface EventCondition extends SimpleCondition {
    type: 'event';
    eventId: Id;
    fieldCondition?: Condition<FieldStateCondition>; // on the original event's fields
}

export interface SegmentStateCondition extends SimpleCondition {
    type: 'segment';
    name: string;
    values?: string[]; // one of
    // timeRange?: Condition<DateCondition>;
}

export interface SegmentCondition extends SegmentStateCondition {
    operator?: 'entered' | 'exit'; // default: exists currently in segment
}

export interface ActivityIndicatorStateCondition extends FieldStateCondition {
    type: 'activityIndicator';
}

export interface ActivityIndicatorCondition extends FieldCondition<ActivityFieldName> {
    type: 'activityIndicator';
}

export type PurposeCondition = SimpleCondition & Partial<WithTimeRange> & {
    type: 'purpose';
    operator?: 'equal' | 'changed';
    value: PurposeStatus;
} & ({ purposeId: string; } | { externalId: string });
