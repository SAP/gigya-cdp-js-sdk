import {WithBusinessUnitId} from './BusinessUnit';
import {Id, WithType} from "./common";

export type ViewId = Id;
export type ViewType = 'Marketing' | 'Contextual';
export interface View extends WithBusinessUnitId, WithType<ViewType> {
  id: ViewId;
  name: string;
}

export type WithViewId = {
  viewId: ViewId
};
