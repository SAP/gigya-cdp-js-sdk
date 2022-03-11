import {Id} from "../../common";
import {CalculatedField, CalculationMethod} from "./CalculationMethod";
import {DateRange} from "./DateRange";
import {ActivitySchemaId} from "../../Schema";
import {ActivityIndicatorRuleCondition} from "./ActivityIndicatorRuleCondition";
import {IndicatorBase} from "../IndicatorBase";

export type ActivityIndicatorName = Id;
export interface ActivityIndicator extends IndicatorBase {
  schemaId: ActivitySchemaId;
  dateRange: DateRange;
  calculationMethod: CalculationMethod | CalculatedField;
  condition?: ActivityIndicatorRuleCondition;
}

