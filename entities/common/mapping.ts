import {Condition, FieldCondition} from "./Condition";

export interface MappingBase {
    srcField: string;
    targetField: string;
    arraySelector?: Condition<FieldCondition>;
}