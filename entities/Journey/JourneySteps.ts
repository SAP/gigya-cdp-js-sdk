import { Id, WithDetails, WithEnabled, WithId, WithType} from "../common";
import {ActionId} from "../Action";
import {WithConfigValues} from "../common/config";
import {JourneyCondition} from "./JourneyCondition";
// import {JourneyCondition} from "./Condition/EntityCondition";


export const EndOfJourney = undefined;
export type JourneyStepId = Id;

export interface JourneyTrigger extends WithId<JourneyStepId>, WithDetails, WithEnabled {
    condition: JourneyCondition;
    then: JourneyStepId;
}

interface BaseJourneyStep extends WithId<JourneyStepId>, WithDetails, WithEnabled, WithType<'invoke' | 'decision' | 'wait' | 'empty'> {
    then?: JourneyStepId[];
}

export interface EmptyStep extends BaseJourneyStep {
    type: 'empty';
}

export interface InvokeStep extends BaseJourneyStep {
    type: 'invoke';
    actions: Array<{
        applicationId: Id,
        actionId: ActionId;
    } & WithConfigValues>;
}

export interface DecisionStep extends BaseJourneyStep {
    type: 'decision';
    condition: JourneyCondition;
    else?: JourneyStepId[];
}

export interface WaitStep extends BaseJourneyStep {
    type: 'wait';
}

export interface WithExpiration {
    expiration: Date | Partial<{
        hours: number;
        days: number;
        months: number;
    }>;
}

export interface WaitUntil extends WaitStep, WithExpiration {

}

export interface WaitForCondition extends WaitStep, Partial<WithExpiration> {
    condition: JourneyCondition;
    onExpiration?: JourneyStepId[];
}

export type JourneyStep = EmptyStep | InvokeStep | DecisionStep | WaitForCondition | WaitUntil;




// examples
const waitForTomorrowStep: WaitUntil = {
    type: 'wait',
    id: '123',
    enabled: true,
    name: 'wait for tomorrow',
    description: '',
    expiration: {days: 1},
    then: ['next step']
};

const waitForNextYearStep: WaitUntil = {
    type: 'wait',
    id: '123',
    enabled: true,
    name: 'wait for tomorrow',
    description: '',
    expiration: new Date('01-01-2022'),
    then: ['next step']
};

const waitForVIPSegment: WaitForCondition = {
    type: 'wait',
    id: '123',
    enabled: true,
    name: 'wait vip seg',
    description: '',
    condition: {
        type: 'segment',
        name: 'VIP',
        operator: 'entered'
    },
    then: ['next step']
};

const waitForVIPSegmentWithExpiration: WaitForCondition = {
    type: 'wait',
    id: '123',
    enabled: true,
    name: 'wait vip seg',
    description: '',
    condition: {
        type: 'segment',
        name: 'VIP',
        operator: 'entered'
    },
    then: ['next step'],
    expiration: {
        months: 1,
        days: 10
    },
    onExpiration: ['send another email reminder']
};