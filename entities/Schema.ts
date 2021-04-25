import {Id, StaticEntity, WithEnabled} from "./common";
import {JSONSchema7} from "json-schema";
import {WithProtectedFields} from "./common/Field";

export type SchemaId = Id;

export interface WithSchema {
    schema: JSONSchema7;
}


export interface CustomerSchema extends StaticEntity<SchemaId>, WithSchema, WithProtectedFields {
    schemaType: SchemaType;
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
export type ActivitySchemaId = SchemaId;

export type NormalizeStep = {
    action: 'trimWhitespace' | 'removePunctuations'
} | {
    action: 'stringReplace';
    findPattern: string; // regex
    replaceWith: string;
};

export type WithNormalize = {
    normalize: WithEnabled & {
        steps: NormalizeStep[];
    };
};
