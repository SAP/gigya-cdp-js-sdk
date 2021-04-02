import {Entity, Id} from "../common";
import {CalculationMethod} from "./CalculationMethod";
import {DateRange} from "./DateRange";
import {ActivitySchemaId} from "../Schema";
import {WithProtected} from "..";

export type ActivityIndicatorName = Id;
export type ActivityIndicatorId = Id;
export interface ActivityIndicator extends Entity<ActivityIndicatorId>, WithProtected {
  schemaId: ActivitySchemaId;
  dateRange: DateRange;
  calculationMethod: CalculationMethod;
  condition: object; // Waiting for backend:  ActivityIndicatorRuleCondition
}

