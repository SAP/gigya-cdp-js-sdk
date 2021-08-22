import {Entity, Id} from "../common";
import {CalculatedField, CalculationMethod} from "./CalculationMethod";
import {DateRange} from "./DateRange";
import {ActivitySchemaId} from "../Schema";
import {WithProtected} from "..";
import {ActivityIndicatorRuleCondition} from "./ActivityIndicatorRuleCondition";

export type ActivityIndicatorName = Id;
export type ActivityIndicatorId = Id;
export interface ActivityIndicator extends Entity<ActivityIndicatorId>, WithProtected {
  schemaId: ActivitySchemaId;
  dateRange: DateRange;
  calculationMethod: CalculationMethod | CalculatedField;
  condition: ActivityIndicatorRuleCondition;
}

