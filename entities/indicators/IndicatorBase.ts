import {Entity, Id} from "../common";
import {WithProtected} from "../common/Field";

export type IndicatorId = Id;
export interface IndicatorBase extends Entity<IndicatorId>, WithProtected {
    status: 'ready' | 'calculating';
    default: any;
}
