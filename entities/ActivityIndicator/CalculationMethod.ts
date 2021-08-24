import {Operand} from "../common/Condition";
import {WithField} from "../common/Field";
import {WithOperator} from "../common";

interface Calculation {
}

export interface CalculationMethod
    extends Calculation, WithField {
    method: 'max' | 'min' | 'sum' | 'count' | 'average' | 'standardDeviation' | 'firstOccurrence' | 'lastOccurrence';
}

export interface BaseCalculatedField extends Calculation {

}

export interface SimpleCalculatedField
    extends BaseCalculatedField, WithField {
    //operations: Array<{ type: 'floor' }>;
}

export interface ComplexCalculatedField
    extends BaseCalculatedField,
            WithOperator<'subtract' | 'add' | 'divide' | 'multiply'> {
    operands: Array<CalculatedField>;
}

export type CalculatedField =
    SimpleCalculatedField
    | ComplexCalculatedField
    | Operand<"number", number>;


// exp: (amount - (localDiscount + productDiscount))
const complexAttribute: ComplexCalculatedField = {
    operator: 'subtract',
    operands: [
        {
            field: 'amount'
        },
        {
            operator: 'add',
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