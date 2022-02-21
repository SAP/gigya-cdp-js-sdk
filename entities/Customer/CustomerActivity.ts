import {WithCounts} from "./CustomerProfile";
import {Id, ISODateTimeString} from "../common";

type Attribute = Object;

interface WithSourceId {
    sourceId: Id;
};

interface Activity extends WithSourceId {
    attributes: Attribute;
    created: Date | ISODateTimeString;
    _id: Id;
};

export interface CustomerActivity extends WithCounts {
    activities: Activity[];
};
