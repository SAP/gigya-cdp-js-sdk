import {JSONSchema7} from "json-schema";

export type Id = string;
export type WithType<T> = { type: T; };
export type WithId<T = Id> = { id: T };

export type WithEnabled = {
  enabled: boolean;
};

export type WithMetaData = {
  created: Date | string;
  updated: Date | string;
};

export type WithDetails = {
  name: string;
  description?: string;
};

export type WithVersion = {
  version: number;
};

export interface Entity<T = Id> extends WithId<T>, WithMetaData, WithDetails, WithEnabled {
}

export interface VersionedEntity<T = Id> extends Entity<T>, WithVersion {
}

export type Payload<T extends Entity> = Omit<T, keyof (WithId & WithMetaData)>;
