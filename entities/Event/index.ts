import {Entity, Id, ISODateTimeString} from "../common";
import {PurposeId} from "../Purpose";
import {ApplicationId} from "../Application";
import {SchemaId, WithSchema} from "../Schema";
import {WithConfigValues} from "../common/config";

export type EventId = Id;

export interface Event extends Entity<EventId>, WithSchema, WithConfigValues {
    schemaId?: SchemaId;
    purposeIds: PurposeId[];
    dataType: EventType | keyof EventType;
}

export enum EventType {
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