import {Condition, SimpleCondition} from "./Condition";

type Operand<T extends string, V extends string | number | boolean> = { type: T; value: V };

type GeneralValueOperator = 'equal' | 'equalWhenExists' | 'notEqual';

export interface TransitionCondition {
    operator: 'changed'; // | 'deleted' | 'created'
}

export interface ExistCondition {
    operator: 'exist';
}

interface NumericCondition {
    operator: GeneralValueOperator | 'greaterThan' | 'greaterThanOrEqual' | 'lessThan' | 'lessThanOrEqual';
    operand: Operand<'long' | 'double', number>;
}

interface StringCondition {
    operator: GeneralValueOperator | 'contain';
    operand: Operand<'string', string>;
}

export type DateCondition = (
    {
        operator: GeneralValueOperator | 'before' | 'after';
        operand: Operand<'date', string>;
    }
    | {
    operator: 'inThePast' | 'inTheFuture';
    operand: Operand<'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year', number>;
}
    );

export interface WithArrayCondition {
    arrayCondition: {
        atLeast?: number;
        atMost?: number;
    };
}

export interface WithTimeRange {
    lastUpdated: Condition<DateCondition>;
}

export type ValueStateCondition = SimpleCondition & (
    ExistCondition
    | NumericCondition
    | StringCondition
    | DateCondition
    );

export type ValueCondition = ValueStateCondition | TransitionCondition;
