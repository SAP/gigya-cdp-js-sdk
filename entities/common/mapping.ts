import {Condition, FieldCondition} from "./Condition";

export interface MappingBase {
    sourceField: string;
    targetField: string;
    arraySelector?: Condition<FieldCondition>;
}
