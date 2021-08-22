interface Calculation {
}

export interface CalculationMethod extends Calculation {
    field: string;
    method: 'max' | 'min' | 'sum' | 'count' | 'average' | 'standardDeviation' | 'firstOccurrence' | 'lastOccurrence';
}

export interface BaseCalculatedField extends Calculation {

}

export interface SimpleCalculatedField extends BaseCalculatedField {
    field: string;
    //operations: Array<{ type: 'floor' }>;
}

export interface SimpleValue extends BaseCalculatedField {
    value: number;
}

export interface ComplexCalculatedField extends BaseCalculatedField {
    operator: 'subtract' | 'sum' | 'divide' | 'multiply';
    operands: Array<CalculatedField>;
}

export type CalculatedField = SimpleCalculatedField | SimpleValue | ComplexCalculatedField;


// exp: (amount - (localDiscount + productDiscount))
const complexAttribute: ComplexCalculatedField = {
    operator: 'subtract',
    operands: [
        {
            field: 'amount'
        },
        {
            operator: 'sum',
            operands: [
                {
                    field: 'localDiscount'
                },
                {
                    field: 'productDiscount'
                }
            ]
        }
    ]
};