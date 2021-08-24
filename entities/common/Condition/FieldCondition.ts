import {Condition, SimpleCondition} from "./Condition";
import {ValueCondition, ValueStateCondition, WithArrayCondition, WithTimeRange} from "./ValueStateCondition";
import {FieldName, WithField} from "../Field";

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
