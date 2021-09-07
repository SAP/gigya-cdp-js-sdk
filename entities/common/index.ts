import {WithViewId} from "../View";

export type Id = string;
export interface WithType<T> {
  type: T;
}

export interface WithId<T = Id> {
  id: T
}

export interface WithEnabled {
  enabled: boolean;
}

export interface WithMetaData {
  created: Date | ISODateTimeString;
  updated: Date | ISODateTimeString;
}

export interface WithDetails {
  name: string;
  description?: string;
}

export interface WithVersion<V = string> {
  version: V;
}

export interface WithTenantId {
  tenantId: Id;
}

export type WithCategory<CATS = string> = {
  category: CATS;
}

export interface StaticEntity<T = Id> extends WithId<T>, WithMetaData, WithDetails {
}

export interface Entity<T = Id> extends StaticEntity<T>, WithEnabled {
}

export interface VersionedEntity<T = Id> extends Entity<T>, WithVersion {
}

export type Payload<T extends Partial<Entity>> = Omit<T, keyof (WithId & WithMetaData & WithViewId)>;

export type ISODateTimeString = string;

export interface WithOperator<T> {
  operator: T;
}
