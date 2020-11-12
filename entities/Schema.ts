import {Entity, Id} from "./common";
import {JSONSchema7} from "json-schema";
import {FieldName} from "./common/Field";

export type SchemaId = Id;

export interface WithSchema  {
    schema: string|JSONSchema7;
}

export type ProtectedFieldName<F extends FieldName = FieldName> = `properties.${F}`;

export interface CustomerSchema extends Entity<SchemaId>, WithSchema {
    schemaType: SchemaType;
    protectedFields: Record<ProtectedFieldName, {}>;
}

export enum SchemaType {
    Profile,
    Activity,
    Privacy,
    Segment,
    ActivityIndicator
}

export type ProfileSchemaName = 'profile';
export type ActivitySchemaName = string;
