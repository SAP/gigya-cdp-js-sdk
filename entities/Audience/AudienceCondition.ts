import {
    ActivityIndicatorStateCondition, Condition,
    ProfileStateCondition, PurposeCondition,
    SegmentStateCondition
} from "../common/Condition";

export type AudienceCondition = Condition<
    ProfileStateCondition                   // no change
    | SegmentStateCondition                 // only "in"
    | ActivityIndicatorStateCondition       // no change
    | PurposeCondition>;


const conditionExample: AudienceCondition = {    // (profile.age > 18 AND < 42) AND (profile.city == 'TLV' OR profile.city == 'Washington')
    operator: "and",
    conditions: [
        {
            type: 'profile',
            fieldCondition: {
                operator: 'and',
                conditions: [
                    {
                        field: 'age',
                        condition: {
                            operator: 'and',
                            conditions: [
                                {
                                    operator: 'greaterThan',
                                    operand: {
                                        type: 'double',
                                        value: 18
                                    }
                                },
                                {
                                    operator: 'lessThan',
                                    operand: {
                                        type: 'double',
                                        value: 42
                                    }
                                },
                                {
                                    operator: 'or',
                                    conditions: [
                                        // a,
                                        // b
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        field: 'city',
                        condition: {
                            operator: 'or',
                            conditions: [
                                {
                                    operator: 'equal',
                                    operand: {
                                        type: 'string',
                                        value: 'TLV'
                                    }
                                },
                                {
                                    operator: 'equal',
                                    operand: {
                                        type: 'string',
                                        value: 'Washington'
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            type: 'segment',
            name: 'VIP',
            values: ['Gold Customer', 'Silver Customer']
        },
        {
            type: 'activityIndicator',
            field: 'purchaseSum',
            condition: {
                operator: 'greaterThanOrEqual',
                operand: {
                    type: 'double',
                    value: 1000
                }
            }
        }
    ]
};
