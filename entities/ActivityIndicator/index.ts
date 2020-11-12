import {Entity, Id} from "../common";
import {ActivityIndicatorRuleCondition} from "./ActivityIndicatorRuleCondition";
import {CalculationMethod} from "./CalculationMethod";
import {DateRange} from "./DateRange";
import {SchemaId} from "../Schema";

export type ActivityIndicatorName = Id;
export type ActivityIndicatorId = Id;
export interface ActivityIndicator extends Entity<ActivityIndicatorId> {
  schemaId: SchemaId; // activity schema id
  dateRange: DateRange;
  calculationMethod: CalculationMethod;
  condition: object; // Waiting for backend:  ActivityIndicatorRuleCondition
}

