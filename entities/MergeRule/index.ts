import {ProfileFieldName, WithProtected} from "../common/Field";

export interface MergeRule {
    properties: Record<ProfileFieldName, Partial<WithProtected> & {
        name: ProfileFieldName;
        writePolicy: 'immutable' | 'mutable';
        maxValues: number;
        writeConflictRule: 'discardEvent' | 'createUcp';
        isProtected?: boolean;
    }>;
}