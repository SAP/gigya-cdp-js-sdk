import {CalculatedField} from "./ActivityIndicator/CalculationMethod";
import {IndicatorBase} from "./IndicatorBase";

export interface CalculatedIndicator extends IndicatorBase {
    calculatedField: CalculatedField;
    isPredictionBased: boolean;
    isActivityBased: boolean;
    default: number;
}
