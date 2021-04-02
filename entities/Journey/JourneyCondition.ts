import {
    ActivityCondition,
    ActivityIndicatorCondition, Condition,
    EventCondition,
    ProfileCondition, PurposeCondition,
    SegmentCondition
} from "../common/Condition";

export type JourneyCondition = Condition<ProfileCondition
    | ActivityCondition
    | EventCondition
    | SegmentCondition
    | ActivityIndicatorCondition
    | PurposeCondition>;

// Condition for:
//      onRegister event for a female
//      AND profile created
//      AND new Order activity
//      AND PurchaseSum (activity-indicator) changed to be more than 1000
//      AND (segment changed to "Gold Customer" OR tracking processing purpose granted)
//      AND (age is between 18 and 42 OR customer used to lived at Washington)
const condition: JourneyCondition = {
    operator: 'and',
    conditions: [
        //      onRegister event for a female
        {
            type: 'event',
            eventId: '123-onRegister',
            fieldCondition: {
                field: 'gender',
                condition: {
                    operator: 'equalWhenExists',
                    operand: {
                        type: 'string',
                        value: 'female'
                    }
                }
            }
        },
        //      AND profile created
        {
            type: 'profile',
            operator: 'created'
        },
        //      AND new Order activity
        {
            type: 'activity',
            activityId: '123-order-activity',
        },
        //      AND PurchaseSum changed (activity-indicator)
        {
            type: 'activityIndicator',
            field: 'purchaseSum',
            condition: {
                operator: 'greaterThan',
                operand: {
                    type: 'double',
                    value: 1000
                }
            }
        },
        //      AND (segment changed to "Gold Customer" OR tracking processing purpose granted)
        {
            operator: 'or',
            conditions: [
                {
                    type: 'segment',
                    name: 'VIP',
                    operator: 'entered',
                    values: ['Gold']
                },
                {
                    type: 'purpose',
                    purposeId: 'tracking',
                    value: 'Granted'
                }
            ]
        },
        //      AND (age is between 18 and 42 OR customer used to lived at Washington)
        {
            type: 'profile',
            fieldCondition: {
                operator: 'or',
                conditions: [
                    // age is between 18 and 42
                    {
                        field: 'age',
                        condition: {
                            operator: 'and',
                            conditions: [
                                {
                                    operator: 'greaterThanOrEqual',
                                    operand: {
                                        type: 'double',
                                        value: 18
                                    }
                                },
                                {
                                    operator: 'lessThanOrEqual',
                                    operand: {
                                        type: 'double',
                                        value: 42
                                    }
                                }
                            ]
                        }
                    },
                    // customer used to lived at Washington
                    {
                        field: 'citiesHistory',
                        arrayCondition: {
                            atLeast: 1
                        },
                        condition: {
                            operator: 'equal',
                            operand: {
                                type: 'string',
                                value: 'Washington'
                            }
                        }
                    }
                ]
            }
        }
    ]
};
