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

export interface WaitForChangeStep extends WaitStep {
    type: 'wait';
    // condition: JourneyCondition;
}

export interface WaitUntil extends WaitStep {
    type: 'wait';
    until: Date;
}

export interface WaitFor extends WaitStep {
    type: 'wait';
    hours?: number;
    days?: number;
}

export type JourneyStep = EmptyStep | InvokeStep | DecisionStep | WaitForChangeStep | WaitUntil | WaitFor;
