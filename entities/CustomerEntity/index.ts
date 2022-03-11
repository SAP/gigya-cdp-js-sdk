import {Id, WithDetails, WithId} from "../common";
import {SchemaType, WithSchema} from "../Schema";
import {WithProtectedFields} from "..";

export type relationId = Id;

export interface CustomerEntity extends SchemaBase, WithProtectedFields {}

export interface SchemaBase extends WithId, WithSchema, WithDetails {
    relationId: relationId;
    schemaType: SchemaType;
    default?: boolean;
    canDelete?: boolean;
    canRename?: boolean;
}
