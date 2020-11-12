import {Entity, Id} from "../common";
import {PurposeId} from "../Purpose";
import {ApplicationId} from "../Application";
import {WithSchema} from "../Schema";

export type EventId = Id;

export interface Event extends Entity<EventId>, WithSchema {
    applicationId: ApplicationId;
    purposeIds: PurposeId[];
    dataType: EventType;
}

export enum EventType {
    firstPartyCrmData = 0,
    visitorData = 1,
    offlineData = 2,
    thirdPartyData = 3
}
