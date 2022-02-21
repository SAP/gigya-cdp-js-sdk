import {Customer} from "./Customer";
import {Id} from "../common";

export interface WithCounts {
    count: number;
    totalCount: number;
}

export interface CustomerProfile extends WithCounts {
    profiles: Customer[];
    nextCursorId: Id;
}
