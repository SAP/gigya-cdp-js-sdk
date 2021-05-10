export type FieldName = string;
export type ProfileFieldName = FieldName;
export type ActivityFieldName = FieldName;

export type WithProtected = {
    isProtected?: boolean;
}
export type ProtectedFieldName<F extends FieldName = FieldName> = `properties.${F}`;

export type WithProtectedFields = {
    protectedFields: Record<ProtectedFieldName, {
        reasons: Array<"DS">;
    }>;
}
