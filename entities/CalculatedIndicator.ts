import {Entity, Id} from "./common";
import {CalculatedField} from "./ActivityIndicator/CalculationMethod";

export type CalculatedIndicatorId = Id
export interface CalculatedIndicator extends Entity<CalculatedIndicatorId> {
    calculatedField: CalculatedField;
}