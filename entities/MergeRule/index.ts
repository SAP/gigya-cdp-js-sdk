import {ProfileFieldName} from "../common/Field";

export interface MergeRule {
    mergeRulesNamesToConfigs: Record<ProfileFieldName, {
        name: ProfileFieldName;
        writePolicy: 'immutable' | 'mutable';
        maxValues: number;
        writeConflictRule: 'discardEvent' | 'createUcp';
        // dataQualityRanks: null;
        // isIdentifier: boolean;
    }>;
}