import {Condition, FieldCondition} from "./Condition";

export interface MappingBase {
    sourceField: string;
    targetField: string;
    srcField: string;
    arraySelector?: Condition<FieldCondition>;
}
