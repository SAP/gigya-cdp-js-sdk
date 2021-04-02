import {ProfileFieldName, WithProtected} from "../common/Field";

export interface MergeRule {
    properties: Record<ProfileFieldName, WithProtected & {
        name: ProfileFieldName;
        writePolicy: 'immutable' | 'mutable';
        maxValues: number;
        writeConflictRule: 'discardEvent' | 'createUcp';
        isIdentifier: boolean;
    }>;
}