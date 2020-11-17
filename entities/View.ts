import {WithBusinessUnitId} from './BusinessUnit';
import {Id} from "./common";

export type ViewId = Id;

export interface View extends WithBusinessUnitId {
  id: ViewId
  type: 'Marketing' | 'Contextual';
  name: string;
}

export type WithViewId = {
  viewId: ViewId
};
