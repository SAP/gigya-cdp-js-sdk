import {WithViewId} from "./View";
import {ISODateTimeString, WithMetaData} from "./common";
import {ProfileFieldName} from "./common/Field";
import {ActivityIndicatorName} from "./ActivityIndicator";
import {CalculationMethod} from "./ActivityIndicator/CalculationMethod";
import {SegmentName, SegmentValue} from "./Segment";
import {Purpose, PurposeId, PurposeStatus} from "./Purpose";

export interface Customer extends WithViewId, WithMetaData {
    lastSeen: ISODateTimeString;
    firstSeen: ISODateTimeString;

    attributes: Record<ProfileFieldName, any>;
    activityIndicators: Array<{
        name: ActivityIndicatorName;
    } & { [K in CalculationMethod['method']]: number | string }>;

    segments: Array<{
        name: SegmentName;
        value: SegmentValue;
        updated: WithMetaData['updated'];
    }>;

    privacy: {
        purposes: Array<{
            purposeId: PurposeId;
            externalId: Purpose['externalId'];
            status: PurposeStatus;
            date: ISODateTimeString;
        }>;

        subscriptions: Array<{
            channelType: string;
            status: PurposeStatus;
            date: ISODateTimeString;
        }>;
    }
}