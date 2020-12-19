import {Entity, Id, Payload} from "../common";
import {JourneyStep, JourneyStepId} from "./JourneySteps";
import {JourneyCondition} from "./JourneyCondition";
import {BusinessUnitId} from "../BusinessUnit";
import {ViewId} from "../View";

export type JourneyId = Id;

export interface Journey extends Entity<JourneyId> {
    steps: JourneyStep[];
    trigger: JourneyCondition;
    then: JourneyStepId[];
}

type JourneyStatus = {
    status: 'Ready' | 'In Provisioning' | 'Error';
    errorDetails: string;
};

type WithJourneyState = {
    state: JourneyStatus
};

interface JourneyEndpoints {
    '/businessunits/$bUnitId/views/$viewId/journeys/$journeyId': {
        GET: (bUnitId: BusinessUnitId, viewId: ViewId, journeyId: JourneyId) => Promise<Journey & WithJourneyState>;
        PUT: (bUnitId: BusinessUnitId, viewId: ViewId, journeyId: JourneyId, payload: Payload<Journey>) => Promise<Journey & WithJourneyState>;
        DELETE: (bUnitId: BusinessUnitId, viewId: ViewId, journeyId: JourneyId) => Promise<void>;
    };

    '/businessunits/$bUnitId/views/$viewId/journeys/$journeyId/status': {
        GET: (bUnitId: BusinessUnitId, viewId: ViewId, journeyId: JourneyId) => Promise<JourneyStatus>;
    };
}
