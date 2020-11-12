import {Condition, SimpleCondition} from "./Condition";
import {ValueCondition, ValueStateCondition, WithArrayCondition, WithTimeRange} from "./ValueStateCondition";
import {FieldName} from "../Field";

export interface FieldStateCondition extends SimpleCondition, Partial<WithArrayCondition & WithTimeRange> {
    field: string;
    condition: Condition<ValueStateCondition>
}

export interface FieldCondition<F extends FieldName = FieldName> extends SimpleCondition, Partial<WithArrayCondition & WithTimeRange> {
    field: F;
    condition: Condition<ValueCondition>;
}
