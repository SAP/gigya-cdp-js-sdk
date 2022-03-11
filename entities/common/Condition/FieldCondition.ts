import {Condition, SimpleCondition} from "./Condition";
import {ValueCondition, ValueStateCondition, WithArrayCondition, WithTimeRange} from "./ValueStateCondition";
import {FieldName, WithField, WithMetaField} from "../Field";

export interface FieldStateCondition
    extends SimpleCondition,
            WithField,
            Partial<WithArrayCondition & WithTimeRange> {
    condition: Condition<ValueStateCondition>
}

export interface FieldCondition<F extends FieldName = FieldName>
    extends SimpleCondition,
            WithField<F>,
            Partial<WithArrayCondition & WithTimeRange> {
    condition: Condition<ValueCondition>;
}

export interface MetaFieldCondition extends SimpleCondition, WithMetaField {
    condition: Condition<ValueCondition>;
}
