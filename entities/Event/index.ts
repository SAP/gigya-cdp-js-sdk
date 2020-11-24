import {Entity, Id} from "../common";
import {PurposeId} from "../Purpose";
import {ApplicationId} from "../Application";
import {WithSchema} from "../Schema";
import {WithConfigValues} from "../common/config";

export type EventId = Id;

export interface Event extends Entity<EventId>, WithSchema, WithConfigValues {
    // applicationId: ApplicationId;
    purposeIds: PurposeId[];
    dataType: EventType;
}

export enum EventType {
    firstPartyCrmData = 0,
    visitorData = 1,
    offlineData = 2,
    thirdPartyData = 3
}
