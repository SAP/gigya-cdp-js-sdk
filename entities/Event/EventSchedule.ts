import {WithEnabled, WithMetaData} from "../common";

export interface EventSchedule extends WithMetaData, WithEnabled {
    frequencyType: 'minute'|'hour'|'day'|'week';
    frequencyInterval: number;
    startTime: Date|string;
}