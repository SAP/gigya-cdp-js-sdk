import {WithMetaData} from "./index";

export type FieldName = string;
export type AttributeFieldName = FieldName; // either from the profile or group schema
export type ActivityFieldName = FieldName;

export type WithProtected = {
    isProtected?: boolean;
}

export type WithField<F = FieldName> = ({ field: F; });
export type WithMetaField = ({ metaField: keyof WithMetaData });

export type ProtectedFieldName<F extends FieldName = FieldName> = `properties.${F}`;

export type WithProtectedFields = {
    protectedFields: Record<ProtectedFieldName, {
        reasons: Array<"DS">;
    }>;
}
