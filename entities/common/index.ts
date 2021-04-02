import {WithViewId} from "../View";

export type Id = string;
export type WithType<T> = { type: T; };
export type WithId<T = Id> = { id: T };

export type WithEnabled = {
  enabled: boolean;
};

export type WithMetaData = {
  created: Date | ISODateTimeString;
  updated: Date | ISODateTimeString;
};

export type WithDetails = {
  name: string;
  description?: string;
};

export type WithVersion<V = string> = {
  version: V;
};

export type WithTenantId = {
  tenantId: Id;
};

export interface StaticEntity<T = Id> extends WithId<T>, WithMetaData, WithDetails {
}

export interface Entity<T = Id> extends StaticEntity<T>, WithEnabled {
}

export interface VersionedEntity<T = Id> extends Entity<T>, WithVersion {
}

export type Payload<T extends Partial<Entity>> = Omit<T, keyof (WithId & WithMetaData & WithViewId)>;

export type ISODateTimeString = string;