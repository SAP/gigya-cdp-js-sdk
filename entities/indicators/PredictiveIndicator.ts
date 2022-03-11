import {IndicatorBase} from "./IndicatorBase";
import {WithType} from "../common";

export type PredictionType = 'churn' | 'clv';
export interface PredictiveIndicator extends IndicatorBase, WithType<PredictionType> {
    default: number;
}