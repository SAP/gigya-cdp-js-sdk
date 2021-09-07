import {Entity, Id, ISODateTimeString, WithType} from "../common";
import {PurposeId} from "../Purpose";
import {SchemaId, WithSchema} from "../Schema";
import {WithConfigValues} from "../common/config";
import {DirectApplication} from "../Application/DirectApplication";
import {WebClientApplication} from "../Application/WebClientApplication";

export type EventId = Id;
export type EventType = 'Scheduled' | 'Listener' | DirectApplication['type'] | WebClientApplication['type'];

export interface Event
    extends Entity<EventId>,
            WithType<EventType>,
            WithSchema,
            WithConfigValues {
    schemaId?: SchemaId;
    purposeIds: PurposeId[]; // "granted purposes"
    dataType: EventDataType | keyof EventDataType;
}

export enum EventDataType {
    firstPartyCrmData = 0,
    visitorData = 1,
    offlineData = 2,
    thirdPartyData = 3
}

export interface EventStatus {
    status: 'NOT_RUN_YET' | 'ERROR' | 'SUCCESS';
    processedRecords: number;
    startTime: ISODateTimeString;
    recordLogs: Record<string, {}>;
}

export interface EventHistory {
    totalJobs: number;
    jobs: Id[];
}
