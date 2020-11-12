export type Condition<T extends SimpleCondition> =
    T
    | UnionGateCondition<T>
    | IntersectionGateCondition<T>
    | NegateCondition<T>;

export interface SimpleCondition {
}

type ComplexCondition<T extends SimpleCondition> = Array<Condition<T>>;


export interface UnionGateCondition<T extends SimpleCondition> {
    operator: 'or';
    conditions: ComplexCondition<T>;
}

export interface IntersectionGateCondition<T extends SimpleCondition> {
    operator: 'and';
    conditions: ComplexCondition<T>;
}

export interface NegateCondition<T extends SimpleCondition> {
    operator: 'not';
    condition: Condition<T>;
}