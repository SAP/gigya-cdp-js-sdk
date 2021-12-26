import {FieldCondition, Operand} from "../common/Condition";
import {WithField} from "../common/Field";
import {WithOperator} from "../common";

interface WithCalculationField {
    calculatedField: CalculatedField;
}

interface Calculation {
}

export interface CalculationMethod
    extends Calculation, WithField {  // TODO: either with "field" or "calculatedField" [not both]
    method: 'max' | 'min' | 'sum' | 'count' | 'average' | 'standardDeviation' | 'firstOccurrence' | 'lastOccurrence';
}

export interface BaseCalculatedField extends Calculation {
    default?: number;
}

export interface SimpleCalculatedField
    extends BaseCalculatedField, WithField {
    //operations: Array<{ type: 'floor' }>;
}

export interface ArrayReduceField extends SimpleCalculatedField { // TODO: count don't need calculatedField
    arrayReduce: {
        method: 'max' | 'min' | 'sum' | 'count' | 'average';
        calculatedField: CalculatedField;
        filter?: FieldCondition;
    }
}

export interface ComplexCalculatedField
    extends BaseCalculatedField,
            WithOperator<'subtract' | 'add' | 'divide' | 'multiply'> {
    operands: Array<CalculatedField>;
}

export type CalculatedField =
    SimpleCalculatedField
    | ComplexCalculatedField
    | Operand<"number", number>
    | ArrayReduceField;

// exp: (amount - (localDiscount + productDiscount + basket.sum(item => item.price)))
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
                },
                {
                    field: 'basket',
                    arrayReduce: {
                        method: 'sum',
                        calculatedField: {
                            field: 'price'
                        },
                        filter: {
                            field: 'category',
                            condition: {
                                operator: 'equal',
                                operand: {
                                    value: 'electric',
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            ]
        }
    ]
};