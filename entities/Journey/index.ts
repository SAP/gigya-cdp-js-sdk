import {Entity, Id} from "../common";
import {JourneyStep, JourneyStepId} from "./JourneySteps";
import {JourneyCondition} from "./JourneyCondition";

export type JourneyId = Id;

export interface Journey extends Entity<JourneyId> {
    steps: JourneyStep[];
    trigger: JourneyCondition;
    then: JourneyStepId[];
}