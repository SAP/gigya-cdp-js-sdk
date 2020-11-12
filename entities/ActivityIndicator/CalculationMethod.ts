export type CalculationMethod = {
    field: string;
    method: 'max' | 'min' | 'sum' | 'count' | 'average' | 'standardDeviation' | 'firstOccurrence' | 'lastOccurrence';
}
