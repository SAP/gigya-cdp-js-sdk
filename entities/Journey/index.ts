import {Entity, Id, ISODateTimeString, Payload} from "../common";
import {JourneyStep, JourneyTrigger} from "./JourneySteps";
import {BusinessUnitId} from "../BusinessUnit";
import {ViewId} from "../View";

export type JourneyId = Id;

export interface Journey extends Entity<JourneyId> {
    steps: JourneyStep[];
    trigger: JourneyTrigger;
    state: JourneyStatus;
}

type JourneyStatus = {
    status: 'Ready' | 'In Provisioning' | 'Error';
    since: ISODateTimeString;
};

interface JourneyEndpoints {
    '/businessunits/$bUnitId/views/$viewId/journeys/$journeyId': {
        GET: (bUnitId: BusinessUnitId, viewId: ViewId, journeyId: JourneyId) => Promise<Journey>;
        PUT: (bUnitId: BusinessUnitId, viewId: ViewId, journeyId: JourneyId, payload: Payload<Journey>) => Promise<Journey>;
        DELETE: (bUnitId: BusinessUnitId, viewId: ViewId, journeyId: JourneyId) => Promise<void>;
    };

    '/businessunits/$bUnitId/views/$viewId/journeys/$journeyId/status': {
        GET: (bUnitId: BusinessUnitId, viewId: ViewId, journeyId: JourneyId) => Promise<JourneyStatus>;
    };
}
