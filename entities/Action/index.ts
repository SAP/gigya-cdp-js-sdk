import {Entity, Id, Payload} from "../common";
import {PurposeId} from "../Purpose";
import {JSONSchema7} from "json-schema";
import {ActionMapping} from "./ActionMapping";
import {WithConfigValues, WithResourcePath} from "../common/config";
import {ApplicationId} from "../Application";
import {BusinessUnitId} from "../BusinessUnit";

export type ActionId = Id;
export type WithCategory<CATS = string> = {
  category: CATS;
}
export interface Action extends Entity<ActionId>, WithCategory, WithResourcePath, /*WithConfigSchema,*/ WithConfigValues {
  purposeIds: PurposeId[];
}

interface ActionsEndpoints {
  '/businessUnits/$bUnit/applications/$appId/actions': {
    GET: (bUnit: BusinessUnitId, appId: ApplicationId) => Promise<Action[]>;
    // POST: (bUnit: BusinessUnitId, applicationId: ApplicationId, payload: Payload<Connector>) => Promise<Connector>;
  };

  '/businessUnits/$bUnit/applications/$appId/actions/$actionId': {
    GET: (bUnit: BusinessUnitId, applicationId: ApplicationId, actionId: Id) => Promise<Action & { schema: JSONSchema7 }>;
    PUT: (bUnit: BusinessUnitId, applicationId: ApplicationId, actionId: Id, payload: Payload<Action>) => Promise<Action>;
    DELETE: (bUnit: BusinessUnitId, applicationId: ApplicationId, actionId: Id) => Promise<void>;
  };

  '/businessUnits/$bUnit/applications/$appId/actions/$actionId/schema': {
    GET: (bUnit: BusinessUnitId, applicationId: ApplicationId, actionId: Id) => Promise<JSONSchema7>;
    POST: (bUnit: BusinessUnitId, applicationId: ApplicationId, actionId: Id, schema: JSONSchema7) => Promise<JSONSchema7>; // upsert
  };

  '/businessUnits/$bUnit/applications/$appId/actions/$actionId/mappings': {
    GET: (bUnit: BusinessUnitId, applicationId: ApplicationId, actionId: Id) => Promise<ActionMapping[]>;
    POST: (bUnit: BusinessUnitId, applicationId: ApplicationId, actionId: Id, payload: ActionMapping[]) => Promise<ActionMapping[]>; // upsert
  };

  '/businessUnits/$bUnit/application/$appId/action/$actionId/activate': {
    POST: (bUnit: BusinessUnitId, appId: Id, actionId: Id, customer: object) => void;
  }
}
