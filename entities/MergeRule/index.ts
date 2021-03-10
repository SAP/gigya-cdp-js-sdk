import {ProfileFieldName} from "../common/Field";

export interface MergeRule {
    properties: Record<ProfileFieldName, {
        name: ProfileFieldName;
        writePolicy: 'immutable' | 'mutable';
        maxValues: number;
        writeConflictRule: 'discardEvent' | 'createUcp';
        isIdentifier: boolean;
        isProtected: boolean
    }>;
}